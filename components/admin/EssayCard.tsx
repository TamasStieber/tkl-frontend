import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import styles from "@/styles/Admin.module.css";
import { useState } from "react";
import DeleteEssayModal from "./DeleteEssayModal";
import CardOptionButton from "./CardOptionButton";
import DeleteModal from "./DeleteModal";
import { Essay, IEssayModalInitialValues } from "@/interfaces/interfaces";

interface EssayCardProps {
  essay: Essay;
  deleteHandler: (id: string) => void;
  updateHandler: (initialValues: IEssayModalInitialValues) => void;
}

const EssayCard = ({ essay, deleteHandler, updateHandler }: EssayCardProps) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const openUpdateModal = () => {
    const initialValues = {
      id: essay._id,
      title: essay.title,
      description: essay.description,
      essay: essay.url,
    };
    updateHandler(initialValues);
  };

  const date = new Date(essay.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div key={essay._id} className={styles.essay_card}>
        <div className={styles.essay_card_head}>
          <div className={styles.essay_card_title}>
            <h2>{essay.title}</h2>
            <p>{`${formattedDate} • Views: ${essay.openCount}`}</p>
          </div>
          <div className={styles.essay_card_options}>
            <CardOptionButton
              icon={AiOutlineEdit}
              hoverColor="blue"
              onClick={openUpdateModal}
            />
            <CardOptionButton
              icon={AiOutlineDelete}
              hoverColor="red"
              onClick={openDeleteModal}
            />
          </div>
        </div>
        <div className={styles.essay_card_body}>
          <p>{essay.description}</p>
          <a
            href={process.env.BACKEND_URL + "/essays/" + essay.url}
            target="_blank"
          >
            {essay.url}
          </a>
        </div>
      </div>

      <DeleteModal
        titleToDelete={essay.title}
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        deleteHandler={() => deleteHandler(essay._id)}
      />
    </>
  );
};

export default EssayCard;
