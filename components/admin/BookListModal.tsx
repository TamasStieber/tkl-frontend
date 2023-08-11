import styles from "@/styles/Admin.module.css";
import { useRef, useState } from "react";
import Modal from "react-modal";
import Spinner from "../common/Spinner";
import useBooks from "@/hooks/useBooks";
import { IBook } from "@/interfaces/interfaces";
import BookListModalBookList from "./BookListModalBookList";

interface BookListModalProps {
  isOpen: boolean;
  closeModal: () => void;
  createBookList: (formData: FormData) => Promise<boolean>;
  isCreating: boolean;
}

const BookListModal = ({
  isOpen,
  closeModal,
  createBookList,
  isCreating,
}: BookListModalProps) => {
  const { books, isLoading, error } = useBooks();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isHiddenRef = useRef<HTMLInputElement>(null);
  const [titleInputError, setTitleInputError] = useState<string | null>(null);
  const [descriptionInputError, setDescriptionInputError] = useState<
    string | null
  >(null);
  const [fileInputError, setFileInputError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("No file selected");
  const [characterCount, setCharacterCount] = useState(0);
  const [availableBooks, setAvailableBooks] = useState<IBook[]>(books);
  const [selectedBooks, setSelectedBooks] = useState<IBook[]>([]);

  Modal.setAppElement("#main");

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

    if (isTitleValid && isDescriptionValid) {
      return true;
    } else return false;
  };

  const openFileBrowser = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const submitHandler = async () => {
    if (!validateForm()) return;

    const bookListFormData = new FormData();

    const formData = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
    };

    bookListFormData.append("data", JSON.stringify(formData));
    bookListFormData.append(
      "photo",
      fileInputRef.current?.files ? fileInputRef.current.files[0] : ""
    );

    if (await createBookList(bookListFormData)) close();
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
      contentLabel="Book List Modal"
    >
      <div className={styles.book_list_modal}>
        <div className={styles.book_list_modal_title}>
          <h2>Add New Book List</h2>
        </div>
        <div className={styles.book_list_modal_body}>
          <input
            type="text"
            ref={titleRef}
            placeholder="Title"
            onChange={validateTitleInput}
            className={
              titleInputError
                ? styles.book_list_modal_input_error
                : styles.book_list_modal_input
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
            placeholder={`Description`}
            onChange={() => {
              validateDescriptionInput();
              updateCharacterCount();
            }}
            className={
              descriptionInputError
                ? styles.book_list_modal_input_error
                : styles.book_list_modal_input
            }
          ></textarea>
          <p
            className={styles.error_text}
            style={{ display: descriptionInputError ? "block" : "none" }}
          >
            {descriptionInputError}
          </p>
          <div className={styles.book_list_modal_book_selection}>
            <BookListModalBookList books={availableBooks} />
            <button>➡</button>
            <BookListModalBookList books={selectedBooks} />
          </div>
          <div className={styles.file_selection}>
            <button onClick={openFileBrowser}>Select a photo (optional)</button>
            <p>{`Selected file: ${fileName}`}</p>
          </div>
          <input
            style={{ display: "none" }}
            ref={fileInputRef}
            type="file"
            name="book-list"
            id="book-list"
            onChange={updateFileName}
          />
          <input
            ref={isHiddenRef}
            type="checkbox"
            name="is-hidden"
            id="is-hidden"
            defaultChecked
          />
        </div>
        <div className={styles.modal_buttons}>
          <button
            onClick={submitHandler}
            className={styles.upload_button}
            disabled={isCreating}
          >
            {isCreating ? <Spinner size={30} /> : "Upload"}
          </button>
          <button onClick={close}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default BookListModal;
