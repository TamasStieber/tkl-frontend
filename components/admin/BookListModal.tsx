import styles from '@/styles/Admin.module.css';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import Spinner from '../common/Spinner';
import useBooks from '@/hooks/useBooks';
import { IBook } from '@/interfaces/interfaces';
import BookListModalBookList from './BookListModalBookList';

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
  const [fileName, setFileName] = useState('No file selected');
  const [characterCount, setCharacterCount] = useState(0);
  const [availableBooks, setAvailableBooks] = useState<IBook[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<IBook[]>([]);

  Modal.setAppElement('#main');

  const sortBooks = (books: IBook[]) => {
    const sortedBooks = books.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();

      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });

    return sortedBooks;
  };

  useEffect(() => {
    setAvailableBooks(sortBooks(books));
  }, [books]);

  const handleAvailableBooksClick = (clickedBook: IBook) => {
    const filteredBooks = availableBooks.filter(
      (book) => book._id !== clickedBook._id
    );

    setAvailableBooks(filteredBooks);
    setSelectedBooks([...selectedBooks, clickedBook]);
  };

  const handleSelectedBooksClick = (clickedBook: IBook) => {
    const filteredBooks = selectedBooks.filter(
      (book) => book._id !== clickedBook._id
    );

    setSelectedBooks(filteredBooks);
    const sortedBooks = sortBooks([...availableBooks, clickedBook]);
    setAvailableBooks(sortedBooks);
  };

  const close = () => {
    setTitleInputError(null);
    setDescriptionInputError(null);
    setFileInputError(null);
    setFileName('No file selected');
    setCharacterCount(0);
    setAvailableBooks(books);
    setSelectedBooks([]);
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
      setTitleInputError('Please fill this field!');
      return false;
    } else {
      titleInputError && setTitleInputError(null);
      return true;
    }
  };

  const validateDescriptionInput = () => {
    if (!descriptionRef.current) return false;
    if (descriptionRef.current.value.length === 0) {
      setDescriptionInputError('Please fill this field!');
      return false;
    } else {
      descriptionInputError && setDescriptionInputError(null);
      return true;
    }
  };

  const validateFileInput = () => {
    if (!fileInputRef.current) return false;
    if (fileInputRef.current.files?.length === 0) {
      setFileInputError('Please select a file!');
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

    const selectedBookIds = [];
    for (const book of selectedBooks) {
      selectedBookIds.push(book._id);
    }
    const formData = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      books: selectedBookIds,
      isHidden: isHiddenRef.current?.checked,
    };

    bookListFormData.append('data', JSON.stringify(formData));
    bookListFormData.append(
      'photo',
      fileInputRef.current?.files ? fileInputRef.current.files[0] : ''
    );

    if (await createBookList(bookListFormData)) close();
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      style={customStyles}
      contentLabel='Book List Modal'
    >
      <div className={styles.book_list_modal}>
        <div className={styles.book_list_modal_title}>
          <h2>Add New Book List</h2>
        </div>
        <div className={styles.book_list_modal_body}>
          <input
            type='text'
            ref={titleRef}
            placeholder='Title'
            onChange={validateTitleInput}
            className={
              titleInputError
                ? styles.book_list_modal_input_error
                : styles.book_list_modal_input
            }
          />
          <p
            className={styles.error_text}
            style={{ display: titleInputError ? 'block' : 'none' }}
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
            style={{ display: descriptionInputError ? 'block' : 'none' }}
          >
            {descriptionInputError}
          </p>
          <div className={styles.book_list_modal_book_selection}>
            <BookListModalBookList
              books={availableBooks}
              searchBox
              title='Available Books'
              onClick={handleAvailableBooksClick}
            />
            <BookListModalBookList
              books={selectedBooks}
              title='Selected Books'
              onClick={handleSelectedBooksClick}
            />
          </div>
          <div className={styles.file_selection}>
            <button onClick={openFileBrowser}>Select a photo (optional)</button>
            <p>{`Selected file: ${fileName}`}</p>
          </div>
          <input
            style={{ display: 'none' }}
            ref={fileInputRef}
            type='file'
            accept='image/*'
            name='book-list-image'
            id='book-list-image'
            onChange={updateFileName}
          />
          <input
            ref={isHiddenRef}
            type='checkbox'
            name='is-hidden'
            id='is-hidden'
          />
        </div>
        <div className={styles.modal_buttons}>
          <button
            onClick={submitHandler}
            className={styles.upload_button}
            disabled={isCreating}
          >
            {isCreating ? <Spinner size={30} /> : 'Add'}
          </button>
          <button onClick={close}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default BookListModal;
