import Header from "./components/header";
import Footer from "./components/footer";

import styles from "./styles/error.module.scss";

export default function NotFound() {
  return (
    <div className={styles.error}>
      <Header />
      <h1 className={styles.errorTitle}>404</h1>
      <h3 className={styles.errorSubtitle}>Page not found</h3>
      <Footer />
    </div>
  );
}
