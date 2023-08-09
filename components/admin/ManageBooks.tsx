import useBooks from "@/hooks/useBooks";
import { useState } from "react";
import BookModal from "./BookModal";
import Spinner from "../common/Spinner";

const ManageBooks = () => {
  const { books, isLoading, error, createBook, isCreating } = useBooks();
  const [isOpen, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <button onClick={openModal}>Add Book</button>
      <BookModal
        isOpen={isOpen}
        closeModal={closeModal}
        createBook={createBook}
        isCreating={isCreating}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        books.length > 0 && books.map((book) => <div key={book._id}></div>)
      )}
    </>
  );
};

export default ManageBooks;
