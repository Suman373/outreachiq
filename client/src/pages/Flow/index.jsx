import  { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AddBlock, ColdEmail, LeadSource, LeadSourceModal, NewBlockModal, Wait } from '../../components/index';
import { useFlowContext } from '../../contexts/FlowContext';

const Flow = () => {

    const {
        setNodes,
        setEdges,
        addNewNode,
        flowData,
        updateFlow,
        handleEdgesChange,
        handleNodesChange,
        flowStarted,
        deleteNode
    } = useFlowContext();

    // comp states
    const [leadModalOpen, setLeadModalOpen] = useState(false);
    const [blockModalOpen, setBlockModalOpen] = useState(false);


    // console.log(flowData.nodes);

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
    const updateLeadSource = (newData) => {
        updateFlow("leadSrcData", newData);
        const updatedNodesArr = flowData.nodes.map((nd) => nd.id === 'lead-src' ? { ...nd, data: { ...nd.data, ...newData } } : nd);
        // console.log(updatedNodesArr);
        setNodes(updatedNodesArr);
        updateFlow("nodes", updatedNodesArr);
        closeLeadModal();
    }

    // any node click
    const onNodeClick = (event, node) => {
        console.log(node);
        switch (node.type) {
            case 'addBlock':
                if (node.id === "add-block") openBlockModal();
                break;
            case 'lead':
                openLeadModal();
                break;
            default:
                alert(`node id - ${node.id}`);
                break;
        }
    }

    // right click node delete
    const onNodeContextMenu = (event,node)=>{
        event.preventDefault();
        if(node.type === "lead" || node.type === "addBlock") return;
        console.log(node);
        deleteNode(node.id);
    }

    // while connecting nodes
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
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
                            ...flowData.leadSrcData
                        }
                    };
                }
                return node;
            }),
        );
    }, [flowData.leadSrcData, setNodes]);


    if (!flowStarted) {
        return (
            <div className="min-h-screen grid place-content-center">
                <p className="text-md px-4 py-2 m-1 rounded-lg text-amber-900 text-center bg-amber-200">
                    Click on Create Flow to start a new flow
                </p>
            </div>
        )
    }

    return (
        <div className='relative' style={{ width: '100%', height: '95vh', overflowX: 'scroll' }}>
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
                nodes={flowData.nodes}
                edges={flowData.edges}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                onConnect={onConnect}
                onNodeContextMenu={onNodeContextMenu}
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