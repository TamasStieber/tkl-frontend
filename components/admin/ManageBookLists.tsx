import useBooks from "@/hooks/useBooks";
import { useState } from "react";
import BookModal from "./BookModal";
import Spinner from "../common/Spinner";
import BookCard from "./BookCard";
import useBookLists from "@/hooks/useBookLists";
import BookListModal from "./BookListModal";
import BookListCard from "./BookListCard";

const ManageBookLists = () => {
  const {
    bookLists,
    isLoading,
    error,
    createBookList,
    deleteBookList,
    isCreating,
  } = useBookLists();
  const [isOpen, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  if (isLoading) return <Spinner />;

  return (
    <>
      <button onClick={openModal}>Add Book List</button>
      <BookListModal
        isOpen={isOpen}
        closeModal={closeModal}
        createBookList={createBookList}
        isCreating={isCreating}
      />
      {bookLists.length > 0 &&
        bookLists.map((bookList) => (
          <BookListCard
            key={bookList._id}
            bookList={bookList}
            deleteHandler={deleteBookList}
          />
        ))}
    </>
  );
};

export default ManageBookLists;
