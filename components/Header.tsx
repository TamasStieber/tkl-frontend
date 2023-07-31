import styles from "../styles/Home.module.css";

const Header = () => {
  return (
    <header>
      <section>
        <div className={styles.logo_container}>
          <div className={styles.logo}></div>
        </div>
        <div className={styles.quote}>
          <p>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, nesciunt!"</p>
        </div>
      </section>
      <nav>
        <a href="/">HOME</a>
        <a href="/essays">ESSAYS</a>
        <a href="/">CONTACT</a>
      </nav>
    </header>
  );
};

export default Header;
