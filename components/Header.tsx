import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = () => {
  const [show, setShow] = useState(false);

  const toggleMenu = () => setShow(!show);

  return (
    <header>
      <section>
        <div className={styles.logo_container}>
          <a href='/'>
            <img
              src='/logo.png'
              alt='The Kingdom Library'
              className={styles.logo}
            />
          </a>

          <button onClick={toggleMenu} className={styles.menu_button}>
            <AiOutlineMenu />
          </button>
        </div>
        <div className={styles.quote}>
          <p>Cultivating Christian imagination, one book at the time</p>
          <p>
            Equipping parents to choose quality literature for spiritual growth.
          </p>
        </div>
      </section>
      <nav>
        <a href='/'>HOME</a>
        <a href='/essays'>ESSAYS</a>
        <a href='/contact'>CONTACT</a>
      </nav>
      <nav
        className={styles.dropdown}
        style={{ display: show ? 'flex' : 'none' }}
      >
        <a href='/'>HOME</a>
        <a href='/essays'>ESSAYS</a>
        <a href='/contact'>CONTACT</a>
      </nav>
    </header>
  );
};

export default Header;
