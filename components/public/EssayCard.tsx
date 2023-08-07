import { EssayCardProps } from '@/interfaces/props';
import styles from '@/styles/Home.module.css';

const EssayCard = ({ essay, updateHandler }: EssayCardProps) => {
  const { title, createdAt, description, url } = essay;
  const essayUrl = process.env.BACKEND_URL + '/essays/' + url;

  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handleClick = () => {
    updateHandler(essay._id);
    window.open(essayUrl);
  };

  return (
    <div className={styles.essay_card} onClick={handleClick}>
      <div className={styles.essay_card_title}>
        <h2>{title}</h2>
        <p>{formattedDate}</p>
      </div>
      <hr />
      <div className={styles.essay_card_description}>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default EssayCard;
