const Agenda = require('agenda');
const constants = require('../constants/');
const { sendEmail } = require('./email.service');
const fs = require('fs');
const path = require('path');

const agenda = new Agenda({
    db: {
        address: process.env.MONGODB_URI,
        collection: 'agendajobs'
    }
});

// agenda jobs

agenda.define(constants.agendaJobs.SEND_EMAIL, async (job) => {
    try {
        const { subject, body, address, name, nodeId, flowId } = job.attrs.data;
        const res = await sendEmail(subject, body, address);
        if (!res) {
            const logContent = {
                status: "failed",
                address,
                name,
                nodeId,
                flowId,
                time: new Date()
            }
            fs.appendFile(path.join(__dirname, 'logs/servicelog.jsonl'), JSON.stringify(logContent, 2, null), (err) => {
                if (err) {
                    console.log(`Failed to write in servicelog.jsonl - ${err}`);
                }
            });
            throw new Error(`Failed to send email to ${address}`);
        }
        console.log(`Email sent to ${address}`);
    } catch (error) {
        console.log(error)
    }
});

const scheduleEmail = async (time, subject, body, address, name, nodeId, flowId) => {
    try {
        const scheduleAt = new Date(Date.now() + time);
        await agenda.schedule(scheduleAt, constants.agendaJobs.SEND_EMAIL,
            {
                subject, body, address, name, nodeId, flowId
            });
        console.log(`Email scheduled for ${scheduleAt}`);
    } catch (error) {
        console.error(`Error in service: schedule email - ${error}`);
        throw new Error("Error in email scheduling");
    }
}


(async () => {
    await agenda.start();
    console.log("Agenda started");
})();


module.exports = { scheduleEmail };