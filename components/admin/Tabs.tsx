import { ITabsData } from "@/interfaces/interfaces";
import styles from "@/styles/Admin.module.css";

interface TabsProps {
  tabs: ITabsData[];
  activeTab: string;
  setFunction: (value: string) => void;
}

const Tabs = ({ tabs, activeTab, setFunction }: TabsProps) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          className={tab.value === activeTab ? styles.active_tab : undefined}
          onClick={() => setFunction(tab.value)}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
