import { FaAngleUp } from "react-icons/fa";
import { useFlowContext } from "../../contexts/FlowContext";
import { FaAngleDown } from "react-icons/fa";
import { useLeadContext } from "../../contexts/LeadContext";
import { useState } from "react";
import { MdDelete, MdPlayArrow } from "react-icons/md";

const RightSidebar = ({ flowStarted }) => {

    const {
        scheduleFlow,
        flowData,
        updateFlow,
        deleteFlow
    } = useFlowContext();

    const { savedLeadLists } = useLeadContext();

    const hasSequence = flowData.nodes.length > 2 && flowData.edges.length > 1;

    if (!flowStarted) {
        return (
            <div className="flex flex-col gap-1">
                <Header />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between">
                <Header />
                <div className="flex gap-2 items-center">
                    <button
                        disabled={!hasSequence}
                        className='h-8 p-2 rounded-md flex items-center gap-1 justify-center bg-green-400 text-green-800'
                        onClick={scheduleFlow}>
                        <MdPlayArrow size={22} />
                        <p className="text-xs">Schedule</p>
                    </button>
                    <button
                        disabled={!hasSequence}
                        className='h-8 p-2 rounded-md flex items-center gap-1 justify-center bg-red-400 text-red-800'
                        onClick={deleteFlow}>
                        <MdDelete size={16} />
                        <p className="text-xs">Delete</p>
                    </button>
                </div>
            </div>
            {hasSequence &&
                <div className="mt-3">
                    <form onSubmit={() => { }}>
                        <label className=" text-neutral-200" htmlFor="flow-name">
                            <strong>Name</strong>
                        </label>
                        <input
                            name="flow-name"
                            className="input-field text-black my-2"
                            value={flowData.name}
                            onChange={(e) => updateFlow("name",e.target.value)}
                            type="text" />
                    </form>
                    <div className="mt-3 text-base text-neutral-200">
                        <p><strong>Summary</strong></p>
                        <p>{flowData.nodes.length} nodes, {flowData.edges.length} edges</p>
                        <p>{savedLeadLists.length} {savedLeadLists.length > 1 ? "leads" : "lead"} selected</p>
                    </div>
                </div>}
        </div>
    )
}


const Header = () => {
    const [expandProfile, setExpandProfile] = useState(false);
    return (
        <div className="flex justify-between">
            <div
                onMouseEnter={() => setExpandProfile(true)}
                onMouseLeave={() => setExpandProfile(false)}
                className="flex gap-1 items-center cursor-pointer relative">
                <img className="h-8 md:w-8 rounded-full" src="https://images.unsplash.com/photo-1556983990-db5d0cc3c67e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGR1bW15fGVufDB8fDB8fHww" alt="profile" />
                <span className="transition-all duration-1000">{expandProfile ? <FaAngleUp className="text-neutral-200" /> : <FaAngleDown className="text-neutral-200" />}</span>
                {expandProfile && <div className=" w-[150px] h-[100px] absolute -left-[50px] top-[30px] bg-neutral-800 border  border-neutral-600 rounded-md">
                </div>}
            </div>
        </div>
    )
}

export default RightSidebar;