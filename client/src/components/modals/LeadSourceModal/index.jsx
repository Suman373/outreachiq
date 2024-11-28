import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Modal from 'react-modal';
import { BsFillLightningChargeFill, BsPersonPlusFill } from "react-icons/bs";
Modal.setAppElement('#root');

const LeadSourceModal = ({ leadModalOpen, closeLeadModal, updateLeadSource }) => {

    const [leadVal, setLeadVal] = useState("Test List 1");
    const [srcOptSelected, setSrcOptSelected] = useState(false);
    const srcLeadList = ["Test list","Test 2","Sample List"];
    


    const handleCardClick = (type)=>{
        switch(type){
            case 'lead-list':
                setSrcOptSelected(true);
                break;
            default:
                return;
        }
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
                        height: '400px', // Set your desired height here
                        width: '600px', // Optional: Set width as well
                        background: '#F1F1F1'
                    }
                }}>
                <div className="h-full w-full">
                    <div className='p-2 flex justify-between items-center '>
                        <div>
                            <h1 className='text-xl font-semibold text-gray-800'>Add lead source</h1>
                            <p className='text-sm text-gray-500'>Click on a source</p></div>
                        <FaWindowClose
                            className='text-red-500'
                            onClick={closeLeadModal} />
                    </div>
                    <h1 className='m-1 p-1 text-base font-semibold text-gray-800'>Sources</h1>
                    {
                        srcOptSelected ?
                            <>
                                <div className='flex flex-col justify-evenly items-center flex-wrap gap-2 '>
                                    <select 
                                    className="w-full bg-white m-1 p-2 rounded-md"
                                    name="lead-select" 
                                    id="lead-select"
                                    onChange={(e)=> setLeadVal(e.target.value)}>
                                       {
                                        srcLeadList?.map((item,index)=>( 
                                        <option 
                                        className=""
                                        key={index}
                                        value={item}>{item}</option>
                                    ))}
                                    </select>
                                    <button
                                        className="h-fit w-24 px-2 py-3 m-2 bg-blue-400 text-white rounded-md"
                                        onClick={() => updateLeadSource({ label: new Date().toDateString(), title: leadVal })}>
                                        <p className="text-sm">Save</p>
                                    </button>
                                </div>
                            </>
                            :
                            <>
                                {/* source cards */}
                                <div className="w-full h-2/3 py-1 flex justify-evenly items-start flex-wrap gap-1">

                                    <div className="w-[260px] h-[90px] py-2 px-2 bg-white rounded-md flex justify-center items-center gap-2 cursor-pointer"
                                    onClick={()=> handleCardClick("lead-list")}>
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