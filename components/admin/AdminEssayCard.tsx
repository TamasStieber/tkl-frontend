import { AdminEssayCardProps } from '@/interfaces/props';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import styles from '@/styles/Admin.module.css';
import AdminEssayCardOptionButton from './AdminEssayCardOptionButton';
import { useState } from 'react';
import DeleteEssayModal from './DeleteEssayModal';

const EssayCard = ({ essay, deleteHandler }: AdminEssayCardProps) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const date = new Date(essay.createdAt);
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
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
            <AdminEssayCardOptionButton
              icon={AiOutlineDelete}
              hoverColor='red'
              onClick={openDeleteModal}
            />
          </div>
        </div>
        <div className={styles.essay_card_body}>
          <p>{essay.description}</p>
          <a
            href={process.env.BACKEND_URL + '/essays/' + essay.url}
            target='_blank'
          >
            {essay.url}
          </a>
        </div>
      </div>

      <DeleteEssayModal
        essay={essay}
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        deleteHandler={deleteHandler}
      />
    </>
  );
};

export default EssayCard;
