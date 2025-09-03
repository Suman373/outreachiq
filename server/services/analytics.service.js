const { FlowModel } = require("../database/models");
const { Logger, LOG_LEVELS, LOG_PATHS } = require("../utils");

const fetchAnalyticsSummary = async (userId, year) => {
    try {
        const yearLb = new Date(`${year}-01-01T00:00:00.000Z`);
        const yearUb = new Date(`${year + 1}-01-01T00:00:00.000Z`);
        const [flowRes, emailRes] = await Promise.allSettled([
            FlowModel.aggregate([
                {
                    $match: {
                        userId,
                        createdAt: {
                            $gte: yearLb,
                            $lt: yearUb
                        }
                    }
                },
                {
                    $group: {
                        _id: { $dateTrunc: { date: "$createdAt", unit: "month" } },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { "_id": 1 },
                },
                {
                    $project: {
                        _id: 0,
                        month: { $dateToString: { format: "%b", date: "$_id" } },
                        count: 1
                    }
                }
            ]),
            FlowModel.aggregate([
                {
                    $match: {
                        userId,
                        createdAt: {
                            $gte: yearLb,
                            $lt: yearUb
                        }
                    }
                },
                {
                    $group: {
                        _id: { $dateTrunc: { date: "$createdAt", unit: "month" } },
                        count: { $sum: "$completedJobs" }
                    }
                },
                {
                    $sort: { "_id": 1 },
                },
                {
                    $project: {
                        _id: 0,
                        month: { $dateToString: { format: "%b", date: "$_id" } },
                        count: 1
                    }
                }
            ])
        ]);
        const summary = {
            flowCreationTrend: flowRes.status === "fulfilled" ? flowRes.value : null,
            emailSentTrend: flowRes.status === "fulfilled" ? emailRes.value : null
        };
        if (!summary.flowCreationTrend && !summary.emailSentTrend) {
            throw new Error("Failed to fetch analytics summary");
        }
        return {
            userId,
            year,
            summary
        };
    } catch (error) {
        console.log(error);
        Logger(LOG_LEVELS.ERROR, LOG_PATHS.SERVICELOG, error?.message);
        throw error;
    }
}


const fetchQuickStats = async (userId, year) => {
    try {
        const yearLb = new Date(`${year}-01-01T00:00:00.000Z`);
        const yearUb = new Date(`${year + 1}-01-01T00:00:00.000Z`);

        const quickStats = await FlowModel.aggregate([
            {
                $match: {
                    userId,
                    createdAt: {
                        $gte: yearLb,
                        $lt: yearUb
                    }
                },
            },
            {
                $group: {
                    _id: null,
                    totalFlows: { $sum: 1 },
                    totalJobs: { $sum: "$totalJobs" },
                    completedJobs: { $sum: "$completedJobs" },
                    failedJobs: { $sum: "$failedJobs" },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalFlows: 1,
                    totalJobs: 1,
                    completedJobs: 1,
                    failedJobs: 1,
                    jobSuccessRatio: {
                        $cond: [
                            { $eq: ["$totalJobs", 0] }, 0, { $divide: ["$completedJobs", "$totalJobs"] }
                        ]
                    }
                }
            },
        ]);
        if (quickStats.length === 0) throw new Error("Could not fetch quick stats");
        return {
            userId,
            year,
            quickStats:quickStats[0]
        }
    } catch (error) {
        console.log(error);
        Logger(LOG_LEVELS.ERROR, LOG_PATHS.SERVICELOG, error?.message);
        throw error;
    }
}


module.exports = {
    fetchAnalyticsSummary,
    fetchQuickStats
}