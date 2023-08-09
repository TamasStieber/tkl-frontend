import EssayCard from "./EssayCard";
import styles from "@/styles/Home.module.css";
import useEssays from "@/hooks/useEssays";
import Spinner from "../common/Spinner";

const EssaysContainer = () => {
  const { essays, updateEssay, isLoading } = useEssays();

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.grid_container}>
      {essays.length > 0 &&
        essays.map((essay) => (
          <EssayCard
            key={essay._id}
            essay={essay}
            updateHandler={() => updateEssay(essay._id)}
          />
        ))}
    </div>
  );
};

export default EssaysContainer;
