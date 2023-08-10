import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import styles from "@/styles/Admin.module.css";
import { useState } from "react";
import { IBook } from "@/interfaces/interfaces";
import CardOptionButton from "./CardOptionButton";
import DeleteModal from "./DeleteModal";

interface BookCardProps {
  book: IBook;
  deleteHandler: (id: string) => void;
}

const BookCard = ({ book, deleteHandler }: BookCardProps) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const date = new Date(book.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div key={book._id} className={styles.book_card}>
        <div className={styles.book_card_head}>
          <div className={styles.book_card_title}>
            <h2>{book.title}</h2>
            <p>by {book.author}</p>
          </div>
          <div className={styles.book_card_options}>
            <CardOptionButton
              icon={AiOutlineDelete}
              hoverColor="red"
              onClick={openDeleteModal}
            />
          </div>
        </div>
        <div className={styles.book_card_body}>
          <img src={book.photoUrl} alt={book.title} />
          <div>
            <p>{book.description}</p>
            <a href={book.href} target="_blank">
              Open Link
            </a>
          </div>
        </div>
      </div>

      <DeleteModal
        titleToDelete={book.title}
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        deleteHandler={() => deleteHandler(book._id)}
      />
    </>
  );
};

export default BookCard;
