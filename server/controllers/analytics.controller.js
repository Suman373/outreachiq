const { ANALYTICS_SERVICE } = require("../services");

const getSummary = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const { year } = req.query;
        if (!userId) return res.status(400).json({ message: "UserId is required" });
        if (!year) return res.status(400).json({ message: "Year is required" });
        const response = await ANALYTICS_SERVICE.fetchAnalyticsSummary(userId, Number(year));
        if (!response) {
            throw new Error("Failed to fetch summary for analytics");
        }
        res.status(200).json({ message: "Fetched summary successfully", result: response.summary });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const boiler = async (req, res) => {
    try {

    } catch (error) {

    }
}

const getQuickStats = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const { year } = req.query;
        if (!userId) return res.status(400).json({ message: "UserId is required" });
        if (!year) return res.status(400).json({ message: "Year is required" });
        const response = await ANALYTICS_SERVICE.fetchQuickStats(userId, Number(year));
        if (!response) {
            throw new Error("Failed to fetch quick stats for analytics");
        }
        res.status(200).json({ message: "Fetched quick stats successfully", result: response.quickStats });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getSummary,
    getQuickStats
}