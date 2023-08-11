import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import styles from "@/styles/Admin.module.css";
import { useState } from "react";
import { IBook, IBookList } from "@/interfaces/interfaces";
import CardOptionButton from "./CardOptionButton";
import DeleteModal from "./DeleteModal";

interface BookListCardProps {
  bookList: IBookList;
  deleteHandler: (id: string) => void;
}

const BookListCard = ({ bookList, deleteHandler }: BookListCardProps) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const date = new Date(bookList.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div key={bookList._id} className={styles.book_list_card}>
        <div className={styles.book_list_card_head}>
          <div className={styles.book_list_card_title}>
            <h2>{bookList.title}</h2>
          </div>
          <div className={styles.book_list_card_options}>
            <CardOptionButton
              icon={AiOutlineDelete}
              hoverColor="red"
              onClick={openDeleteModal}
            />
          </div>
        </div>
        <div className={styles.book_list_card_body}>
          <img src={bookList.photoUrl} alt={bookList.title} />
          <div>
            <p>{bookList.description}</p>
          </div>
        </div>
      </div>

      <DeleteModal
        titleToDelete={bookList.title}
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        deleteHandler={() => deleteHandler(bookList._id)}
      />
    </>
  );
};

export default BookListCard;
