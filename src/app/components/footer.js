import Link from "next/link";

import styles from "../styles/footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerTitle}>
        Copyright © {new Date().getFullYear()} -{" "}
        <Link
          href="https://jonathansaan.github.io/portfolio/"
          target="_blank"
          className={styles.footerTitleName}
        >
          Jonathan Saan.
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
