import Header from "./components/header";
import Footer from "./components/footer";

import styles from "./styles/home.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.home_container}>
        <article className={styles.home_container_card}>
          <header>
            <h1 className={styles.home_container_cardTitle}>k eae man</h1>
          </header>
          <p className={styles.home_container_cardSubtitle}>kk</p>
        </article>
        <article className={styles.home_container_card}>
          <header>
            <h1 className={styles.home_container_cardTitle}>k eae man</h1>
          </header>
          <p className={styles.home_container_cardSubtitle}>kk</p>
        </article>
      </div>
      <Footer />
    </div>
  );
}
