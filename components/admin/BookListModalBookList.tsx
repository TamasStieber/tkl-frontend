import { IBook } from '@/interfaces/interfaces';
import styles from '@/styles/Admin.module.css';
import { useEffect, useRef, useState } from 'react';

interface BookListModalBookListProps {
  books: IBook[];
  searchBox?: boolean;
  title: string;
  onClick: (book: IBook) => void;
}

const BookListModalBookList = ({
  books,
  searchBox = false,
  title,
  onClick,
}: BookListModalBookListProps) => {
  const [displayedBooks, setDisplayedBooks] = useState<IBook[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDisplayedBooks(applyFilter(books));
  }, [books]);

  const applyFilter = (books: IBook[]) => {
    if (!searchInputRef.current) return books;
    const filter = searchInputRef.current.value;
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(filter)
    );
    return filteredBooks;
  };

  const searchBooks = () => {
    setDisplayedBooks(applyFilter(books));
  };

  return (
    <div className={styles.book_list_container}>
      <p>{title}</p>
      {searchBox && (
        <input
          ref={searchInputRef}
          onChange={searchBooks}
          type='text'
          placeholder='Search for books'
        />
      )}
      <div className={styles.book_list}>
        {displayedBooks.map((book) => (
          <div
            key={book._id}
            className={styles.book_list_element}
            onClick={() => onClick(book)}
          >
            {book.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListModalBookList;
