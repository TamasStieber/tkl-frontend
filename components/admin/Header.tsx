import styles from "@/styles/Admin.module.css";

const Header = () => {
  return (
    <header>
      <section>
        <div className={styles.logo_container}>
          <div className={styles.logo}></div>
        </div>
      </section>
      <nav>
        <a className={styles.main_link} href="/">Link Post</a>
        <a href="/admin/posts">Manage Posts</a>
        <a href="/admin/posts">Manage Essays</a>
      </nav>
    </header>
  );
};

export default Header;
