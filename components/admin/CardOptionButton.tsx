import styles from "@/styles/Admin.module.css";
import { useState } from "react";
import { IconType } from "react-icons";

interface CardOptionButtonProps {
  icon: IconType;
  hoverColor: string;
  onClick?: () => void;
}

const CardOptionButton = ({
  icon,
  hoverColor,
  onClick,
}: CardOptionButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const Icon = icon;

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const color = isHovering ? hoverColor : "initial";

  return (
    <button
      className={styles.card_option_button}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ color: color }}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};

export default CardOptionButton;
