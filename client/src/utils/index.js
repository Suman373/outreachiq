import { nanoid } from "nanoid";

const timeUnitsInSeconds = {
    "Minutes": 60,        // 1 minute = 60 seconds
    "Hours": 3600,        // 1 hour = 3600 seconds
    "Days": 86400,        // 1 day = 86400 seconds
    "Weeks": 604800       // 1 week = 604800 seconds
};

export const createNode = (nodeType, posX, posY, data) => {
    return {
        id: nanoid(),
        position: { x: posX, y: posY },
        data: data,
        type: nodeType
    }
}

export const createEdge = (source, target) => {
    return {
        id: nanoid(),
        source: source,
        target: target
    }
}

export const convertToSeconds = (val, unit) => {
    return val * timeUnitsInSeconds[unit]
}

export const extractVariablesMap = (textList) => {
    // {{ }} match
    const allMatches = textList.flatMap(text =>
        text.match(/{{\s*[\w.]+\s*}}/g) || []
    );

    const cleanKeys = [...new Set(allMatches.map(v =>
        v.replace(/{{\s*|\s*}}/g, '').trim()
    ))]; // get word inside {{}}

    const eligibleKeys = cleanKeys.filter(key=> key.toLowerCase() === "name" || key.toLowerCase() === "email" ? null : key).filter(Boolean);

    const variablesObj = {};

    eligibleKeys.forEach(key => {
        variablesObj[key] = ""; // obj with variables as key
    });

    return variablesObj;
};


export const validateFlow = (data)=>{
    const flowObj = data.flowData;
    const leadList =  data.leadListObj.leads;
    // console.log("Validation flowobj", flowObj);
    if(!flowObj.leadSrcData?.title || flowObj.leadSrcData?.title?.toLowerCase() === "sample leads") return "Sample Leads or empty leads are not allowed.";
    if(!leadList || leadList.length < 1) return "Leads are empty or invalid"
    if(flowObj.nodes.length <= 2) return "No email or wait blocks found in the flow";
    if(flowObj.edges.length < 2) return "No sufficient edges found in the flow";

    return null;
}