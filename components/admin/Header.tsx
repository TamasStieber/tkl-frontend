import styles from '@/styles/Admin.module.css';

const Header = () => {
  return (
    <header>
      <section>
        <div className={styles.logo_container}>
          <div className={styles.logo}></div>
        </div>
      </section>
      <nav>
        <a href='/admin/'>Manage Posts</a>
        <a href='/admin/'>Change Password</a>
      </nav>
    </header>
  );
};

export default Header;
