import useEssays from "@/hooks/useEssays";
import EssayModal from "./EssayModal";
import { useState } from "react";
import Spinner from "../common/Spinner";
import EssayCard from "./EssayCard";
import { IEssayModalInitialValues } from "@/interfaces/interfaces";

const ManageEssays = () => {
  const {
    essays,
    createEssay,
    updateEssay,
    deleteEssay,
    isLoading,
    isModalLoading,
  } = useEssays();
  const [isOpen, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<
    IEssayModalInitialValues | undefined
  >(undefined);

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setInitialValues(undefined);
    setOpen(false);
  };
  const openModalForEdit = (initialValues: IEssayModalInitialValues) => {
    setInitialValues(initialValues);
    openModal();
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <button onClick={openModal}>New Essay</button>
      <EssayModal
        isOpen={isOpen}
        closeModal={closeModal}
        createEssay={createEssay}
        updateEssay={updateEssay}
        isModalLoading={isModalLoading}
        initialValues={initialValues}
      />
      {essays.length > 0 &&
        essays.map((essay) => (
          <EssayCard
            key={essay._id}
            essay={essay}
            deleteHandler={deleteEssay}
            updateHandler={openModalForEdit}
          />
        ))}
    </>
  );
};

export default ManageEssays;
