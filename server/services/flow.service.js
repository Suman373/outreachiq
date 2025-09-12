const agenda = require('../config/agenda');
const { agendaJobs } = require('../constants');
const { FlowModel, UserModel } = require('../database/models');
const { ConvertToSeconds, Logger, LOG_LEVELS, LOG_PATHS } = require('../utils/');
const { scheduleEmail } = require('./schedule.service');


// agenda job success
agenda.on(agendaJobs.SUCCESS_SEND_EMAIL, async (job) => {
    const { flowId } = await job.attrs.data;
    const flow = await FlowModel.findOneAndUpdate(
        { flowId },
        { $inc: { completedJobs: 1 } },
        { new: true }
    );
    if (flow.completedJobs + flow.failedJobs >= flow.totalJobs) {
        flow.status = flow.failedJobs > 0 ? "partial" : "completed";
        await flow.save();
    }
});

// agenda job fail
agenda.on(agendaJobs.FAILURE_SEND_EMAIL, async (err, job) => {
    const { flowId } = await job.attrs.data;
    const flow = await FlowModel.findOneAndUpdate(
        { flowId },
        { $inc: { failedJobs: 1 } },
        { new: true }
    );
    if (flow.completedJobs + flow.failedJobs >= flow.totalJobs) {
        flow.status = flow.completedJobs > 0 ? "partial" : "failed";
        await flow.save();
    }
});


const processFlow = async (flowData, leads) => {
    try {
        const emailNodes = flowData.nodes.filter(nd => nd.type === "email").length;
        // quota check
        const user = await UserModel.findOne({ id: flowData.userId });
        if (user.usage.emails + (leads.length * emailNodes) > user.quota.emails) {
            throw new Error("Emails quota exceeded");
        }
        if (user.usage.flows + 1 > user.quota.flows) {
            throw new Error("Flows quota exceeded");
        }
        if (user.usage.nodes + flowData.nodes.length - 2 > user.quota.nodes) {
            throw new Error("Nodes quota exceeded");
        }
        if (user.usage.leads + leads.length > user.quota.leads) {
            throw new Error("Leads quota exceeded");
        }
        // presist in db 
        const totalJobs = leads.length * emailNodes;
        const newFlowObj = {
            ...flowData,
            totalJobs,

        };
        const newFlow = await FlowModel.create({ ...newFlowObj, leads });
        if (!newFlow) {
            throw new Error("Failed to save flow in database");
        }

        const nodes = flowData.nodes;
        nodes.shift();
        nodes.pop();

        // precomputing delays 
        const delayMap = new Map();
        let cumulativeDelay = 0;
        for (const node of nodes) {
            const { delay, format } = node.data;
            if (node.type === 'wait') {
                cumulativeDelay += ConvertToSeconds(delay, format) * 1000;
                continue;
            } else if (node.type === "email") {
                delayMap.set(node.id, cumulativeDelay);
            }
        }

        const emailPromises = [];
        for (const lead of leads) {
            const { name, email } = lead;
            for (const node of nodes) {
                if (node.type === "email") {
                    let { subject, body, variables } = node?.data;
                    variables = { ...variables, name: name };
                    if (variables && Object.keys(variables).length > 0) {
                        Object.entries(variables)?.forEach(([key, value]) => {
                            const pattern = new RegExp(`{{${key}}}`, "g");
                            subject = subject.replace(pattern, `${value}`);
                            body = body.replace(pattern, `${value}`);
                        });
                    }
                    emailPromises.push(scheduleEmail(
                        delayMap.get(node.id),
                        subject,
                        body,
                        email,
                        name,
                        node.id,
                        flowData.flowId
                    ).then(
                        (res) => ({ res, nodeId: node.id, email: email, flowId: flowData.flowId }),
                    ));
                }
            }
        }
        const results = await Promise.allSettled(emailPromises);
        results.forEach((r) => {
            // console.log(`${JSON.stringify(r)} from promise`);
            if (r.status === "fulfilled") {
                const { nodeId, email, flowId } = r.value;
                console.log(`Email scheduled for node - ${nodeId}, email-${email}, flow-${flowId}`);
            } else {
                const { nodeId, email, flowId, err } = r.reason;
                Logger(LOG_LEVELS.ERROR, LOG_PATHS.SERVICELOG, {
                    title: "PROCESS FLOW FAILED",
                    nodeId,
                    email,
                    flowId,
                    error: err?.message
                });
                console.log(`Email failed for node - ${nodeId}, email-${email}, flow-${flowId}`);
            }
        });
        // post scheduling updates 
        newFlow.status = "scheduled";
        await newFlow.save();
        user.flows.push(newFlow._id);
        user.usage.flows += 1;
        user.usage.nodes += (flowData.nodes.length - 2);
        user.usage.leads += (leads.length);
        await user.save();
    } catch (error) {
        Logger(LOG_LEVELS.ERROR, LOG_PATHS.SERVICELOG, {
            title: "PROCESS FLOW FAILED",
            message: error.message,
            flowId: flowData?.id
        });
        console.log(`Error in service : processFlow - ${error}`);
        throw error;
    }
}

const deleteFlowAndJobs = async (flowId) => {
    try {
        const deletedFlow = await FlowModel.findOneAndDelete({ flowId });
        if (!deletedFlow) {
            throw new Error("Flow not found");
        }
        const { deletedCount } = await agenda.cancel({ "data.flowId": flowId });
        Logger(LOG_LEVELS.INFO, LOG_PATHS.SERVICELOG, {
            title: "DELETE FLOW AND JOBS SUCCESS",
            message: `Flow ${flowId} deleted along with ${deletedCount} jobs`,
            flowId,
        });
        return {
            flowId,
            jobsDeleted: deletedCount,
        };
    } catch (error) {
        Logger(LOG_LEVELS.ERROR, LOG_PATHS.SERVICELOG, {
            title: "DELETE FLOW AND JOBS FAILED",
            message: error.message,
            flowId: flowId
        });
        throw error;
    }
}


const fetchAllFlows = async () => {
    try {
        const flows = await FlowModel.find({});
        if (!flows) throw new Error("Flows not found");
        return flows;
    } catch (error) {
        throw error;
    }
}


const fetchFlowsByUser = async (userId) => {
    try {
        const flows = FlowModel.find({ userId });
        if (!flows) throw new Error("Flows not found by user");
        return flows;
    } catch (error) {
        throw error;
    }
}


const fetchFlowById = async (flowId) => {
    try {
        const flow = FlowModel.findOne({ flowId });
        if (!flow) throw new Error("Flow not found by flowId");
        return flow;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    processFlow,
    deleteFlowAndJobs,
    fetchAllFlows,
    fetchFlowsByUser,
    fetchFlowById
};