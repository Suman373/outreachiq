const Agenda = require('agenda');
const constants = require('../constants/');
const { Logger, LOG_LEVELS, LOG_PATHS } = require('../utils');
const {sendEmail} = require("./email.service");

const agenda = new Agenda({
    db: {
        address: process.env.MONGODB_URI,
        collection: 'agendajobs'
    }
});

// agenda jobs

agenda.define(constants.agendaJobs.SEND_EMAIL, async (job) => {
    const { subject, body, address, name, nodeId, flowId } = job.attrs.data;
    const logContent = {
        address,
        name,
        nodeId,
        flowId,
    }
    try {
        const res = await sendEmail(subject, body, address);
        if (!res) {
            throw new Error(`Failed to send email to ${address}`);
        }
        Logger(LOG_LEVELS.INFO, LOG_PATHS.SERVICELOG, { title: "SEND EMAIL SUCCESSFUL", ...logContent });
        console.log(`Email sent to ${address}`);
    } catch (error) {
        Logger(LOG_LEVELS.ERROR, LOG_PATHS.SERVICELOG, { title: "AGENDA JOB ERROR", message: error.message, ...logContent });
        console.log(error);
    }
});

const scheduleEmail = async (time, subject, body, address, name, nodeId, flowId) => {
    const logContent = {
        address,
        name,
        nodeId,
        flowId
    };
    try {
        const scheduleAt = new Date(Date.now() + time);
        const response = await agenda.schedule(scheduleAt, constants.agendaJobs.SEND_EMAIL,
            {
                subject, body, address, name, nodeId, flowId
            });
        Logger(LOG_LEVELS.INFO, LOG_PATHS.SERVICELOG, {title:"EMAIL SCHEDULED SUCCESSFULLY",...logContent});
        console.log(`Email scheduled for ${scheduleAt}`);
        return response;
    } catch (error) {
        console.error(`Error in service: schedule email - ${error}`);
        Logger(LOG_LEVELS.ERROR, LOG_PATHS.SERVICELOG, {title:"ERROR IN SCHEDULE EMAIL", ...logContent});
        throw new Error("Error in email scheduling");
    }
}


(async () => {
    await agenda.start();
    console.log("Agenda started");
})();


module.exports = { scheduleEmail };