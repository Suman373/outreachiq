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
