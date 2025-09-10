import { nanoid } from "nanoid";

const timeUnitsInSeconds = Object.freeze({
    "Minutes": 60,        // 1 minute = 60 seconds
    "Hours": 3600,        // 1 hour = 3600 seconds
    "Days": 86400,        // 1 day = 86400 seconds
    "Weeks": 604800       // 1 week = 604800 seconds
});

export const flowStatus = Object.freeze({
    "draft": "Draft",
    "scheduled": "Scheduled",
    "failed": "Failed",
    "completed": "Completed",
    "partial": "Partial"
});

export const appLanguages = [
    { name: "🇺🇸 English", value: "en" },
    { name: "🇪🇸 Spanish", value: "es" },
    { name: "🇫🇷 French", value: "fr" },
    { name: "🇩🇪 German", value: "de" },
    { name: "🇮🇳 Hindi", value: "hi" },
]

export const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


export const quickStatsEnum = Object.freeze({
    totalFlows: "Total Flows",
    totalJobs: "Total Jobs",
    completedJobs: "Completed Jobs",
    failedJobs: "Failed Jobs",
    jobSuccessRatio: "Job Success Ratio"
});



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

    const eligibleKeys = cleanKeys.filter(key => key.toLowerCase() === "name" || key.toLowerCase() === "email" ? null : key).filter(Boolean);

    const variablesObj = {};

    eligibleKeys.forEach(key => {
        variablesObj[key] = ""; // obj with variables as key
    });

    return variablesObj;
};


export const validateFlow = (data) => {
    const flowObj = data?.flowData;
    const leadList = data.leadListObj?.leads;
    // console.log("Validation flowobj", flowObj);
    if (!flowObj.userId) return "UserId is required";
    if (!flowObj.leadSrcData?.title || flowObj.leadSrcData?.title?.toLowerCase() === "sample leads") return "Sample Leads or empty leads are not allowed.";
    if (flowObj.scheduled === true) return "Flow is already scheduled"
    if (!leadList || leadList.length < 1) return "Leads are empty or invalid"
    if (flowObj.nodes.length <= 2) return "No email or wait blocks found in the flow";
    if (flowObj.edges.length < 2) return "No sufficient edges found in the flow";

    return null;
}

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,10}(\.[a-zA-Z]{2,10})*$/;
    return regex.test(email);
}

export const validatePassword = (password) => {
    const regex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
};

export const getAxes = (xLabel, xType, yLabel, yType) => {
    return [
        {
            type: `${xType}`,
            position: 'bottom',
            title: { text: `${xLabel}` },
        },
        {
            type: `${yType}`,
            position: 'left',
            title: { text: `${yLabel}` },
        },
    ];
}

export const getUserYears = (createdAt) => {
    const firstYear = new Date(createdAt).getFullYear();
    const currYear = new Date().getFullYear();
    const userYears = Array.from(
        { length: currYear - firstYear + 1 },
        (_, i) => firstYear + i);
    if (!userYears) return [];
    return userYears;
}
