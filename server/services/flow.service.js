const agenda = require('../config/agenda');
const { agendaJobs } = require('../constants');
const { FlowModel } = require('../database/models');
const { ConvertToSeconds, Logger, LOG_LEVELS, LOG_PATHS } = require('../utils/');
const { scheduleEmail } = require('./schedule.service');


// agenda job success
agenda.on(agendaJobs.SUCCESS_SEND_EMAIL, async (job) => {
    const { flowId } = job.attrs.data;
    const flow = await FlowModel.findOne({ flowId });
    flow.completedJobs += 1;
    // all jobs finished
    if (flow.completedJobs + flow.failedJobs >= flow.totalJobs) {
        if (flow.failedJobs > 0) {
            flow.status = "partial";
        } else {
            flow.status = "completed";
        }
    }
    await flow.save();
});

// agenda job fail
agenda.on(agendaJobs.FAILURE_SEND_EMAIL, async (err, job) => {
    const { flowId } = job.attrs.data;
    const flow = await FlowModel.findOne({ flowId });
    flow.failedJobs += 1;
    // all jobs finished
    if (flow.completedJobs + flow.failedJobs >= flow.totalJobs) {
        if (flow.completedJobs > 0) {
            flow.status = "partial";
        } else {
            flow.status = "failed";
        }
    }
    await flow.save();
});


const processFlow = async (flowData, leads) => {
    try {
        // save in db 
        let emailNodes = 0;
        flowData.nodes.forEach((nd) => nd.type === "email" && emailNodes++);
        const totalJobs = leads.length * emailNodes;
        const newFlowObj = {
            ...flowData,
            totalJobs,

        };
        const dbRes = await FlowModel.create({ ...newFlowObj, leads });
        if (!dbRes) {
            throw new Error("Failed to save flow in database");
        }
        const nodes = flowData.nodes;
        nodes.shift();
        nodes.pop();

        const delayMap = new Map();
        let cumulativeDelay = 0;
        // precomputing delays 
        // console.log(nodes.length);
        for (const node of nodes) {
            const { delay, format } = node.data;
            if (node.type === 'wait') {
                cumulativeDelay += ConvertToSeconds(delay, format) * 1000;
                continue;
            } else if (node.type === "email") {
                delayMap.set(node.id, cumulativeDelay);
            }
        }
        // console.log(delayMap);
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
            console.log(`${JSON.stringify(r)} from promise`);
            if (r.status === "fulfilled") {
                const { nodeId, email, flowId } = r.value;
                console.log(`Email scheduled for node - ${nodeId}, email-${email}, flow-${flowId}`);
            } else {
                const { nodeId, email, flowId, err } = r.reason;
                // logger error
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
        const flows = FlowModel.find({userId});
        if(!flows) throw new Error("Flows not found by user");
        return flows;
    } catch (error) {
        throw error;
    }
}


const fetchFlowById = async (flowId) => {
    try {
        const flow = FlowModel.findOne({flowId});
        if(!flow) throw new Error("Flow not found by flowId");
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