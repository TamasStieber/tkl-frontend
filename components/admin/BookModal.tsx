import styles from "@/styles/Admin.module.css";
import { useRef, useState } from "react";
import Modal from "react-modal";
import Spinner from "../common/Spinner";
import { IBookFormData } from "@/interfaces/interfaces";

interface BookModalProps {
  isOpen: boolean;
  closeModal: () => void;
  createBook: (formData: IBookFormData) => Promise<boolean>;
  isCreating: boolean;
}

const BookModal = ({
  isOpen,
  closeModal,
  createBook,
  isCreating,
}: BookModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const hrefRef = useRef<HTMLInputElement>(null);
  const photoUrlRef = useRef<HTMLInputElement>(null);
  const [titleInputError, setTitleInputError] = useState<string | null>(null);
  const [authorInputError, setAuthorInputError] = useState<string | null>(null);
  const [descriptionInputError, setDescriptionInputError] = useState<
    string | null
  >(null);
  const [hrefInputError, setHrefInputError] = useState<string | null>(null);
  const [photoUrlInputError, setPhotoUrlInputError] = useState<string | null>(
    null
  );

  Modal.setAppElement("#__next");

  const characterLimit = 1250;

  const close = () => {
    setTitleInputError(null);
    setAuthorInputError(null);
    setDescriptionInputError(null);
    setHrefInputError(null);
    setPhotoUrlInputError(null);
    closeModal();
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

  const validateForm = () => {
    const isTitleValid = validateTitleInput();
    const isDescriptionValid = validateDescriptionInput();

    if (isTitleValid && isDescriptionValid) {
      return true;
    } else return false;
  };

  const submitHandler = async () => {
    if (!validateForm()) return;

    const formData = {
      title: titleRef.current ? titleRef.current.value : "",
      author: authorRef.current ? authorRef.current?.value : "",
      description: descriptionRef.current ? descriptionRef.current?.value : "",
      href: hrefRef.current ? hrefRef.current?.value : "",
      photoUrl: photoUrlRef.current ? photoUrlRef.current?.value : "",
    };

    if (await createBook(formData)) close();
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
      contentLabel="Add New Book Modal"
    >
      <div className={styles.essay_modal}>
        <div className={styles.essay_modal_title}>
          <h2>Add New Book</h2>
        </div>
        <div className={styles.essay_modal_body}>
          <input
            type="text"
            ref={titleRef}
            placeholder="Title"
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
          <input
            type="text"
            ref={authorRef}
            placeholder="Author"
            className={
              authorInputError
                ? styles.essay_modal_input_error
                : styles.essay_modal_input
            }
          />
          <p
            className={styles.error_text}
            style={{ display: authorInputError ? "block" : "none" }}
          >
            {authorInputError}
          </p>
          <textarea
            ref={descriptionRef}
            cols={30}
            rows={4}
            placeholder={`Description`}
            // onChange={() => {
            //   validateDescriptionInput();
            // }}
            className={
              descriptionInputError
                ? styles.essay_modal_input_error
                : styles.essay_modal_input
            }
          ></textarea>
          <p
            className={styles.error_text}
            style={{ display: descriptionInputError ? "block" : "none" }}
          >
            {descriptionInputError}
          </p>
          <input
            type="text"
            ref={hrefRef}
            placeholder="Link to the book"
            className={
              hrefInputError
                ? styles.essay_modal_input_error
                : styles.essay_modal_input
            }
          />
          <p
            className={styles.error_text}
            style={{ display: hrefInputError ? "block" : "none" }}
          >
            {hrefInputError}
          </p>
          <input
            type="text"
            ref={photoUrlRef}
            placeholder="Link to the photo of the book"
            className={
              photoUrlInputError
                ? styles.essay_modal_input_error
                : styles.essay_modal_input
            }
          />
          <p
            className={styles.error_text}
            style={{ display: photoUrlInputError ? "block" : "none" }}
          >
            {photoUrlInputError}
          </p>
        </div>
        <div className={styles.modal_buttons}>
          <button
            onClick={submitHandler}
            className={styles.upload_button}
            disabled={isCreating}
          >
            {isCreating ? <Spinner size={30} /> : "Add"}
          </button>
          <button onClick={close}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default BookModal;
