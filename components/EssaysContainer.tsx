import EssayCard from "./EssayCard";
import styles from "../styles/Home.module.css";

const EssaysContainer = () => {
  return (
    <div className={styles.essays_container}>
      <EssayCard
        title="The Impact of Artificial Intelligence on the Job Market"
        date="24 June 2023"
        description="Exploring the transformative effects of AI on employment, analyzing job displacement, emerging opportunities, and the importance of upskilling in the face of automation."
      />
      <EssayCard
        title="Climate Change and Global Health: A Looming Crisis"
        date="24 June 2023"
        description="Examining the intersection between climate change and public health, discussing the health risks posed by environmental degradation and the urgency for sustainable solutions."
      />
      <EssayCard
        title="The Ethics of Genetic Engineering: Balancing Progress and Responsibility"
        date="24 June 2023"
        description="Delving into the ethical dilemmas surrounding genetic engineering, including gene editing technologies, designer babies, and the need for ethical guidelines in scientific advancements."
      />
      <EssayCard
        title="Social Media and Mental Health: Unraveling the Connection"
        date="24 June 2023"
        description="Investigating the complex relationship between social media usage and mental well-being, addressing potential benefits, risks, and strategies for a healthier online experience."
      />
      <EssayCard
        title="The Power of Storytelling in Shaping Cultures and Societies"
        date="24 June 2023"
        description="Exploring the significance of storytelling throughout history, analyzing its role in shaping identities, traditions, and the transmission of knowledge in different societies."
      />
    </div>
  );
};

export default EssaysContainer;
