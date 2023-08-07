import adminMenuItems from '@/utils/adminMenuItems';
import menuItems from '@/utils/menuItems';
import { useState } from 'react';
import styles from '@/styles/Home.module.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/router';

interface NavbarProps {
  display: 'public' | 'admin';
  showMenu: boolean;
}

const Navbar = ({ display, showMenu }: NavbarProps) => {
  const menuItemsToDisplay = display === 'public' ? menuItems : adminMenuItems;

  const router = useRouter();

  return (
    <>
      <nav>
        {menuItemsToDisplay.map((menuItem) => (
          <a
            className={
              menuItem.href === router.pathname ? styles.active : undefined
            }
            key={menuItem.href}
            href={menuItem.href}
          >
            {menuItem.displayText}
          </a>
        ))}
      </nav>
      <nav
        className={styles.dropdown}
        style={{ display: showMenu ? 'flex' : 'none' }}
      >
        {menuItemsToDisplay.map((menuItem) => (
          <a
            className={
              menuItem.href === router.pathname ? styles.active : undefined
            }
            key={menuItem.href}
            href={menuItem.href}
          >
            {menuItem.displayText}
          </a>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
