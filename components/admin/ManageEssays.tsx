import useEssays from '@/hooks/useEssays';
import AdminEssayCard from './AdminEssayCard';
import EssayModal from './EssayModal';
import { useState } from 'react';
import Spinner from '../Spinner';

const ManageEssays = () => {
  const { essays, createEssay, deleteEssay, isLoading, isCreating } =
    useEssays();
  const [isOpen, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <button onClick={openModal}>New Essay</button>
      <EssayModal
        isOpen={isOpen}
        closeModal={closeModal}
        createEssay={createEssay}
        isCreating={isCreating}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        essays.length > 0 &&
        essays.map((essay) => (
          <AdminEssayCard
            key={essay._id}
            essay={essay}
            deleteHandler={deleteEssay}
          />
        ))
      )}
    </>
  );
};

export default ManageEssays;
