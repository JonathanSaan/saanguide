import Header from "./components/header";
import Footer from "./components/footer";

import styles from "./styles/home.module.scss"

export default function Home() {
  return (
    <div className={styles.home}>
      <Header />
      <h1 className={styles.homeTitle}>k eae man</h1>
      <Footer />
    </div>
  );
}
