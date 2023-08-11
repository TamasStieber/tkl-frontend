import { IBook } from "@/interfaces/interfaces";
import styles from "@/styles/Admin.module.css";
import { useRef, useState } from "react";

interface BookListModalBookListProps {
  books: IBook[];
}

const BookListModalBookList = ({ books }: BookListModalBookListProps) => {
  const [displayedBooks, setDisplayedBooks] = useState<IBook[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchBooks = () => {
    if (!searchInputRef.current) return;
    const filter = searchInputRef.current.value;
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(filter)
    );
    setDisplayedBooks(filteredBooks);
  };

  return (
    <div className={styles.book_list_container}>
      <input
        ref={searchInputRef}
        onChange={searchBooks}
        type="text"
        placeholder="Search for books"
      />
      <div className={styles.book_list}>
        {displayedBooks.map((book) => (
          <p>{book.title}</p>
        ))}
      </div>
    </div>
  );
};

export default BookListModalBookList;
