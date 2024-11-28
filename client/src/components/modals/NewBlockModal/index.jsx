import { useState } from "react";
import { BsClock } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaWindowClose } from "react-icons/fa";
import Modal from 'react-modal';
import templates from '../../../data/templates.json';
import constants from "../../../constants";
import { convertToSeconds } from "../../../utils";

Modal.setAppElement('#root');

const NewBlockModal = ({ blockModalOpen, closeBlockModal, addNewNode }) => {

    const emailTemplates = templates?.emailTemplates;
    const [blockOptSelected, setBlockOpt] = useState(false);
    const [nodeType, setNodeType] = useState("");
    const [emailVal, setEmailVal] = useState({
        title: emailTemplates[0].title,
        subject: emailTemplates[0].subject,
        body: emailTemplates[0].body
    });
    const [waitVal, setWaitVal] = useState("");
    const [waitType, setWaitType] = useState("Minutes");

 

    // addNewNode('email',{label:})

    const handleBlockClick = (nodeType)=>{
        setNodeType(nodeType);
        setBlockOpt(true);
    }

    const handleNodeCreate = (nodeType)=>{
        console.log(emailVal,waitVal,waitType,nodeType);
        switch(nodeType){
            case 'email':
                const emailObj = {
                    label: `${new Date().toDateString()}`,
                    subject: emailVal.subject,
                    body: emailVal.body,
                }
                addNewNode("email", emailObj);
                closeBlockModal();
                break;
            case 'wait':
                const waitObj={
                    label: `${waitVal} ${waitType}`,
                    delay: convertToSeconds(waitVal,waitType),
                }
                addNewNode("wait",waitObj);
                closeBlockModal();
                break;
            default:
                alert("Could not create block");
                return;
        }
    }
    return (
        <>
            <Modal
                isOpen={blockModalOpen}
                onRequestClose={closeBlockModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        height: '400px', // Set your desired height here
                        width: '600px', // Optional: Set width as well
                        background: '#F1F1F1'
                    }
                }}>
                <div className="h-full w-full">
                    <div className='p-2 flex justify-between items-center '>
                        <div>
                            <h1 className='text-xl font-semibold text-gray-800'>Add new block</h1>
                            <p className='text-sm text-gray-500'>Click on a block to configure and add it in a sequence</p></div>
                        <FaWindowClose
                            className='text-red-500'
                            onClick={closeBlockModal} />
                    </div>
                    <h1 className='m-1 p-1 text-base font-semibold text-gray-800'>Outreach</h1>
                    {
                        blockOptSelected ?
                            <>
                             <p className='text-sm p-1 m-1 text-gray-600'>Select an email template from the list</p>
                                {
                                    // Cold email
                                    nodeType === "email" ?
                                        <div className='flex flex-col justify-evenly items-center flex-wrap gap-2 '>
                                            <select
                                                className="w-full bg-white m-1 p-2 rounded-md"
                                                name="email-node-select"
                                                id="email-node-select"
                                                onChange={(e) => setEmailVal(e.target.value)}>
                                                {
                                                    emailTemplates?.map((item, index) => (
                                                        <option
                                                            className=""
                                                            key={index}
                                                            value={item}>{item.title}</option>
                                                    ))}
                                            </select>
                                            <button
                                                className="h-fit w-24 px-2 py-3 m-2 bg-blue-400 text-white rounded-md"
                                                onClick={()=> handleNodeCreate("email")}>
                                                <p className="text-sm">Save</p>
                                            </button>
                                        </div>
                                        :
                                        // Wait/Delay 
                                        <div className='flex flex-col justify-evenly items-center flex-wrap gap-2 '>
                                            <input
                                            className="w-full pl-3 py-2 text-gray-600"
                                            placeholder="Enter digit between 0-9 "
                                            value={waitVal}
                                            type="text"
                                            onChange={(e)=> {
                                                const input = e.target.value;
                                                const numeric = input.replace(/[^0-9]/g, "");
                                                setWaitVal(numeric);
                                            }}
                                            required />
                                        <select
                                            className="w-full bg-white m-1 p-2 rounded-md"
                                            name="lead-select"
                                            id="lead-select"
                                            onChange={(e) => setWaitType(e.target.value)}
                                            required>
                                            {
                                                Object.keys(constants?.WaitTypes)?.map((item, index) => (
                                                    <option
                                                        className=""
                                                        key={index}
                                                        value={item}>{item}</option>
                                                ))}
                                        </select>
                                        <button
                                            className="h-fit w-24 px-2 py-3 m-2 bg-blue-400 text-white rounded-md"
                                            onClick={()=> handleNodeCreate("wait")}>
                                            <p className="text-sm">Save</p>
                                        </button>
                                    </div>
                              }
                            </>
                            :
                            <>
                                <div className="w-full h-2/3 py-1 flex justify-evenly items-start flex-wrap gap-1">

                                    <div className="w-[260px] h-[90px] py-2 px-2 bg-white rounded-md flex justify-center items-center gap-2 cursor-pointer"
                                        onClick={() => handleBlockClick("email")}>
                                        <div className="w-1/3 h-16 bg-purple-200 p-1 grid place-items-center rounded-md">
                                            <CiMail className=" text-purple-800 text-xl font-semibold" />
                                        </div>
                                        <div className="w-2/3">
                                            <p className="text-sm text-black font-semibold">Cold Email</p>
                                            <p className="text-sm text-gray-500">Send a cold email</p>
                                        </div>
                                    </div>

                                    <div className="w-[260px] h-[90px]  py-2 px-2 bg-white rounded-md flex justify-center items-center gap-2 cursor-pointer"
                                        onClick={() => handleBlockClick("wait")}>
                                        <div className="w-1/3 h-16 bg-lime-200 p-1 grid place-items-center  rounded-md">
                                            <BsClock className=" text-lime-500 text-xl font-semibold" />
                                        </div>
                                        <div className="w-2/3">
                                            <p className="text-sm text-black font-semibold">Wait/Delay</p>
                                            <p className="text-sm text-gray-500">Add a delay between blocks</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                    {/*  */}

                </div>
            </Modal>

        </>
    )
}

export default NewBlockModal;