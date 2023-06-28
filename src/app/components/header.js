import Link from "next/link";

import styles from "../styles/header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.header}>
        <Link className={styles.headerLogo} href="/">Saan's Guidebook</Link>
        <ul>
          <li className={styles.headerTitle}>
            <Link href="/">Fitness</Link>
          </li>
          <li className={styles.headerTitle}>
            <Link href="/">Tech</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
