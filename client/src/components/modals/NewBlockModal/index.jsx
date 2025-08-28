import { useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { MdAutoAwesome } from 'react-icons/md';
import { FaWindowClose } from "react-icons/fa";
import Modal from 'react-modal';
import constants from "../../../constants";
import { extractVariablesMap } from "../../../utils";
import toast from "react-hot-toast";
import { useBlockContext } from "../../../contexts/BlockContext";
import { nanoid } from "nanoid";
import { useAuthContext } from "../../../contexts/AuthContext";

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
        resetBlock
    } = useBlockContext();

    const [customTemplate, setCustomTemplate] = useState(false);

    const { userObj } = useAuthContext();

    const createNewTemplate = () => {
        setCustomTemplate(true);
        const newTemplate = {
            id: nanoid(),
            title: "New Template",
            subject: "",
            body: "",
            emailType: "custom",
            variables: {},
            aiGenerated: false
        };

        setEmailBlock({
            ...newTemplate
        });
    }

    const handleNodeCreate = (nodeType) => {
        switch (nodeType) {
            case 'email':
                // valid variables
                const isValidVariables = Object.values(emailBlock?.variables).every(v => v.length > 0);
                if (!isValidVariables) {
                    toast.error("Variable values are empty.\n Please enter values for variables.");
                    return;
                }
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
                if (!waitBlock.delay) {
                    toast.error("Select wait delay value");
                    return;
                }
                if (!waitBlock.format) {
                    toast.error("Select wait format");
                    return;
                }
                const waitObj = {
                    label: `${waitBlock?.delay} ${waitBlock.format}`,
                    delay: waitBlock?.delay,
                    format: waitBlock?.format
                }
                addNewNode("wait", waitObj);
                break;
            default:
                toast.error("Could not create block");
                return;
        }
        closeBlockModal();
        resetBlock();
    }

    const handleVariableChange = (value, key) => {
        // console.log(value,key);
        setEmailBlock(prev => ({ ...prev, variables: { ...prev.variables, [key]: value } }));
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
                        height: '400px',
                        width: '650px',
                        background: '#2e2e2e',
                        borderRadius: '1rem'
                    }
                }}>
                <div className="h-full w-full flex flex-col">
                    {/* header of modal */}
                    <div className='p-2 flex justify-between items-center sticky top-0 z-10 text-white'>
                        <div>
                            <h1 className='text-xl font-semibold'>Add new block</h1>
                            <p className='text-sm my-2'>Click on a block to configure and add it in a sequence</p>
                            <p className="text-sm text-amber-300">Your plan allows maximum {userObj.quota.nodes} blocks</p>
                        </div>
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
                        <h1 className='text-base my-2 font-semibold text-neutral-100'>Outreach</h1>
                        {
                            blockOptSelected ?
                                <>
                                    {nodeType === "email" ?
                                        <div className="flex justify-between mb-4 items-center text-white">
                                            <p className='text-sm'>
                                                {customTemplate ? "Create your own email template" : "Select an email template from the list"}
                                            </p>
                                            <p className="text-blue-200 text-sm cursor-pointer"
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
                                        <div className="flex justify-between mb-4 items-center text-white">
                                            <p className='text-sm'>
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
                                                    {customTemplate && <button className="flex items-center gap-2  text-amber-200">
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
                                                    {customTemplate && <button className="flex items-center gap-2  text-amber-200">
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
                                                                <div className="grid grid-cols-2 gap-2 my-2">
                                                                    <input
                                                                        disabled={true}
                                                                        className="input-field"
                                                                        value={key}
                                                                        type="text" />
                                                                    <input
                                                                        className="input-field"
                                                                        value={value}
                                                                        onChange={(e) => handleVariableChange(e.target.value, key)}
                                                                        type="text" />
                                                                </div>
                                                            </>)
                                                            : null
                                                    }
                                                </div>
                                                <button
                                                    className="h-fit w-24 px-2 py-3 m-2 bg-brand text-white rounded-md"
                                                    onClick={() => handleNodeCreate("email")}>
                                                    <p className="text-sm">Save</p>
                                                </button>
                                            </div>
                                            :
                                            // Wait/Delay 
                                            <div className='flex flex-col justify-evenly items-center flex-wrap gap-2 '>
                                                <input
                                                    className="w-full pl-3 py-2 "
                                                    placeholder="Enter digit between 0-9 "
                                                    value={waitBlock.delay}
                                                    type="text"
                                                    onChange={(e) => {
                                                        const input = e.target.value;
                                                        const numeric = input.replace(/[^0-9]/g, "");
                                                        // console.log(numeric);
                                                        setWaitBlock(prev => ({ ...prev, delay: numeric.toString() }));
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
                                                    className="h-fit w-24 px-2 py-3 m-2 bg-brand text-white rounded-md"
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
                                                <p className="text-sm text-black font-semibold">Outreach or Cold Email</p>
                                                <p className="text-sm">Send an outreach or a email</p>
                                            </div>
                                        </div>

                                        <div className="w-[260px] h-[90px]  py-2 px-2 bg-white rounded-md flex justify-center items-center gap-2 cursor-pointer"
                                            onClick={() => handleBlockClick("wait")}>
                                            <div className="w-1/3 h-16 bg-lime-200 p-1 grid place-items-center  rounded-md">
                                                <BsClock className=" text-lime-500 text-xl font-semibold" />
                                            </div>
                                            <div className="w-2/3">
                                                <p className="text-sm text-black font-semibold">Wait or Delay</p>
                                                <p className="text-sm">Add a delay between blocks</p>
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