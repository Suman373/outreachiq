const ai = require('../config/ai');
const { AILogsModel } = require('../database/models');
const { Logger, LOG_LEVELS, LOG_PATHS } = require('../utils');
const { checkAndIncreaseUsage } = require('./user.service');

const subjectLineModification = async (userId, subject) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `${subject}`,
            config: {
                systemInstruction: "Improve the email subject provided. One answer only. Maintain all grammar and tone improvements, and keep it short and concise.",
                temperature: 0.2,
                temperature: 0.2,
                thinkingConfig: {
                    thinkingBudget: 0
                }
            },
        });
        if (!response.text) throw new Error("Failed to generate subject line");
        await checkAndIncreaseUsage(userId, "aiTokens", response.usageMetadata.totalTokenCount);
        const ailogObj = {
            userId,
            type: "text-subject",
            prompt: subject,
            response: response.text,
            tokensUsed: response.usageMetadata.totalTokenCount,
            status: "success"
        };
        await AILogsModel.create(ailogObj);
        return response.text;
    } catch (error) {
        console.log(error);
        Logger(LOG_LEVELS.ERROR, LOG_PATHS.SERVICELOG, error?.message);
        const ailogObj = {
            userId,
            type: "text-subject",
            prompt: subject,
            error: error?.message || "Something went wrong",
            status: "failed"
        };
        await AILogsModel.create(ailogObj);
        throw error;
    } 
}

const emailBodyModification = async (userId, body) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `${body}`,
            config: {
                systemInstruction: "Improve the email body provided. One answer only. Maintain all grammar and tone improvements. Keep it same length or short.",
                temperature: 0.2,
                thinkingConfig: {
                    thinkingBudget: 0
                }
            },
        });
        if (!response.text) throw new Error("Failed to generate email body");
        await checkAndIncreaseUsage(userId, "aiTokens", response.usageMetadata.totalTokenCount);
        const ailogObj = {
            userId,
            type: "text-body",
            prompt: body,
            response: response.text,
            tokensUsed: response.usageMetadata.totalTokenCount,
            status: "success"
        };
        await AILogsModel.create(ailogObj);
        return response.text;
    } catch (error) {
        console.log(error);
        Logger(LOG_LEVELS.ERROR, LOG_PATHS.SERVICELOG, error?.message);
        const ailogObj = {
            userId,
            type: "text-body",
            prompt: body,
            error: error?.message || "Something went wrong",
            status: "failed"
        };
        await AILogsModel.create(ailogObj);
        throw error;
    }
}


module.exports = {
    subjectLineModification,
    emailBodyModification,
};


