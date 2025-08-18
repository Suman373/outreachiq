const { processFlow } = require('../services/flow.service');

const scheduleFlow = async(req,res)=>{
    try {
        const {flowData, leads} = await req.body;
        if(!leads || leads.length === 0) {
            res.status(404).json({message:"Leads not found"});
        }
        console.log(flowData,leads);
        // const flowServiceRes = await processFlow();
        return res.status(200).json({message:"Flow scheduled successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    scheduleFlow
}