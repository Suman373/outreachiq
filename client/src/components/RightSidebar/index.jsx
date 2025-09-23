import { FaAngleUp } from "react-icons/fa";
import { useFlowContext } from "../../contexts/FlowContext";
import { FaAngleDown } from "react-icons/fa";
import { useLeadContext } from "../../contexts/LeadContext";
import { useState } from "react";
import { MdDelete, MdPlayArrow } from "react-icons/md";
import TextBadge from "../shared/misc/TextBadge";
import { IoPerson } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { flowStatus } from "../../utils";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../../contexts/AuthContext";

const RightSidebar = () => {

    const navigate = useNavigate();

    const {
        scheduleFlow,
        flowData,
        updateFlow,
        deleteFlow,
        flowStarted
    } = useFlowContext();

    const { savedLeadLists } = useLeadContext();

    const hasSequence = flowData.nodes.length > 2 && flowData.edges.length > 1;

    const handleViewProfileClick = () => {
        navigate('profile');
    }

    // to be done later when offering pro subs
    const handleExportClick = () => {
       toast.error("Feature is not available right now");
    }


    if (!flowStarted) {
        return (
            <div className="flex flex-col gap-1">
                <Header
                    handleViewProfileClick={handleViewProfileClick}
                    handleExportClick={handleExportClick}
                />
            </div>
        )
    }


    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between">
                <Header
                    handleViewProfileClick={handleViewProfileClick}
                    handleExportClick={handleExportClick}
                />
                <div className="flex gap-2 items-center">
                    <TextBadge type={"info"} text={flowStatus[flowData.status || "draft"]} />
                    {flowData.scheduled === false ?
                        <button
                            disabled={!hasSequence}
                            className='h-8 p-2 rounded-md flex items-center gap-1 justify-center bg-green-700 text-white'
                            onClick={scheduleFlow}>
                            <MdPlayArrow size={22} />
                            <p className="text-xs">Schedule</p>
                        </button>
                        : null}
                    {
                        flowData.scheduled === true ?
                            <button
                                disabled={!hasSequence}
                                className='h-8 p-2 rounded-md flex items-center gap-1 justify-center bg-red-600 text-white'
                                onClick={deleteFlow}>
                                <MdDelete size={16} />
                                <p className="text-xs">Delete</p>
                            </button>
                            : null
                    }
                </div>
            </div>
            {hasSequence &&
                <div className="mt-3">
                    <label className=" text-neutral-200" htmlFor="flow-name">
                        <strong>Name</strong>
                    </label>
                    <input
                        name="flow-name"
                        className="input-field text-black my-2"
                        value={flowData.name}
                        onChange={(e) => updateFlow("name", e.target.value)}
                        type="text" />
                    <div className="mt-3 text-base text-neutral-200">
                        <p><strong>Sequence Summary</strong></p>
                        <p>{flowData.nodes.length} nodes, {flowData.edges.length} edges</p>
                        <p>{savedLeadLists.length} {savedLeadLists.length > 1 ? "leads" : "lead"} selected</p>
                    </div>
                </div>}
        </div>
    )
}


const Header = ({ handleExportClick, handleViewProfileClick }) => {
    const [expandProfile, setExpandProfile] = useState(false);
    const {userObj} = useAuthContext();
    return (
        <div className="flex justify-between">
            <div
                onMouseEnter={() => setExpandProfile(true)}
                onMouseLeave={() => setExpandProfile(false)}
                className="flex gap-1 items-center cursor-pointer relative">
                <img className="h-8 md:w-8 rounded-full" src={userObj.profileImage?.url || "https://images.unsplash.com/photo-1556983990-db5d0cc3c67e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGR1bW15fGVufDB8fDB8fHww"} alt="profile" />
                <span className="transition-all duration-1000">{expandProfile ? <FaAngleUp className="text-neutral-200" /> : <FaAngleDown className="text-neutral-200" />}</span>
                {expandProfile && <div className=" w-[200px] h-[100px] flex flex-col items-center justify-start gap-2 p-2 absolute -left-[150px] top-[30px] bg-neutral-800 border  border-neutral-600 rounded-md">
                    <button
                        onClick={handleViewProfileClick}
                        className="bg-brand/60 text-white rounded-md text-sm w-full py-2 flex items-center justify-start gap-2 px-2">
                        <IoPerson />  View Profile
                    </button>
                    <button
                        onClick={handleExportClick}
                        className="bg-brand/60 text-white items-center rounded-md text-sm w-full py-2 flex justify-start gap-2 px-2">
                        <PiExportBold />  Export Flow <TextBadge type={"paywall"} text={"Pro"} />
                    </button>
                </div>}
            </div>
        </div>
    )
}

export default RightSidebar;