import styles from "../styles/footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerTitle}>Copyright © {new Date().getFullYear()} - Jonathan Saan.</p>
    </footer>
  );
};

export default Footer;
