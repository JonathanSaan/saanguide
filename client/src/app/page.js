import Link from "next/link";
import Image from "next/image";

import moment from "moment";

import getAllPosts from "./api/getAllPosts";
import Header from "./components/header";
import Footer from "./components/footer";
import styles from "./styles/home.module.scss";

const Home = async () => {
  const posts = await getAllPosts();
    
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
                <span className={styles.home_container_card_details}>
                  <p className={styles.home_container_card_detailsAuthor}>{post.author}</p>
                  <p className={styles.home_container_card_detailsDate}>
                    {moment(post.createdAt).format("MMM DD, YYYY")}
                  </p>
                </span>
                <Link href={`/${post.slug}`} className={styles.home_container_cardDescription}>
                  <p>Read more...</p>
                </Link>
              </article>
            ))}
          </>
        ) : (
          <div className={styles.home_containerNofound}>
            <p>No posts found.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
                
export default Home;
