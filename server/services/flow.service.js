const { FlowModel } = require('../database/models');
const { ConvertToSeconds, Logger, LOG_LEVELS, LOG_PATHS } = require('../utils/');
const { scheduleEmail } = require('./schedule.service');

const processFlow = async (flowData, leads) => {
    try {
        console.log(flowData);
        // save in db 
        const dbRes = await FlowModel.create({...flowData,leads});
        if(!dbRes){
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
                        (res) => ({res, nodeId: node.id, email: email, flowId: flowData.flowId }),
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
    }
}

module.exports = { processFlow };