import { EssayCardOptionButtonProps } from '@/interfaces/props';
import styles from '@/styles/Admin.module.css';
import { useState } from 'react';

const EssayCardOptionButton = ({
  icon,
  hoverColor,
  onClick,
}: EssayCardOptionButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const Icon = icon;

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const color = isHovering ? hoverColor : 'initial';

  return (
    <button
      className={styles.essay_card_option_button}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ color: color }}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};

export default EssayCardOptionButton;
