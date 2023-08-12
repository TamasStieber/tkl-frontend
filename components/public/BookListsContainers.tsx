import Spinner from '../common/Spinner';
import styles from '@/styles/Home.module.css';
import useBookLists from '@/hooks/useBookLists';
import BookListCard from './BookListCard';

const BookListsContainer = () => {
  const { bookLists, isLoading, error } = useBookLists();

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.grid_container}>
      {bookLists.length > 0 &&
        bookLists.map((bookList) => (
          <BookListCard key={bookList._id} bookList={bookList} />
        ))}
    </div>
  );
};

export default BookListsContainer;
