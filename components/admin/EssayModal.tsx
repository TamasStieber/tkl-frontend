import styles from "@/styles/Admin.module.css";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import Spinner from "../common/Spinner";
import { IEssayModalInitialValues } from "@/interfaces/interfaces";

interface EssayModalProps {
  isOpen: boolean;
  closeModal: () => void;
  createEssay: (formData: FormData) => Promise<boolean>;
  updateEssay: (id: string, formData: FormData) => Promise<boolean>;
  isModalLoading: boolean;
  initialValues: IEssayModalInitialValues | undefined;
}

const EssayModal = ({
  isOpen,
  closeModal,
  createEssay,
  updateEssay,
  isModalLoading,
  initialValues,
}: EssayModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [titleInputError, setTitleInputError] = useState<string | null>(null);
  const [descriptionInputError, setDescriptionInputError] = useState<
    string | null
  >(null);
  const [fileInputError, setFileInputError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("No file selected");
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    if (initialValues && initialValues.essay) {
      setFileName(initialValues.essay);
    }
    if (initialValues && initialValues.description) {
      setCharacterCount(initialValues.description.length);
    }
  }, [initialValues]);

  Modal.setAppElement("#__next");

  const submitButtonText = initialValues ? "Update" : "Upload";

  const id = initialValues?.id || "";
  const title = initialValues?.title || "";
  const description = initialValues?.description || "";

  const characterLimit = 250;

  const close = () => {
    setTitleInputError(null);
    setDescriptionInputError(null);
    setFileInputError(null);
    setFileName("No file selected");
    setCharacterCount(0);
    closeModal();
  };

  const updateCharacterCount = () => {
    if (!descriptionRef.current) return false;
    setCharacterCount(descriptionRef.current.value.length);
  };

  const updateFileName = () => {
    if (!fileInputRef.current) return false;
    fileInputRef.current.files &&
      setFileName(fileInputRef.current.files[0].name);
  };

  const validateTitleInput = () => {
    if (!titleRef.current) return false;
    if (titleRef.current.value.length === 0) {
      setTitleInputError("Please fill this field!");
      return false;
    } else {
      titleInputError && setTitleInputError(null);
      return true;
    }
  };

  const validateDescriptionInput = () => {
    if (!descriptionRef.current) return false;
    if (descriptionRef.current.value.length === 0) {
      setDescriptionInputError("Please fill this field!");
      return false;
    } else if (descriptionRef.current.value.length > characterLimit) {
      setDescriptionInputError(
        `Description must be shorter than ${characterLimit} characters!`
      );
      return false;
    } else {
      descriptionInputError && setDescriptionInputError(null);
      return true;
    }
  };

  const validateFileInput = () => {
    if (!fileInputRef.current) return false;
    if (fileInputRef.current.files?.length === 0) {
      setFileInputError("Please select a file!");
      return false;
    } else {
      fileInputError && setFileInputError(null);
      return true;
    }
  };

  const validateForm = () => {
    const isTitleValid = validateTitleInput();
    const isDescriptionValid = validateDescriptionInput();
    const isFileValid = initialValues ? true : validateFileInput();

    if (isTitleValid && isDescriptionValid && isFileValid) {
      return true;
    } else return false;
  };

  const openFileBrowser = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const submitHandler = async () => {
    if (!validateForm()) return;

    const essayFormData = new FormData();

    const formData = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
    };

    essayFormData.append("data", JSON.stringify(formData));
    essayFormData.append(
      "essay",
      fileInputRef.current?.files ? fileInputRef.current.files[0] : ""
    );

    if (initialValues && initialValues.id) {
      if (await updateEssay(initialValues.id, essayFormData)) close();
    } else {
      if (await createEssay(essayFormData)) close();
    }
  };

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
      onRequestClose={close}
      style={customStyles}
      contentLabel="Essay Modal"
    >
      <div className={styles.essay_modal}>
        <div className={styles.essay_modal_title}>
          <h2>Upload New Essay</h2>
        </div>
        <div className={styles.essay_modal_body}>
          <input
            type="text"
            ref={titleRef}
            placeholder="Title"
            defaultValue={title}
            onChange={validateTitleInput}
            className={
              titleInputError
                ? styles.essay_modal_input_error
                : styles.essay_modal_input
            }
          />
          <p
            className={styles.error_text}
            style={{ display: titleInputError ? "block" : "none" }}
          >
            {titleInputError}
          </p>
          <textarea
            ref={descriptionRef}
            cols={30}
            rows={4}
            placeholder={`Description (max. ${characterLimit} characters)`}
            defaultValue={description}
            onChange={() => {
              validateDescriptionInput();
              updateCharacterCount();
            }}
            className={
              descriptionInputError
                ? styles.essay_modal_input_error
                : styles.essay_modal_input
            }
          ></textarea>
          <p>{`${characterCount} / ${characterLimit}`}</p>
          <p
            className={styles.error_text}
            style={{ display: descriptionInputError ? "block" : "none" }}
          >
            {descriptionInputError}
          </p>
          <div className={styles.file_selection}>
            <button onClick={openFileBrowser}>Select a file</button>
            <p>{`Selected file: ${fileName}`}</p>
          </div>
          <p
            className={styles.error_text}
            style={{ display: fileInputError ? "block" : "none" }}
          >
            {fileInputError}
          </p>
          <input
            style={{ display: "none" }}
            ref={fileInputRef}
            type="file"
            name="essay"
            id="essay"
            onChange={updateFileName}
          />
        </div>
        <div className={styles.modal_buttons}>
          <button
            onClick={submitHandler}
            className={styles.upload_button}
            disabled={isModalLoading}
          >
            {isModalLoading ? <Spinner size={30} /> : submitButtonText}
          </button>
          <button onClick={close}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default EssayModal;
