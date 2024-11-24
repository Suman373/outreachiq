import React, { useCallback, useMemo, useState } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from '@xyflow/react';
import Modal from 'react-modal';
import '@xyflow/react/dist/style.css';
import { nanoid } from 'nanoid';
import { AddBlock, ColdEmail, NewBlockModal } from '../../components';


const initialNodes = [
    { id: 'lead-src', position: { x: 0, y: 0 }, data: { label: 'Add Lead Source' }, draggable: false },
    { id: 'add-block', position: { x: 59, y: 60 }, data: {}, type: 'addBlock', draggable: false },
];
const initialEdges = [{ id: 'e-addblock', source: 'lead-src', target: 'add-block', drag: false }];

const Flow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    // comp states
    const [leadSourceModal, setLeadSourceModal] = useState(false);
    const [blockModalOpen, setBlockModalOpen] = useState(false);

    const nodeTypes = useMemo(() => ({
        addBlock: AddBlock,
        email: ColdEmail
    }), []);

    const openBlockModal = () => setBlockModalOpen(true);
    const closeBlockModal = () => setBlockModalOpen(false);


    const createNode = (nodeType,posX,posY,data)=>{
        return {
            id: nanoid(),
            position: {x:posX, y:posY},
            data: data,
            type: nodeType
        }
    }

    const createEdge = (source, target) => {
        return {
            id: nanoid(),
            source: source,
            target: target
        }
    }

    const addNewNode = (nodeType) => {

        if (blockModalOpen) closeBlockModal();

        const newNode = createNode(nodeType,59,nodes[nodes.length-1].position.y+40,{});

        // First, update the nodes
        setNodes((prevNodes) => {
            // remove add block
            // prevNodes.pop();
            return prevNodes.filter(node => node.id !== 'add-block').concat(newNode);
        });

        setEdges((prevEdges) => {
            let newEdges = [...prevEdges];

            const nodeCount = nodes.length;
            console.log("Node count",nodeCount);

            if (nodeCount === 2) { // Third node case
                const edge1 = createEdge('lead-src', newNode.id);
                const edge2 = createEdge(newNode.id, 'add-block');
                newEdges = [edge1, edge2];
            } else if (nodeCount > 2) { // For subsequent nodes after the third
                const lastNode = nodes[nodeCount - 2];
                const edge1 = createEdge(lastNode.id, newNode.id);
                const edge2 = createEdge(newNode.id, 'add-block');
                newEdges.pop(); // Remove the last edge to keep it clean
                newEdges.push(edge1, edge2);
            }
            return newEdges;
        });

        setNodes((prevNodes)=> [...prevNodes, { id: 'add-block', position: { x: 59, y: prevNodes[prevNodes.length-1].position.y+60 }, data: {}, type: 'addBlock' }])
    };

    const toggleBlockModal = () => {
        if (!blockModalOpen) openBlockModal();
        else closeBlockModal();
    }

    // any node click
    const onNodeClick = (event, node) => {
        if (node.type === "addBlock") {
            if (node.id === "add-block") toggleBlockModal();
        }
        else alert("Node id", node.id);
    }

    // while connecting nodes
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>

            {
                leadSourceModal && (
                    <Modal className="absolute top-0 left-0 ">
                        Add Lead Source
                    </Modal>
                )
            }
            {
                blockModalOpen && (
                    <NewBlockModal
                        blockModalOpen={blockModalOpen}
                        closeBlockModal={closeBlockModal}
                        addNewNode={addNewNode} />
                )
            }
            <ReactFlow
                // attaching onClick handler for each node
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                fitView
                nodeTypes={nodeTypes}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}

export default Flow;