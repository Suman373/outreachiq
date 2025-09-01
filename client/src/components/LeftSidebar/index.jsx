
import { IoMdAdd, IoIosSettings } from "react-icons/io";
import { RxReset } from "react-icons/rx";
import { FaBookmark } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { useAuthContext } from "../../contexts/AuthContext";
import { useFlowContext } from "../../contexts/FlowContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SiGoogleanalytics } from "react-icons/si";
import TextBadge from "../shared/misc/TextBadge";
import { LuLogs } from "react-icons/lu";


const LeftSidebar = () => {

    const navigate = useNavigate();
    const {
        flowStarted,
        setFlowStarted,
        resetFlow
    } = useFlowContext();
    const {
        userObj,
        logoutAndClearUser } = useAuthContext();

    const handleReset = () => {
        handleNavigate(''); // root of nested route -> Flow 
        setFlowStarted(false);
        resetFlow();
    }

    const handleCreate = () => {
        handleNavigate('');
        setFlowStarted(true);
    }

    const handleLogout = () => {
        logoutAndClearUser();
        resetFlow();
        toast.success("You have logged out successfully");
    }

    const handleNavigate = (dest) => {
        navigate(dest);
    }

    return (
        <>
            <div className="flex items-center justify-center gap-2 mb-5">
                <h2 className="text-xl font-bold text-center mb-1">OutreachIQ</h2>
                <TextBadge text={"Beta"} type={""} />
            </div>
            <p>{userObj.name} {userObj.id}</p>
            <ul className="m-1 flex flex-col gap-4">
                {!flowStarted && <ListItem icon={<IoMdAdd />} text={"Create Flow"} onClick={handleCreate} />}
                {flowStarted && <ListItem icon={<RxReset />} text={"Reset flow"} onClick={handleReset} />}
                <ListItem 
                icon={<FaBookmark />} 
                onClick={() => handleNavigate("saved-flows")} 
                text={"Saved Flows"} />
                <ListItem 
                icon={<SiGoogleanalytics />} 
                onClick={()=> handleNavigate("analytics")} paywall={false} 
                text={"Analytics"} />
                <ListItem 
                icon={<LuLogs />} 
                paywall={true} 
                text={"Logs"} />
                <ListItem 
                icon={<IoIosSettings />} 
                onClick={() => handleNavigate("settings")} 
                text={"Settings"} />
                <ListItem 
                icon={<MdOutlineLogout />} 
                text={"Logout"} 
                onClick={handleLogout} />
            </ul>
        </>
    )
}

const ListItem = ({ icon, text, onClick, paywall = false }) => {
    // use userobj to determine their plan and available features
    const eligible = !paywall; // also depends on paywall, if paywall false, user will be eligible for feature regardless of their plan
    return (
        <li
            className="py-2 relative text-md text-white rounded-md inline-flex gap-4 items-center justify-start px-3 bg-brand/60 hover:opacity-65 cursor-pointer"
            onClick={!eligible ? null : onClick}>
            {icon ? React.cloneElement(icon, { className: "text-base" }) : ""}
            {text || "ListItem"}
            {!eligible ? <TextBadge text={"Pro"} type={"paywall"} customStyle={{ position: 'absolute', right: "0.5rem", top: '0.5rem' }} /> : ""}
        </li>
    )
}

export default LeftSidebar;