import React from "react";
import Flow from "../../components/Flow";
import RightSidebar from "../../components/RightSidebar";
import { useAuthContext } from "../../contexts/AuthContext";
import { useFlowContext } from "../../contexts/FlowContext";
import { IoMdAdd, IoIosSettings } from "react-icons/io";
import { RxReset } from "react-icons/rx";
import { MdOutlineLogout } from "react-icons/md";
import toast from "react-hot-toast";

const Home = () => {
    const {
        flowStarted,
        setFlowStarted,
        resetFlow
    } = useFlowContext();
    const {
        userObj,
        logoutAndClearUser } = useAuthContext();

    const handleReset = () => {
        setFlowStarted(false);
        resetFlow();
    }

    const handleLogout = ()=> {
        logoutAndClearUser();
        resetFlow();
        toast.success("You have logged out successfully");
    }

    return (
        <>
            <div className="min-h-screen grid grid-cols-12">
                {/* Left Sidebar */}
                <div className="col-span-2 bg-gray-800 text-white p-4">
                    <h2 className="text-xl font-bold text-center">OutreachIQ</h2>
                    {Object.values(userObj)?.map((i, index) => <p key={index}>{typeof (i) !== 'object' && i}</p>)}
                    <ul className="m-1 flex flex-col gap-3">
                        {!flowStarted && <ListItem icon={<IoMdAdd />} text={"Create Flow"} onClick={() => { setFlowStarted(true) }} />}
                        {flowStarted && <ListItem icon={<RxReset />} text={"Reset flow"} onClick={handleReset} />}
                        <ListItem icon={<IoIosSettings />} text={"Settings"} onClick={() => { }} />
                        <ListItem icon={<MdOutlineLogout />} text={"Logout"} onClick={handleLogout} />
                    </ul>
                </div>

                {/* Right Flow Component */}
                <div className="col-span-8 p-4 h-100vh">
                    {
                        flowStarted ? <Flow />
                            :
                            <div className="min-h-screen grid place-content-center">
                                <p className="text-md px-4 py-2 m-1 rounded-lg text-amber-900 text-center bg-amber-200">
                                    Click on Create Flow to start a new flow
                                </p>
                            </div>
                    }
                </div>
                <div className="col-span-2 bg-neutral-800 p-4">
                    <RightSidebar flowStarted={flowStarted} />
                </div>
            </div>
            {/* <Footer/> */}
        </>
    )
}


const ListItem = ({ icon, text, onClick }) => {
    return (
        <li className="py-2 text-md text-white rounded-md inline-flex gap-2 items-center justify-start px-3 bg-cyan-800 hover:opacity-65 cursor-pointer"
            onClick={onClick}>
            {icon ? React.cloneElement(icon, { className: "text-md" }) : ""}
            {text || "ListItem"}
        </li>
    )
}
export default Home;