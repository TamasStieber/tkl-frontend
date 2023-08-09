import { DeleteEssayModalProps } from '@/interfaces/props';
import styles from '@/styles/Admin.module.css';
import Modal from 'react-modal';

const DeleteEssayModal = ({
  essay,
  isOpen,
  closeModal,
  deleteHandler,
}: DeleteEssayModalProps) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'
    >
      <div className={styles.delete_modal}>
        <div className={styles.delete_modal_title}>
          <h2>Warning!</h2>
        </div>
        <div className={styles.delete_modal_body}>
          <p>Are you sure you want to delete &quot;{essay.title}&quot;?</p>
        </div>
        <div className={styles.modal_buttons}>
          <button
            className={styles.delete_button}
            onClick={() => {
              deleteHandler(essay._id);
              closeModal();
            }}
          >
            Delete
          </button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteEssayModal;
