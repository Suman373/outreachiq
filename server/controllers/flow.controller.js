const { FLOW_SERVICE } = require('../services/index.js');
const { Logger, LOG_LEVELS, LOG_PATHS } = require('../utils');

const scheduleFlow = async (req, res) => {

    const { flowData, leads } = await req.body;
    const logContent = {
        flowId: flowData.id,
        userId: flowData.userId,
    }
    try {
        if (!leads || leads.length === 0) {
            return res.status(400).json({ message: "Leads required" });
        }
        if (!flowData.userId) {
            return res.status(400).json({ message: "UserId required" });
        }
        await FLOW_SERVICE.processFlow(flowData, leads);
        res.status(200).json({ message: "Flow scheduled successfully" });
    } catch (error) {
        Logger(LOG_LEVELS.ERROR, LOG_PATHS.CONTROLLERLOG, { title: "SCHEDULE FLOW FAILED", message: error.message, ...logContent })
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllFlows = async (req, res) => {
    try {
        const flows = await FLOW_SERVICE.fetchAllFlows();
        return res.status(200).json({message:"Fetched all flows successfully", result: flows});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getFlowsByUser = async (req, res) => {
    const { id:userId } = req.params;
    try {
        const flows = await FLOW_SERVICE.fetchFlowsByUser(userId);
        res.status(200).json({ message: "Fetched flows by user successfully", result: flows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    scheduleFlow,
    getAllFlows,
    getFlowsByUser,
}