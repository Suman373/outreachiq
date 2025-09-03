const redisClient = require("../config/redis");
const { ANALYTICS_SERVICE } = require("../services");

const getSummary = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const year = Number(req.query.year);
        if (!userId) return res.status(400).json({ message: "UserId is required" });
        if (!year) return res.status(400).json({ message: "Year is required" });

        // cache logic
        const cacheKey = `analytics:${userId}:summary:${year}`;
        try {
            const cachedSummary = await redisClient.get(cacheKey);
            if (cachedSummary) {
                console.log("Cache hit");
                return res.status(200).json({ message: "Fetched summary successfully from cache", result: JSON.parse(cachedSummary) });
            }
        } catch (error) {
            console.log("Cache get failed", error.message);
        }

        const response = await ANALYTICS_SERVICE.fetchAnalyticsSummary(userId, year);
        if (!response) {
            throw new Error("Failed to fetch summary for analytics");
        }
        try {
            await redisClient.setex(cacheKey, 600, JSON.stringify(response.summary))
        } catch (error) {
            console.log("Cache set failed", error.message);
        }
        res.status(200).json({ message: "Fetched summary successfully", result: response.summary });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getQuickStats = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const year = Number(req.query.year);
        if (!userId) return res.status(400).json({ message: "UserId is required" });
        if (!year) return res.status(400).json({ message: "Year is required" });
        // cache logic
        const cacheKey = `analytics:${userId}:quickstats:${year}`;
        try {
            const cachedQuickStats = await redisClient.get(cacheKey);
            if (cachedQuickStats) {
                console.log("Cache hit");
                return res.status(200).json({ message: "Fetched quick stats successfully from cache", result: JSON.parse(cachedQuickStats) });
            }
        } catch (error) {
            console.log("Cache get failed", error.message);
        }

        const response = await ANALYTICS_SERVICE.fetchQuickStats(userId, year);
        if (!response) {
            throw new Error("Failed to fetch quick stats for analytics");
        }
        try {
            await redisClient.setex(cacheKey, 600, JSON.stringify(response.quickStats));
        } catch (error) {   
            console.log("Cache set failed",error.message);
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


/*

const boiler = async (req, res) => {
    try {

    } catch (error) {

    }
}

*/