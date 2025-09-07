import { FaWindowClose } from "react-icons/fa";
import Modal from "react-modal";
Modal.setAppElement("#root");

const ViewLeadsModal = ({ leadsArr, viewLeadsModal, closeViewLeadsModal, actions = false }) => {
    return (
        <Modal
            isOpen={viewLeadsModal}
            onRequestClose={closeViewLeadsModal}
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    transform: 'translate(-50%, -50%)',
                    height: '460px',
                    width: '600px',
                    background: '#2e2e2e',
                    borderRadius: '1rem'
                }
            }}>
            <div className="h-full w-full">
                <div className='p-2 flex justify-between items-center relative'>
                    <div>
                        <h1 className='text-xl font-semibold text-white'>View Leads</h1>
                    </div>
                    <FaWindowClose
                        className='text-red-500 text-xl absolute top-2 right-0'
                        onClick={closeViewLeadsModal} />
                </div>
                <table className="min-w-full text-sm  rounded-md text-white">
                    <thead className="text-left border-b border-neutral-600">
                        <tr>
                            <th className="px-4 py-2 font-semibold">Name</th>
                            <th className="px-4 py-2 font-semibold">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leadsArr?.length > 0 ? (
                            leadsArr.map((lead, index) => (
                                <tr key={index} className="border-b text-left border-neutral-600">
                                    <td className="px-4 py-2">{lead?.name || "—"}</td>
                                    <td className="px-4 py-2">{lead?.email || "—"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="px-4 py-2 text-white text-center">
                                    No leads found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Modal>
    )
}

export default ViewLeadsModal