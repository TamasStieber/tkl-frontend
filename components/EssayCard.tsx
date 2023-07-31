import { EssayCardProps } from "@/interfaces/props";
import styles from "../styles/Home.module.css";

const EssayCard = ({ title, date, description }: EssayCardProps) => {
  return (
    <div className={styles.essay_card} onClick={() => window.open('https://www.africau.edu/images/default/sample.pdf')}>
      <div className={styles.essay_card_title}>
        <h2>{title}</h2>
        <p>{date}</p>
      </div>
      <hr />
      <div className={styles.essay_card_description}>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default EssayCard;
