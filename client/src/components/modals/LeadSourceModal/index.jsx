import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Modal from 'react-modal';
import { BsFillLightningChargeFill, BsPersonPlusFill } from "react-icons/bs";
import { useLeadContext } from "../../../contexts/LeadContext.jsx";
Modal.setAppElement('#root');
import Papa, { parse } from 'papaparse';
import { nanoid } from 'nanoid';

const LeadSourceModal = ({ leadModalOpen, closeLeadModal, updateLeadSource }) => {

    const [srcOptSelected, setSrcOptSelected] = useState(false);
    const {
        savedLeadLists,
        setSavedLeadLists,
        selectedLeadTitle,
        setSelectedLeadTitle,
    } = useLeadContext();

    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [parsedLeads, setParsedLeads] = useState(savedLeadLists[0].leads);
    const [activeId, setActiveId] = useState("sample-leads");

    const handleCardClick = (type) => {
        switch (type) {
            case 'lead-list':
                setSrcOptSelected(true);
                break;
            default:
                return;
        }
    }

    const handleFileUpload = (file) => {
        setError("");
        // const file =  new File([uploadedFile], uploadedFile.name);

        if (!file || !file.name.endsWith(".csv")) {
            setError("Please upload a valid csv file");
            return;
        }

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const parsedData = results.data;

                const leads = parsedData.map((row) => ({
                    name: row.name?.trim(),
                    email: row.email?.trim()
                }))
                    .filter((lead) => lead.name && lead.email);

                if (leads.length === 0) {
                    setError("No valid leads found");
                    return;
                }
                setActiveId(null);
                setParsedLeads(leads);
                setSelectedLeadTitle(file.name.replace(".csv", ""));
                console.log(leads);
            },
            error: function (err) {
                setError("Failed to parse file" + err.message);
            }
        })
    }

    const handleSave = () => {
        const trimmedTitle = selectedLeadTitle.trim();
        if (!trimmedTitle) {
            setError("Lead title is required.");
            return;
        }
        if (trimmedTitle.toLowerCase() === "sample leads" || activeId === "sample-leads") {
            setError("Sample Leads cannot be saved. Please upload your own lead file.");
            return;
        }
        if (activeId) {
            // existing lead
            setSavedLeadLists(prev => prev.map((itm) => itm.id === activeId ? { ...itm, title: trimmedTitle, leads: parsedLeads } : itm));
        } else {
            // new lead
            const newLead = {
                id: nanoid(),
                title: trimmedTitle,
                leads: parsedLeads
            };
            setSavedLeadLists(prev => [...prev, newLead]);
        }
        updateLeadSource({ label: new Date().toDateString(), title: trimmedTitle });
        setSelectedLeadTitle("");
        setParsedLeads([]);
        setActiveId(null);
        setFile(null);
        closeLeadModal();
    }

    return (
        <>
            <Modal
                isOpen={leadModalOpen}
                onRequestClose={closeLeadModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        height: '450px', // Set your desired height here
                        width: '600px', // Optional: Set width as well
                        background: '#F1F1F1'
                    }
                }}>
                <div className="h-full w-full">
                    <div className='p-2 flex justify-between items-center relative'>
                        <div>
                            <h1 className='text-xl font-semibold text-gray-800'>Add lead source</h1>
                            <p className='text-sm text-gray-500'>Click on a source</p></div>
                        <FaWindowClose
                            className='text-red-500 text-xl absolute top-2 right-0'
                            onClick={closeLeadModal} />
                    </div>
                    <h1 className='m-1 p-1 text-base font-semibold text-gray-800'>Sources ({savedLeadLists.length} available)</h1>
                    {
                        srcOptSelected ?
                            <>
                                <div className='flex flex-col justify-evenly items-center flex-wrap gap-2 '>
                                    <select
                                        className="w-full bg-white m-1 p-2 rounded-md"
                                        name="lead-select"
                                        id="lead-select"
                                        onChange={(e) => {
                                            const selectedLead = savedLeadLists.find(itm => itm.id == e.target.value);
                                            setSelectedLeadTitle(selectedLead.title);
                                            setParsedLeads(selectedLead.leads);
                                            setActiveId(selectedLead.id);
                                        }}>
                                        {
                                            savedLeadLists?.map((item) => (
                                                <option
                                                    className=""
                                                    key={item.id}
                                                    value={item.id}>{item.title}</option>
                                            ))}
                                    </select>
                                    <div className="w-full flex flex-col gap-3">
                                        {activeId !== "sample-leads" &&
                                            <>
                                                <label htmlFor="">Lead Title</label>
                                                <input
                                                    type="text"
                                                    placeholder="Give uploaded list a title"
                                                    className="w-full p-2 rounded-md bg-white"
                                                    value={selectedLeadTitle}
                                                    onChange={(e) => setSelectedLeadTitle(e.target.value)}
                                                />
                                            </>
                                        }
                                        <p className="text-md text-gray-600">{selectedLeadTitle} ({parsedLeads.length} leads)</p>
                                        <input
                                            type="file"
                                            accept=".csv"
                                            onChange={(e) => {
                                                setFile(e.target.files[0]);
                                                handleFileUpload(e.target.files[0]);
                                                return;
                                            }}
                                            className="w-full bg-white p-2 rounded-md"
                                        />
                                        {error && <p className="text-red-500 text-sm">{error}</p>}
                                    </div>
                                    <button
                                        className="h-fit w-24 px-2 py-3 m-2 bg-blue-400 text-white rounded-md"
                                        onClick={() => handleSave()}>
                                        <p className="text-sm">Save</p>
                                    </button>
                                </div>
                            </>
                            :
                            <>
                                {/* source cards */}
                                <div className="w-full h-2/3 py-1 flex justify-evenly items-start flex-wrap gap-1">

                                    <div className="w-[260px] h-[90px] py-2 px-2 bg-white rounded-md flex justify-center items-center gap-2 cursor-pointer"
                                        onClick={() => handleCardClick("lead-list")}>
                                        <div className="w-1/3 h-16 bg-pink-200 p-1 grid place-items-center rounded-md">
                                            <BsPersonPlusFill className=" text-pink-500 text-xl font-semibold" />
                                        </div>
                                        <div className="w-2/3">
                                            <p className="text-sm text-black font-semibold">Lead(s) from list</p>
                                            <p className="text-sm text-gray-500">Select list as source for the sequence</p>
                                        </div>
                                    </div>

                                    <div className="w-[260px] h-[90px]  py-2 px-2 bg-white rounded-md flex justify-center items-center gap-2 cursor-pointer">
                                        <div className="w-1/3 h-16 bg-lime-200 p-1 grid place-items-center  rounded-md">
                                            <BsFillLightningChargeFill className=" text-lime-500 text-xl font-semibold" />
                                        </div>
                                        <div className="w-2/3">
                                            <p className="text-sm text-black font-semibold">Lead from CRM</p>
                                            <p className="text-sm text-gray-500">Use leads from your CRM</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </Modal>

        </>
    )
}

export default LeadSourceModal;