import EssayCard from './EssayCard';
import styles from '../styles/Home.module.css';
import useEssays from '@/hooks/useEssays';

const EssaysContainer = () => {
  const { essays, deleteEssay } = useEssays();

  return (
    <div className={styles.essays_container}>
      {essays.length > 0 &&
        essays.map((essay) => (
          <EssayCard
            key={essay._id}
            essay={essay}
            deleteHandler={() => deleteEssay(essay._id)}
          />
        ))}
    </div>
  );
};

export default EssaysContainer;
