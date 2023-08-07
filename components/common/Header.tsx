import { useState } from 'react';
import styles from '@/styles/Home.module.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Navbar from './Navbar';

interface HeaderProps {
  display: 'public' | 'admin';
}

const Header = ({ display }: HeaderProps) => {
  const [show, setShow] = useState(false);

  const toggleMenu = () => setShow(!show);

  return (
    <header>
      <section>
        <div className={styles.logo_container}>
          <a href='/'>
            <img
              src='/logo.png'
              alt='Kingdom Library'
              className={styles.logo}
            />
          </a>

          <button onClick={toggleMenu} className={styles.menu_button}>
            <AiOutlineMenu />
          </button>
        </div>
        {/* <div className={styles.quote}>
          <p>Cultivating Christian imagination, one book at the time</p>
          <p>
            Equipping parents to choose quality literature for spiritual growth.
          </p>
        </div> */}
      </section>
      <Navbar display={display} showMenu={show} />

      {/* <nav>
        {menuItems.map((menuItem) => (
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
        style={{ display: show ? "flex" : "none" }}
      >
        {menuItems.map((menuItem) => (
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
      </nav> */}
    </header>
  );
};

export default Header;
