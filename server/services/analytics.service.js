const { FlowModel } = require("../database/models");
const { Logger, LOG_LEVELS, LOG_PATHS } = require("../utils");

const fetchAnalyticsSummary = async (userId, year) => {
    try {
        const yearLb = new Date(`${year}-01-01T00:00:00.000Z`);
        const yearUb = new Date(`${year+1}-01-01T00:00:00.000Z`);
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
                        month: { $dateToString: { format: "%b-%Y", date: "$_id" } },
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
                        month: { $dateToString: { format: "%b-%Y", date: "$_id" } },
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
            summary
        };
    } catch (error) {
        console.log(error);
        Logger(LOG_LEVELS.ERROR, LOG_PATHS.SERVICELOG, error?.message);
        throw error;
    }
}


module.exports = {
    fetchAnalyticsSummary,
}