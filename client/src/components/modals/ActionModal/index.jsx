import Modal from 'react-modal';

Modal.setAppElement('#root');

const ActionModal = ({ isOpen, onRequestClose, title, description, yesAction, noAction }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          background: '#2e2e2e',
          borderRadius: '1rem',
          padding: '2rem',
          border: 'none',
        },
      }}
    >
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <p className="text-gray-300 mb-6">{description}</p>
      <div className="flex justify-end gap-4">
        <button
          onClick={noAction}
          className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-500 transition"
        >
          No
        </button>
        <button
          onClick={yesAction}
          className="px-4 py-2 rounded-md bg-brand text-white"
        >
          Yes
        </button>
      </div>
    </Modal>
  );
};

export default ActionModal;