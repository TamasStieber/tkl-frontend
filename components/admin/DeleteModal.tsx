import { DeleteEssayModalProps } from "@/interfaces/props";
import styles from "@/styles/Admin.module.css";
import Modal from "react-modal";

export interface DeleteModalProps {
  titleToDelete: string;
  isOpen: boolean;
  closeModal: () => void;
  deleteHandler: () => void;
}

const DeleteModal = ({
  titleToDelete,
  isOpen,
  closeModal,
  deleteHandler,
}: DeleteModalProps) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Delete Modal"
    >
      <div className={styles.delete_modal}>
        <div className={styles.delete_modal_title}>
          <h2>Warning!</h2>
        </div>
        <div className={styles.delete_modal_body}>
          <p>Are you sure you want to delete &quot;{titleToDelete}&quot;?</p>
        </div>
        <div className={styles.modal_buttons}>
          <button
            className={styles.delete_button}
            onClick={() => {
              deleteHandler();
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

export default DeleteModal;
