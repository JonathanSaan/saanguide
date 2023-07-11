import Link from "next/link";

import Header from "./components/header";
import Footer from "./components/footer";

import styles from "./styles/home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <main className={styles.home_container}>
        <article className={styles.home_container_card}>
          <header className={styles.home_container_cardTitle}>
            <Link href="/post/1">How to learn programming</Link>
          </header>
          <p>kk</p>
        </article>
        <article className={styles.home_container_card}>
          <header className={styles.home_container_cardTitle}>
            <Link href="/post/2">How to start working out</Link>
          </header>
          <p>kk</p>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
