import Link from "next/link";

import styles from "../styles/header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.headerTitle} href="/">Saan's Guidebook</Link>
    </header>
  );
};

export default Header;
