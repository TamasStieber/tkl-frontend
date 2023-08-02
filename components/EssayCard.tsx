import { EssayCardProps } from '@/interfaces/props';
import styles from '../styles/Home.module.css';

const EssayCard = ({ essay }: EssayCardProps) => {
  const { title, createdAt, description, url } = essay;
  const essayUrl = process.env.BACKEND_URL + '/essays/' + url;

  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.essay_card} onClick={() => window.open(essayUrl)}>
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
