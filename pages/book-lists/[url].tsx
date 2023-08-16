import Spinner from '@/components/common/Spinner';
import BooksContainer from '@/components/public/BooksContainer';
import PublicWrapper from '@/components/public/PublicWrapper';
import useBookLists from '@/hooks/useBookLists';
import { useRouter } from 'next/router';
import React from 'react';

const BookList = () => {
  const { bookLists, isLoading, error } = useBookLists();
  const router = useRouter();
  const { url } = router.query;

  if (isLoading) return <Spinner />;

  const bookList = bookLists.find((bookList) => bookList.url === url);
  if (!bookList) return <p>An error occurred.</p>;

  return (
    <PublicWrapper title='Book Lists'>
      <BooksContainer books={bookList.books} />
    </PublicWrapper>
  );
};

export default BookList;
