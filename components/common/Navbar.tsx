// import adminMenuItems from '@/utils/adminMenuItems';
// import menuItems from '@/utils/menuItems';
import { useState } from 'react';
import styles from '@/styles/Home.module.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { adminMenuItems, publicMmenuItems } from '@/utils/menuItems';

interface NavbarProps {
  display: 'public' | 'admin';
  showMenu: boolean;
}

const Navbar = ({ display, showMenu }: NavbarProps) => {
  const isPublicMenu = display === 'public';
  const menuItemsToDisplay = isPublicMenu ? publicMmenuItems : adminMenuItems;

  const router = useRouter();

  const isActiveLink = (href: string) => {
    const index = isPublicMenu ? 1 : 2;
    const rawHref = '/' + href.split('/')[index];
    const rawRoute = '/' + router.pathname.split('/')[index];

    if (rawHref === rawRoute) return true;
    return false;
  };

  return (
    <>
      <nav>
        {menuItemsToDisplay.map((menuItem) => (
          <a
            className={isActiveLink(menuItem.href) ? styles.active : undefined}
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
            className={isActiveLink(menuItem.href) ? styles.active : undefined}
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
