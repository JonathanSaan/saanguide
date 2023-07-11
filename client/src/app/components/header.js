import Link from "next/link";

import styles from "../styles/header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.headerLogo} href="/">Saan's Guidebook</Link>
      <Link className={styles.headerTitle} href="/">Fitness</Link>
      <Link className={styles.headerTitle} href="/">Tech</Link>
    </header>
  );
};

export default Header;
