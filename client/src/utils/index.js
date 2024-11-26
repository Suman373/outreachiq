import { nanoid } from "nanoid";

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
