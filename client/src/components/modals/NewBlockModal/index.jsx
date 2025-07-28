import { useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { MdAutoAwesome } from 'react-icons/md';
import { Fa500Px, FaWindowClose } from "react-icons/fa";
import Modal from 'react-modal';
import templates from '../../../data/templates.json';
import constants from "../../../constants";
import { convertToSeconds, extractVariablesMap } from "../../../utils";
import toast from "react-hot-toast";
import { useBlockContext } from "../../../contexts/BlockContext";
import { nanoid } from "nanoid";

Modal.setAppElement('#root');

const NewBlockModal = ({ blockModalOpen, closeBlockModal, addNewNode }) => {

    const {
        nodeType,
        setNodeType,
        emailBlock,
        setEmailBlock,
        waitBlock,
        setWaitBlock,
        blockOptSelected,
        setBlockOptSelected,
        handleBlockClick,
        emailTemplates,
    } = useBlockContext();

    const [customTemplate, setCustomTemplate] = useState(false);

    const createNewTemplate = () => {
        setCustomTemplate(true);
        const newTemplate = {
            id: nanoid(),
            title: "New Template",
            subject: "",
            body: "",
            type: "custom",
            variables: {}
        };

        setEmailBlock({
            title: newTemplate.title,
            subject: newTemplate.subject,
            body: newTemplate.body,
            type: newTemplate.type,
            variables: newTemplate.variables,
        });
    }

    const handleNodeCreate = (nodeType) => {
        switch (nodeType) {
            case 'email':
                const emailObj = {
                    label: `${new Date().toDateString()}`,
                    title: emailBlock.title,
                    subject: emailBlock.subject,
                    body: emailBlock.body,
                    type: emailBlock.type || "custom",
                    variables: emailBlock.variables,
                    aiGenerated: emailBlock.aiGenerated || false,
                }
                addNewNode("email", emailObj);
                break;
            case 'wait':
                if (!waitBlock.value) {
                    toast.error("Select wait value");
                    return;
                }
                if (!waitBlock.format) {
                    toast.error("Select wait format");
                    return;
                }
                const waitObj = {
                    label: `${waitBlock?.value} ${waitBlock.format}`,
                    delay: convertToSeconds(waitBlock?.value, waitBlock?.format),
                }
                addNewNode("wait", waitObj);

                break;
            default:
                toast.error("Could not create block");
                return;
        }
        closeBlockModal();
        setBlockOptSelected("");
        setNodeType("");
        setEmailBlock({
            title: emailTemplates[0].title,
            subject: emailTemplates[0].subject,
            body: emailTemplates[0].body
        });
        setWaitBlock({
            value: "",
            format: "Minutes"
        });
    }

    const handleVariableChange=(value,key)=>{
        // console.log(value,key);
        setEmailBlock(prev=>({...prev,variables:{...prev.variables,[key]:value}}));
    }

    useEffect(() => {
        const varsHandler = setTimeout(() => {
            const allVars = extractVariablesMap([emailBlock.subject, emailBlock.body]);
            setEmailBlock(pr => ({ ...pr, variables: allVars }));
        }, 300); // debounce 300ms
        return () => clearTimeout(varsHandler);

    }, [emailBlock.subject, emailBlock.body]);


    return (
        <>
            <Modal
                isOpen={blockModalOpen}
                onRequestClose={closeBlockModal}
                shouldCloseOnOverlayClick={false}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        height: '400px', // Set your desired height here
                        width: '650px', // Optional: Set width as well
                        background: '#F1F1F1'
                    }
                }}>
                <div className="h-full w-full flex flex-col">
                    {/* header of modal */}
                    <div className='p-2 flex justify-between items-center sticky top-0 z-10 bg-[#F1F1F1]'>
                        <div>
                            <h1 className='text-xl font-semibold text-gray-800'>Add new block</h1>
                            <p className='text-sm text-gray-500'>Click on a block to configure and add it in a sequence</p></div>
                        <FaWindowClose
                            className='text-red-500'
                            onClick={() => {
                                setBlockOptSelected(false);
                                setNodeType("");
                                closeBlockModal();
                                return;
                            }} />
                    </div>
                    {/* scrollable body */}
                    <div className="overflow-y-scroll overflow-x-hidden py-2 px-3">
                        <h1 className='text-base my-2 font-semibold text-gray-800'>Outreach</h1>
                        {
                            blockOptSelected ?
                                <>
                                    {nodeType === "email" ?
                                        <div className="flex justify-between mb-4 items-center">
                                            <p className='text-sm  text-gray-600'>
                                                {customTemplate ? "Create your own email template" : "Select an email template from the list"}
                                            </p>
                                            <p className="text-blue-600 text-sm cursor-pointer"
                                                onClick={() => {
                                                    if (customTemplate) {
                                                        setCustomTemplate(false);
                                                        setEmailBlock({
                                                            title: emailTemplates[0].title,
                                                            subject: emailTemplates[0].subject,
                                                            body: emailTemplates[0].body
                                                        });
                                                    } else {
                                                        createNewTemplate();
                                                    }
                                                }}>
                                                {customTemplate ? "Choose from list" : "Create New"}
                                            </p>
                                        </div> :
                                        <div className="flex justify-between mb-4 items-center">
                                            <p className='text-sm  text-gray-600'>
                                                Select a time interval
                                            </p>
                                        </div>
                                    }
                                    {
                                        // Cold email
                                        nodeType === "email" ?
                                            <div className='flex flex-col justify-evenly items-center flex-wrap gap-2'>
                                                {!customTemplate && (
                                                    <select
                                                        className="input-field"
                                                        name="email-node-select"
                                                        id="email-node-select"
                                                        onChange={(e) => {
                                                            const template = emailTemplates.find(temp => temp.id === e.target.value);
                                                            setEmailBlock({
                                                                title: template.title || "",
                                                                subject: template.subject || "",
                                                                body: template.body || "",
                                                                type: template.type || "",
                                                                variables: template.variables || ""
                                                            });
                                                        }}>
                                                        {
                                                            emailTemplates?.map((item, index) => (
                                                                <option
                                                                    className=""
                                                                    key={index}
                                                                    value={item.id}>
                                                                    {item.title}
                                                                </option>
                                                            ))}
                                                    </select>
                                                )}
                                                <label className="input-label" htmlFor="email-title">
                                                    Title
                                                </label>
                                                <input
                                                    name="email-title"
                                                    className="input-field"
                                                    value={emailBlock.title}
                                                    onChange={(e) => setEmailBlock(pr => ({ ...pr, title: e.target.value }))}
                                                    type="text" />

                                                <label className="input-label flex justify-between" htmlFor="email-subject">
                                                    Subject
                                                    {customTemplate && <button className="flex items-center gap-2 text-blue-600">
                                                        <MdAutoAwesome className="text-lg" />
                                                        Enhance with AI
                                                    </button>}
                                                </label>
                                                <input
                                                    name="email-subject"
                                                    className="input-field"
                                                    value={emailBlock.subject}
                                                    onChange={(e) => setEmailBlock(pr => ({ ...pr, subject: e.target.value }))}
                                                    type="text" />

                                                <label className="input-label flex justify-between" htmlFor="email-body">
                                                    Body
                                                    {customTemplate && <button className="flex items-center gap-2 text-blue-600">
                                                        <MdAutoAwesome className="text-lg" />
                                                        Enhance with AI
                                                    </button>}
                                                </label>
                                                <textarea
                                                    name="email-subject"
                                                    rows={5}
                                                    className="input-field  h-32 overflow-y-auto resize-none"
                                                    value={emailBlock.body}
                                                    onChange={(e) => setEmailBlock(pr => ({ ...pr, body: e.target.value }))}
                                                    type="text" />
                                                <label className="input-label" htmlFor="variables">Variables</label>
                                                <div className="w-full">
                                                    {
                                                        emailBlock?.variables ?
                                                            Object.entries(emailBlock.variables).map(([key, value]) => <>
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <input
                                                                        disabled={true}
                                                                        className="input-field text-gray-500"
                                                                        value={key}
                                                                        type="text" />
                                                                    <input
                                                                        className="input-field"
                                                                        value={value}
                                                                        onChange={(e)=>handleVariableChange(e.target.value, key)}
                                                                        type="text" />
                                                                </div>
                                                            </>)
                                                            : null
                                                    }
                                                </div>
                                                <button
                                                    className="h-fit w-24 px-2 py-3 m-2 bg-blue-400 text-white rounded-md"
                                                    onClick={() => handleNodeCreate("email")}>
                                                    <p className="text-sm">Save</p>
                                                </button>
                                            </div>
                                            :
                                            // Wait/Delay 
                                            <div className='flex flex-col justify-evenly items-center flex-wrap gap-2 '>
                                                <input
                                                    className="w-full pl-3 py-2 text-gray-600"
                                                    placeholder="Enter digit between 0-9 "
                                                    value={waitBlock.value}
                                                    type="text"
                                                    onChange={(e) => {
                                                        const input = e.target.value;
                                                        const numeric = input.replace(/[^0-9]/g, "");
                                                        setWaitBlock(prev => ({ ...prev, value: numeric }));
                                                    }}
                                                    required />
                                                <select
                                                    className="w-full bg-white m-1 p-2 rounded-md"
                                                    name="email-wait-select"
                                                    id="email-wait-select"
                                                    onChange={(e) => setWaitBlock(prev => ({ ...prev, format: e.target.value }))}
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
                                                    onClick={() => handleNodeCreate("wait")}>
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
                    </div>
                    {/*  */}

                </div>
            </Modal>

        </>
    )
}

export default NewBlockModal;