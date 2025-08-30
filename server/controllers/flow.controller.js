const { FLOW_SERVICE } = require('../services/index.js');
const { Logger, LOG_LEVELS, LOG_PATHS } = require('../utils');

const scheduleFlow = async (req, res) => {

    const {flowData, leads} = await req.body;
    const logContent = {
        flowId: flowData.id,
        userId: flowData.userId,
    }
    try {
        if(!leads || leads.length === 0) {
            return res.status(400).json({message:"Leads required"});
        }
        if(!flowData.userId){
            return res.status(400).json({message:"UserId required"});
        }
        await FLOW_SERVICE.processFlow(flowData, leads);
        res.status(200).json({ message: "Flow scheduled successfully" });
    } catch (error) {
        Logger(LOG_LEVELS.ERROR, LOG_PATHS.CONTROLLERLOG, { title: "SCHEDULE FLOW FAILED", message: error.message, ...logContent })
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    scheduleFlow
}