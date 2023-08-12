import { IBookList } from '@/interfaces/interfaces';
import styles from '@/styles/Home.module.css';

interface BookListCardProps {
  bookList: IBookList;
}

const BookListCard = ({ bookList }: BookListCardProps) => {
  const { title, description, url, photoUrl, books } = bookList;

  const baseUrl = process.env.BACKEND_URL + '/images/';

  const gridColumnLayout = books.length > 1 ? 'auto auto' : 'auto';
  const gridRowLayout = books.length > 2 ? 'auto auto' : 'auto';
  const columnSpan = books.length === 3 ? 'span 2' : undefined;

  return (
    <a className={styles.book_list_card} href={`/book-lists/${bookList.url}`}>
      {bookList.photoUrl ? (
        <div
          className={styles.book_list_card_background}
          style={{ backgroundImage: `url(${baseUrl + bookList.photoUrl})` }}
        ></div>
      ) : (
        <div
          className={styles.book_list_card_grid_background}
          style={{
            gridTemplateColumns: gridColumnLayout,
            gridTemplateRows: gridRowLayout,
          }}
        >
          {books.map((book, index) => (
            <div
              key={book._id}
              className={styles.book_list_card_background_element}
              style={{
                backgroundImage: `url(${book.photoUrl})`,
                gridColumn: index === 0 ? columnSpan : undefined,
              }}
            ></div>
          ))}
        </div>
      )}
      <div className={styles.book_list_card_title}>{title}</div>
    </a>
  );
};

export default BookListCard;
