import useBooks from "@/hooks/useBooks";
import { useState } from "react";
import BookModal from "./BookModal";
import Spinner from "../common/Spinner";
import BookCard from "./BookCard";

const ManageBookLists = () => {
  const { books, isLoading, error, createBook, deleteBook, isCreating } =
    useBooks();
  const [isOpen, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  if (isLoading) return <Spinner />;

  return (
    <>
      <button onClick={openModal}>Add Book List</button>
      <BookModal
        isOpen={isOpen}
        closeModal={closeModal}
        createBook={createBook}
        isCreating={isCreating}
      />
      {books.length > 0 &&
        books.map((book) => (
          <BookCard key={book._id} book={book} deleteHandler={deleteBook} />
        ))}
    </>
  );
};

export default ManageBookLists;
