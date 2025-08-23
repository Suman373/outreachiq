const { processFlow } = require('../services/flow.service');
const { Logger, LOG_LEVELS, LOG_PATHS } = require('../utils');


const scheduleFlow = async (req, res) => {
    const flowData = {
        "userId": "4243sdasdas32423",
        "flowId": "UXRLGb_t49mbetC2J_6qj",
        "name": "Flow",
        "nodes": [
            {
                "id": "lead-src",
                "position": {
                    "x": 0,
                    "y": 0
                },
                "data": {
                    "label": "Sat Aug 16 2025",
                    "title": "example"
                },
                "type": "lead",
                "draggable": false,
                "measured": {
                    "width": 163,
                    "height": 48
                },
                "selected": false
            },
            {
                "id": "zbYOgKNFHupkBwgtXQvui",
                "position": {
                    "x": 23.53541133197706,
                    "y": 224.7061142046174
                },
                "data": {
                    "label": "2 Minutes",
                    "delay": "2",
                    "format": "Minutes"
                },
                "type": "wait",
                "measured": {
                    "width": 115,
                    "height": 48
                },
                "selected": true,
                "dragging": false
            },
            {
                "id": "SEAXXXTYpgEETz7M-L8fKi",
                "position": {
                    "x": 8.094615206038199,
                    "y": 99.08891071773466
                },
                "data": {
                    "label": "Sat Aug 16 2025",
                    "title": "Welcome Email",
                    "subject": "Welcome to {{company}}!",
                    "body": "Hi {{name}},\n\nThanks for signing up with us. We're thrilled to have you on board. If you have any questions or need help getting started, don't hesitate to reach out.\n\nBest,\n{{senderName}}",
                    "type": "custom",
                    "variables": {
                        "company": "swifty",
                        "senderName": "swifty pr"
                    },
                    "aiGenerated": false
                },
                "type": "email",
                "measured": {
                    "width": 149,
                    "height": 48
                },
                "selected": false,
                "dragging": false
            },
            {
                "id": "add-block",
                "position": {
                    "x": 60,
                    "y": 307.1835259237729
                },
                "data": {},
                "type": "addBlock",
                "measured": {
                    "width": 32,
                    "height": 32
                }
            },
        ],
        "edges": [
            {
                "id": "P7cj3Y-DDnImrEOoJYa6M",
                "source": "lead-src",
                "target": "SEAFeTYpgEETz7M-L8fKi"
            },
            {
                "id": "gUKXWw1Yv5TzmxiODGs-S",
                "source": "SEAFeTYpgEETz7M-L8fKi",
                "target": "zbYOgKNFHupkBwgtXQvui"
            },
            {
                "id": "v0KvYd9mfJcKTurA8M4zI",
                "source": "zbYOgKNFHupkBwgtXQvui",
                "target": "add-block"
            }
        ],
        "leadSrcData": {
            "label": "Sat Aug 16 2025",
            "title": "example"
        }
    }

    const leads = [
        { name: 'Suman Roy', email: 'iamroy53@gmail.com' },
    ];
    // const {flowData, leads} = await req.body;
    const logContent = {
        flowId: flowData.id,
        userId: flowData.userId,
    }
    try {
        // if(!leads || leads.length === 0) {
        //     res.status(404).json({message:"Leads not found"});
        // }
        // if(!flowData.userId){
        //     res.status(404).json({message:"User not found"});
        // }
        await processFlow(flowData, leads);
        // return res.status(200).json({ message: "Flow scheduled successfully" });
    } catch (error) {
        Logger(LOG_LEVELS.ERROR, LOG_PATHS.CONTROLLERLOG, { title: "SCHEDULE FLOW FAILED", message: error.message, ...logContent })
        console.log(error);
        // res.status(500).json({ message: 'Internal server error' });
    }
}


setTimeout(async()=>{
    // await scheduleFlow();
},1000);

module.exports = {
    scheduleFlow
}