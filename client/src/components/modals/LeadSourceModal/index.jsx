import { CiMail } from "react-icons/ci";
import { FaWindowClose } from "react-icons/fa";
import { MdOutlineTask } from "react-icons/md";
import Modal from 'react-modal';
Modal.setAppElement('#root');

const LeadSourceModal = ({ leadModalOpen, closeLeadModal, updateLeadSource  }) => {
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
                        width: '500px', // Optional: Set width as well
                        background: '#ececec'
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
                    <h1 className='m-1 p-1 text-base font-semibold text-gray-800'>Select lead source available</h1>
                    <div className='flex justify-evenly items-center flex-wrap gap-2 '>
                       <button 
                       className="w-24 p-2 m-2 border border-black"
                       onClick={()=> updateLeadSource({label: new Date().toDateString()})}>
                        <p className="text-sm">Click</p>
                       </button>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default LeadSourceModal;