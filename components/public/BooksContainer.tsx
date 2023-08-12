import useBooks from '@/hooks/useBooks';
import React from 'react';
import styles from '@/styles/Home.module.css';
import Spinner from '../common/Spinner';
import BookCard from './BookCard';
import { IBook } from '@/interfaces/interfaces';

interface BooksContainerProps {
  books: IBook[];
}

const BooksContainer = ({ books }: BooksContainerProps) => {
  return (
    <div className={styles.grid_container}>
      {books.length > 0 &&
        books.map((book) => <BookCard key={book._id} book={book} />)}
    </div>
  );
};

export default BooksContainer;
