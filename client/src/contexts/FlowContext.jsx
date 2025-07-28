import { applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from "@xyflow/react";
import { createContext, useCallback, useContext, useState } from "react";
import { createEdge, createNode, validateFlow } from "../utils";
import toast from "react-hot-toast";
import { useLeadContext } from "./LeadContext";
import { nanoid } from "nanoid";

const FlowContext = createContext();

const defaultNodeState = [
    { id: 'lead-src', position: { x: 0, y: 0 }, data: { label: 'Add Lead Source' }, type: 'lead', draggable: false },
    { id: 'add-block', position: { x: 59, y: 80 }, data: {}, type: 'addBlock', draggable: false },
];

const defaultEdgeState = [
    { id: 'e-addblock', source: 'lead-src', target: 'add-block' }
];

export const FlowProvider = ({ children }) => {

    const { savedLeadLists } = useLeadContext();
    const [flowStarted, setFlowStarted] = useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodeState);
    const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdgeState);

    const [flowData, setFlowData] = useState({
        flowId: nanoid(),
        name: "Flow",
        loading: false,
        nodes: nodes,
        edges: edges,
        leadSrcData: {},
    });

    const updateFlow = (key, value, parentKey = null) => {
        setFlowData((prev) => {
            if (parentKey) {
                return {
                    ...prev,
                    [parentKey]: {
                        ...prev[parentKey],
                        [key]: value,
                    }
                }
            } else {
                return {
                    ...prev,
                    [key]: value
                }
            }
        });
    };


    const addNewNode = (nodeType, data) => {
        const newNode = createNode(nodeType, 0, nodes[nodes.length - 1].position.y + 40, data);
        const updatedNodes = nodes.filter(n => n.id !== 'add-block').concat(newNode);
        const newEdge1 = createEdge(nodes[nodes.length - 2].id, newNode.id);
        const newEdge2 = createEdge(newNode.id, 'add-block');

        const newAddBlockNode = {
            id: "add-block",
            position: { x: 60, y: updatedNodes[updatedNodes.length - 1].position.y + 80 },
            data: {},
            type: "addBlock",
        };

        const edgesCopy = [...flowData.edges];
        edgesCopy.pop(); // remove last add-block edge

        const finalNodes = [...updatedNodes, newAddBlockNode];
        const finalEdges = [...edgesCopy, newEdge1, newEdge2];
        setNodes(finalNodes);
        updateFlow("nodes", finalNodes);
        setEdges(finalEdges);
        updateFlow("edges", finalEdges);
    };

    const scheduleFlow = () => {
        try {
            updateFlow("loading", true);
            const leadListObj = savedLeadLists.find((lead) => lead.title === flowData?.leadSrcData?.title);
            const errorMessage = validateFlow({ flowData, leadListObj });
            // console.log(errorMessage);
            if (errorMessage) {
                throw new Error(errorMessage);
            }
            //schedule flow if no error
            toast.success("Flow scheduled successfully");
        } catch (error) {
            console.log("Error while scheduling flow", error);
            toast.error(error.message);
        } finally {
            updateFlow("loading", false);
        }
    }

    const resetFlow = () => {
        setFlowData({
            flowId: nanoid(),
            name: "Flow",
            loading: false,
            nodes: defaultNodeState,
            edges: defaultEdgeState,
            leadSrcData: {},
        });
    }

    const deleteFlow = () => {
        updateFlow("loading", true);
        // call API to delete here
        resetFlow();
    };


    // custom change handler for syncing with flowData 
    const handleNodesChange = useCallback((changes) => {
        setNodes((nds) => {
            const updated = applyNodeChanges(changes, nds);
            updateFlow("nodes", updated);
            return updated;
        });
    }, [updateFlow]);

    const handleEdgesChange = useCallback((changes) => {
        setEdges((eds) => {
            const updated = applyEdgeChanges(changes, eds);
            updateFlow("edges", updated);
            return updated;
        });
    }, [updateFlow]);

    return (
        <FlowContext.Provider value={{
            nodes,
            setNodes,
            edges,
            setEdges,
            addNewNode,
            scheduleFlow,
            deleteFlow,
            flowData,
            updateFlow,
            handleNodesChange,
            handleEdgesChange,
            flowStarted,
            setFlowStarted
        }}>
            {children}
        </FlowContext.Provider>
    )
}

export const useFlowContext = () => useContext(FlowContext);