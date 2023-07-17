import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import moment from "moment";

import getAllPosts from "./api/getAllPosts";
import Header from "./components/header";
import Footer from "./components/footer";
import styles from "./styles/home.module.scss";

const Home = async () => {
  const posts = await getAllPosts();

  if (!posts || posts.length === 0) return notFound();

  return (
    <div className={styles.home}>
      <Header />
      <main className={styles.home_container}>
        {posts ? (
          <>
            {posts.results.map((post) => (
              <article key={post.id} className={styles.home_container_card}>
                <header>
                  <Link
                    href={`/${post.slug}`}
                    className={styles.home_container_cardTitle}
                  >
                    {post.title}
                  </Link>
                  <Link href={`/${post.slug}`}>
                    <Image
                      src={post.banner}
                      className={styles.home_container_cardImage}
                      width={800}
                      height={500}
                      alt="Picture of the post"
                    />
                  </Link>
                </header>
                <p className={styles.home_container_cardDate}>
                  {moment(post.createdAt).format("MMM DD, YYYY")}
                </p>
                {post.text.slice(0, 1).map((one) => (
                  <Link href={`/${post.slug}`} key={one.id}>
                    <p className={styles.home_container_cardParagraph}>
                      {one.paragraph.length > 280 ? `${one.paragraph.slice(0, 280)}...` : one.paragraph}
                    </p>
                  </Link>
                ))}
              </article>
            ))}
          </>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
