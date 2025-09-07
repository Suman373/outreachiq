import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineContentCopy } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import { AddBlock, ColdEmail, LeadSource, TextBadge, ViewLeadsModal, Wait } from "../../components";
import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import { getFlowById } from "../../api/flow";
import toast from "react-hot-toast";
import { flowStatus } from "../../utils";

const FlowDetails = () => {

    const navigate = useNavigate();
    const { id: flowId } = useParams();

    const defaultNodeState = [
        { id: 'lead-src', position: { x: 0, y: 0 }, data: { label: 'Add Lead Source' }, type: 'lead', draggable: false },
        { id: 'add-block', position: { x: 59, y: 80 }, data: {}, type: 'addBlock', draggable: false },
    ];

    const defaultEdgeState = [
        { id: 'e-addblock', source: 'lead-src', target: 'add-block' }
    ];

    const [flowData, setFlowData] = useState({});
    const [viewLeadsModal, setViewLeadsModal] = useState(false);

    const nodeTypes = useMemo(() => ({
        addBlock: AddBlock,
        email: ColdEmail,
        lead: LeadSource,
        wait: Wait
    }), []);

    const closeViewLeadsModal = () => {
        setViewLeadsModal(false);
    }

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard");
        } catch (error) {
            console.log(error);
            toast.error("Failed to copy to clipboard");
        }
    }

    const fetchFlowData = async (flowId) => {
        try {
            const data = await getFlowById(flowId);
            if (!data) throw new Error;
            const nodes = data.result.nodes;
            const edges = data.result.edges;
            edges.pop();
            nodes.pop();
            console.log(data);
            setFlowData({ ...data.result, 
                nodes: nodes, 
                edges: edges,
                leads: data?.result?.leads || [] });
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch flow data.\nTry again later");
        }
    }

    const renderBadge = () => {
        switch (flowData.status) {
            case 'draft':
                return <TextBadge text={"Draft"} type={""} />
            case 'scheduled':
                return <TextBadge text={"Scheduled"} type={"info"} />
            case 'failed':
                return <TextBadge text={"Failed"} type={"error"} />
            case 'completed':
                return <TextBadge text={"Completed"} type={"success"} />
        }
    }

    useEffect(() => {
        fetchFlowData(flowId);
    }, []);

    return (
        <section className="">
            {
                viewLeadsModal ?
                    (<ViewLeadsModal
                        leadsArr={flowData?.leads}
                        viewLeadsModal={viewLeadsModal}
                        closeViewLeadsModal={closeViewLeadsModal}
                    />) : null
            }
            <div className="h-fit flex items-start justify-start gap-2">
                <FaArrowLeft className="mt-1.5 ml-1" onClick={() => navigate("/")} />
                <div className="flex flex-col gap-1 text-neutral-600">
                    <div className="flex items-center gap-2 text">
                        <h1 className="text-lg md:text-xl font-semibold text-black">{flowData.name}</h1>
                        {renderBadge()}
                    </div>
                    <p className="text-sm">{flowId}
                        <span className="inline-block ml-3 cursor-pointer">
                            <MdOutlineContentCopy
                                onClick={() => handleCopy(`${flowId}`)}
                                className="text-md" /></span>
                    </p>
                    <p className="flex gap-3">
                        <span className="">Total jobs: {flowData.totalJobs}</span>
                        <span className="">Completed jobs: {flowData.completedJobs}</span>
                        <span>Job success percentage: {((flowData.completedJobs / flowData.totalJobs) * 100).toFixed(2)}%</span>
                    </p>
                    <p>
                        {flowData?.leads?.length > 1 ? "Leads" : "Lead"}: {flowData?.leads?.length}
                        <span 
                        onClick={()=> setViewLeadsModal(true)}
                        className="mx-2 inline-block text-base text-brand cursor-pointer underline">View</span>
                    </p>
                </div>
            </div>
            {/* <div className="h-[200px] bg-brandLighter my-2 p-2">

            </div> */}
            <div className='relative' style={{ width: '100%', height: '80vh', overflowX: 'scroll' }}>
                <ReactFlow
                    nodes={flowData.nodes}
                    edges={flowData.edges}
                    fitView
                    nodeTypes={nodeTypes}
                    nodesDraggable={false}
                    edgesupdatable={false}
                    onNodeClick={(_, node) => alert(node.id)}
                    nodesConnectable={false}
                >
                    <Controls />
                    <MiniMap />
                    <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
            </div>

        </section>
    )
}

export default FlowDetails;