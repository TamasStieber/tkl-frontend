import useBooks from "@/hooks/useBooks";
import Spinner from "../common/Spinner";
import styles from "@/styles/Home.module.css";
import BookCard from "./BookCard";

const BookListsContainer = () => {
  const { books, isLoading, error } = useBooks();

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.grid_container}>
      {books.length > 0 &&
        books.map((book) => <BookCard key={book._id} book={book} />)}
    </div>
  );
};

export default BookListsContainer;
