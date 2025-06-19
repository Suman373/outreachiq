import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AddBlock, ColdEmail, LeadSource, LeadSourceModal, NewBlockModal, Wait } from '../index';
import { createEdge, createNode } from '../../utils';
import { FaPlay } from "react-icons/fa";


const initialNodes = [
    { id: 'lead-src', position: { x: 0, y: 0 }, data: { label: 'Add Lead Source', title: 'Lead src'  }, type: 'lead', draggable: false },
    { id: 'add-block', position: { x: 59, y: 80 }, data: {}, type: 'addBlock', draggable: false },
];
const initialEdges = [{ id: 'e-addblock', source: 'lead-src', target: 'add-block', drag: false }];

const Flow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    // comp states
    const [leadModalOpen, setLeadModalOpen] = useState(false);
    const [blockModalOpen, setBlockModalOpen] = useState(false);
    const [leadSrcData, setLeadSrcData] = useState({});

    const nodeTypes = useMemo(() => ({
        addBlock: AddBlock,
        email: ColdEmail,
        lead: LeadSource,
        wait: Wait
    }), []);


    // modal togglers
    const openBlockModal = () => setBlockModalOpen(true);
    const closeBlockModal = () => setBlockModalOpen(false);
    const openLeadModal = () => setLeadModalOpen(true);
    const closeLeadModal = () => setLeadModalOpen(false);



    // update lead source
    const updateLeadSource = (newData)=>{
        setLeadSrcData(newData);
        const updatedNodesArr = nodes.map((nd)=> nd.id==='lead-src' ? {...nd,...newData} : nd);
        setNodes(updatedNodesArr);
        closeLeadModal();
    }

    // addition of block
    const addNewNode = (nodeType,data) => {

        if (blockModalOpen) closeBlockModal();

        const newNode = createNode(nodeType,0,nodes[nodes.length-1].position.y+40,data);

        // --- removing the add block
        setNodes((prevNodes) => {
            // remove add block
            return prevNodes.filter(node => node.id !== 'add-block').concat(newNode);
        });
        // --- creating new edges 
        setEdges((prevEdges) => {
            let newEdges = [...prevEdges];

            const nodeCount = nodes.length;

            if (nodeCount === 2) { // when first new node created
                const edge1 = createEdge('lead-src', newNode.id);
                const edge2 = createEdge(newNode.id, 'add-block');
                newEdges = [edge1, edge2];
            } else if (nodeCount > 2) { // for rest of the nodes
                const lastNode = nodes[nodeCount - 2];
                const edge1 = createEdge(lastNode.id, newNode.id);
                const edge2 = createEdge(newNode.id, 'add-block');
                newEdges.pop(); // last edge is connected w add-block
                newEdges.push(edge1, edge2);
            }
            return newEdges;
        });
        // --- add add block again
        setNodes((prevNodes)=> [...prevNodes, { id: 'add-block', position: { x: 60, y: prevNodes[prevNodes.length-1].position.y+80 }, data: {}, type: 'addBlock' }])
    };



    // any node click
    const onNodeClick = (event, node) => {
        switch (node.type) {
            case 'addBlock':
                if(node.id==="add-block") openBlockModal();
                break;
            case 'lead':
                openLeadModal();
                break;
            default:
                alert("node id",node?.id);
                break;
        }
    }

    // while connecting nodes
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    // for updating lead-src node 
    useEffect(() => {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === 'lead-src') {
              return {
                ...node,
                data: {
                  ...node.data,
                  ...leadSrcData
                }
              };
            }
            return node;
          }),
        );
      }, [leadSrcData, setNodes]);

    return (
        <div style={{ width: '80%', height: '90vh', overflowX: 'scroll' }}>
            <button className='px-4 py-2 rounded-md flex justify-center items-center gap-1 bg-green-400 text-green-800'>
                <FaPlay />
               <p>Schedule</p>
            </button>
            {
                leadModalOpen && (
                    <LeadSourceModal
                    leadModalOpen={leadModalOpen}
                    closeLeadModal={closeLeadModal}
                    updateLeadSource={updateLeadSource}
                    />
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