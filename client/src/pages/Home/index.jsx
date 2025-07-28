import { useState } from "react";
import Flow from "../../components/Flow";
import RightSidebar from "../../components/RightSidebar";
import { useFlowContext } from "../../contexts/FlowContext";

const Home = ({ setIsLoggedIn }) => {
    const {flowStarted, setFlowStarted} = useFlowContext();
    return (
        <>
            <div className="min-h-screen grid grid-cols-12">
                {/* Left Sidebar */}
                <div className="col-span-2 bg-gray-800 text-white p-4">
                    <h2 className="text-xl font-bold text-center">Email Sequence Tool</h2>
                    <ul className="p-2 m-1 flex flex-col gap-3">
                        {!flowStarted && <ListItem text={"Create Flow"} onClick={() => { setFlowStarted(true) }} />}
                        <ListItem text={"Settings"} onClick={() => { }} />
                        <ListItem text={"Logout"} onClick={() => {
                            localStorage.removeItem('email-seq-user');
                            setIsLoggedIn(false);
                        }} />
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
                   <RightSidebar flowStarted={flowStarted}/>
                </div>
            </div>
            {/* <Footer/> */}
        </>
    )
}


const ListItem = ({ text, onClick }) => {
    return (
        <li className="px-1 py-2 text-md text-white rounded-md text-center bg-cyan-800 hover:opacity-65 cursor-pointer"
            onClick={onClick}>
            {text || "ListItem"}
        </li>
    )
}
export default Home;