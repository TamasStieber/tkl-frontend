import useEssays from "@/hooks/useEssays";
import EssayModal from "./EssayModal";
import { useState } from "react";
import Spinner from "../common/Spinner";
import EssayCard from "./EssayCard";

const ManageEssays = () => {
  const { essays, createEssay, deleteEssay, isLoading, isCreating } =
    useEssays();
  const [isOpen, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  if (isLoading) return <Spinner />;

  return (
    <>
      <button onClick={openModal}>New Essay</button>
      <EssayModal
        isOpen={isOpen}
        closeModal={closeModal}
        createEssay={createEssay}
        isCreating={isCreating}
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
