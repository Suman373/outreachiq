const {EMAIL_SERVICE, SCHEDULE_SERVICE} = require('../services/');

// a [POST] API where time, email body, subject and an email address can be requested.
const scheduleFlow = async(req,res)=>{
    
    const {time,body,subject,address} = req.body;
    if(!time || !body || !subject || !address){
        return res.status(400).json({message: "Missing required fields"});
    }
    try {
        await SCHEDULE_SERVICE.scheduleEmail(
            time,
            subject,
            body,
            address
        );
        res.status(200).json({message:'Email scheduled successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    scheduleFlow
}