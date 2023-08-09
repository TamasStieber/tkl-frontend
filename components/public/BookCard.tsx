import { IBook } from "@/interfaces/interfaces";
import styles from "@/styles/Home.module.css";

interface BookCardProps {
  book: IBook;
}

const BookCard = ({ book }: BookCardProps) => {
  const { title, author, description, href, photoUrl } = book;

  const handleClick = () => {
    window.open(href);
  };

  return (
    <div className={styles.book_card}>
      <img onClick={handleClick} src={photoUrl} alt={title} />
      <div className={styles.book_card_title}>
        <h2>{title}</h2>
        <p>{`by ${author}`}</p>
      </div>
      <div className={styles.book_card_body}>
        <button onClick={handleClick}>Buy on Amazon</button>
      </div>
    </div>
  );
};

export default BookCard;
