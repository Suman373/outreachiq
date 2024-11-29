const Agenda = require('agenda');
const constants = require('../constants/');
const {sendEmail} = require('./email.service');

const agenda = new Agenda({
    db: {
        address: process.env.MONGODB_URI,
        collection: 'agendajobs'
    }
});

// agenda jobs

agenda.define(constants.agendaJobs.SEND_EMAIL, async(job)=>{
    try {
        const {subject, body, address} = job.attrs.data;
        const res = await sendEmail(subject, body, address);
        if(!res) throw new Error(`Failed to send email to ${address}`);
        console.log(`Email sent to ${address}`);
    } catch (error) {
        console.log(error)
    }
});

(async () => {
    await agenda.start();
    console.log("Agenda started");
  })();

const scheduleEmail = async(time,subject,body,address)=>{
    try {
        await agenda.schedule('in 10 seconds', constants.agendaJobs.SEND_EMAIL,
        {
            subject, body, address
        });
        console.log('Email scheduled');
    } catch (error) {
        console.error(error);
        throw new Error("Error in email scheduling");
    }   
}

module.exports = {scheduleEmail};