const { ConvertToSeconds } = require('../utils/');
const { scheduleEmail } = require('./schedule.service');

const flowData = {
    "flowId": "UXRLGb_t49mbetC2J_6qj",
    "name": "Flow",
    "loading": false,
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
            "id": "SEAFeTYpgEETz7M-L8fKi",
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
        // {
        //     "id": "zbYCDxKNFHupkBwgtXQvui",
        //     "position": {
        //         "x": 23.53541133197706,
        //         "y": 224.7061142046174
        //     },
        //     "data": {
        //         "label": "4 Minutes",
        //         "delay": "4",
        //         "format": "Minutes"
        //     },
        //     "type": "wait",
        //     "measured": {
        //         "width": 115,
        //         "height": 48
        //     },
        //     "selected": true,
        //     "dragging": false
        // },
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
    // { name: 'Jane Smith', email: 'janesmith@example.com' },
    // { name: 'Michael Johnson', email: 'mjohnson@example.com' },
    // { name: 'Emily Davis', email: 'emilyd@example.com' },
    // { name: 'Chris Brown', email: 'chris.brown@example.com' },
    // { name: 'Olivia Wilson', email: 'oliviaw@example.com' },
    // { name: 'Daniel Martinez', email: 'danmartinez@example.com' },
    // { name: 'Sophia Anderson', email: 'sophiaa@example.com' },
    // { name: 'David Thomas', email: 'davidthomas@example.com' },
    // { name: 'Ava Taylor', email: 'ava.taylor@example.com' },
    // { name: 'James Moore', email: 'james.moore@example.com' },
    // { name: 'Mia Jackson', email: 'mia.jackson@example.com' },
    // { name: 'Robert White', email: 'robertwhite@example.com' },
    // { name: 'Isabella Harris', email: 'isb.harris@example.com' },
    // { name: 'William Martin', email: 'wmartin@example.com' },
    // { name: 'Charlotte Thompson', email: 'charlottet@example.com' },
    // { name: 'Joseph Garcia', email: 'josephg@example.com' },
    // { name: 'Amelia Martinez', email: 'amartinez@example.com' },
    // { name: 'Charles Robinson', email: 'charlesr@example.com' },
    // { name: 'Evelyn Clark', email: 'evelync@example.com' },
    // { name: 'George Rodriguez', email: 'georger@example.com' },
    // { name: 'Abigail Lewis', email: 'abigail.lewis@example.com' },
    // { name: 'Thomas Lee', email: 'thomas.lee@example.com' },
    // { name: 'Ella Walker', email: 'ella.walker@example.com' },
    // { name: 'Henry Hall', email: 'henryhall@example.com' },
    // { name: 'Scarlett Allen', email: 'scarlett.allen@example.com' },
    // { name: 'Jack Young', email: 'jyoung@example.com' },
    // { name: 'Aria Hernandez', email: 'ariah@example.com' },
    // { name: 'Samuel King', email: 'sam.king@example.com' },
    // { name: 'Grace Wright', email: 'gracew@example.com' },
    // { name: 'Andrew Scott', email: 'ascott@example.com' },
    // { name: 'Chloe Green', email: 'chloeg@example.com' },
    // { name: 'Joshua Adams', email: 'joshadams@example.com' },
    // { name: 'Lily Baker', email: 'lilyb@example.com' },
    // { name: 'Ryan Gonzalez', email: 'ryang@example.com' },
    // { name: 'Zoe Nelson', email: 'zoen@example.com' },
    // { name: 'Anthony Carter', email: 'acarter@example.com' },
    // { name: 'Hannah Mitchell', email: 'hannahm@example.com' },
    // { name: 'Kevin Perez', email: 'kevinp@example.com' },
    // { name: 'Natalie Roberts', email: 'nroberts@example.com' },
    // { name: 'Brian Turner', email: 'bturner@example.com' },
    // { name: 'Leah Phillips', email: 'leahp@example.com' },
    // { name: 'Justin Campbell', email: 'jcampbell@example.com' },
    // { name: 'Sofia Parker', email: 'sofiap@example.com' },
    // { name: 'Jason Evans', email: 'jevans@example.com' },
    // { name: 'Layla Edwards', email: 'laylae@example.com' },
    // { name: 'Brandon Collins', email: 'bcollins@example.com' },
    // { name: 'Audrey Stewart', email: 'audrey.s@example.com' },
    // { name: 'Aaron Sanchez', email: 'aarons@example.com' },
    // { name: 'Victoria Morris', email: 'vmorris@example.com\x1B' }
];

const processFlow = async (_) => {
    try {
        const nodes = flowData.nodes;
        nodes.shift();
        nodes.pop();
        const scheduledLeads = [];
        const delayMap = new Map();
        let cumulativeDelay = 0;
        // precomputing delays 
        // console.log(nodes.length);
        for (const node of nodes) {
            const { delay, format } = node.data;
            if (node.type === 'wait') {
                cumulativeDelay += ConvertToSeconds(delay, format) * 1000;
                continue;
            } else if (node.type === "email") {
                delayMap.set(node.id, cumulativeDelay);
            }
        }
        
        for (const lead of leads) {
            const { name, email } = lead;
            for (const node of nodes) {
                if (node.type === "email") {
                    let { subject, body, variables } = node?.data;
                    variables = {...variables,name:name};
                    if (variables && Object.keys(variables).length > 0) {
                        Object.entries(variables)?.forEach(([key, value]) => {
                            const pattern = new RegExp(`{{${key}}}`, "g");
                            subject = subject.replace(pattern, `${value}`);
                            body = body.replace(pattern, `${value}`);
                        });
                    } 
                    const response = await scheduleEmail(delayMap.get(node.id),subject,body,email,name,node.id,flowData.flowId);
                    if(!response){
                        throw new Error("Failed to schedule email for lead");
                    }
                    return response;
                }
            }
        }
        console.log(delayMap);
    } catch (error) {
        console.log(`Error in service : processFlow - ${error}`);
    }
}


module.exports = { processFlow };