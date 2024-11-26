import { CiMail } from "react-icons/ci";
import { FaWindowClose } from "react-icons/fa";
import { MdOutlineTask } from "react-icons/md";
import Modal from 'react-modal';
Modal.setAppElement('#root');

const NewBlockModal = ({ blockModalOpen, closeBlockModal, addNewNode }) => {
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
                        width: '500px', // Optional: Set width as well
                        background: '#ececec'
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
                    <div className='flex justify-evenly items-center flex-wrap gap-2 '>
                        {/* cold email */}
                        <div 
                        className="h-20 w-[200px] px-4 py-2 flex justify-evenly items-center gap-2 bg-white cursor-pointer"
                        onClick={()=>addNewNode('email',{label: new Date().toDateString() })}>
                            <div className="h-full w-[50%] rounded-md bg-purple-200 grid justify-center items-center">
                                <CiMail className='text-[42px] text-purple-500' />
                            </div>
                            <div>
                                <h2 className='text-sm font-bold text-gray-800'>Cold Email</h2>
                                <p className='text-sm text-gray-400'>Send a cold email</p>
                            </div>
                        </div>
                        {/* delay  */}
                        <div 
                        className="h-20 w-[200px] px-4 py-2 flex justify-evenly items-center gap-2 bg-white cursor-pointer"
                        onClick={()=>addNewNode('email',{label: new Date().toDateString() })}>
                            <div className="h-full w-[50%] rounded-md bg-purple-200 grid justify-center items-center">
                                <MdOutlineTask className='text-[42px] text-purple-500' />
                            </div>
                            <div>
                                <h2 className='text-sm font-bold text-gray-800'>Wait/Delay</h2>
                                <p className='text-sm text-gray-400'>Schedule task</p>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal>

        </>
    )
}

export default NewBlockModal;