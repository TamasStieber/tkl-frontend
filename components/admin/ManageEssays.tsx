import useEssays from '@/hooks/useEssays';
import EssayCard from './EssayCard';
import EssayModal from './EssayModal';
import { useState } from 'react';

const ManageEssays = () => {
  const { essays, createEssay, deleteEssay } = useEssays();
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
      />
      {essays.length > 0 &&
        essays.map((essay) => (
          <EssayCard
            key={essay._id}
            essay={essay}
            deleteHandler={deleteEssay}
          />
        ))}
    </>
  );
};

export default ManageEssays;
