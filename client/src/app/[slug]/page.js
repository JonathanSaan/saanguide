import Image from "next/image";
import { notFound } from "next/navigation";

import moment from "moment";

import getAllPosts from "../api/getAllPosts";
import getPost from "../api/getPost";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/post.module.scss";

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post)
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };

  return {
    title: `${post.title} - Saan's Guidebook`,
    description: post.description,
    alternates: {
      canonical: `/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.results.map((post) => ({
    slug: post.slug,
  }));
}

const Post = async ({ params }) => {
  const post = await getPost(params.slug);

  if (!post) notFound();

  return (
    <div className={styles.post}>
      <Header />
      <main className={styles.post_container}>
        {post ? (
          <article key={post.id}>
            <header>
              <h1 className={styles.post_containerTitle}>{post.title}</h1>
              <Image
                src={post.banner}
                className={styles.post_containerImage}
                width={800}
                height={500}
                alt="Picture of the post"
              />
            </header>
            <span className={styles.post_container_details}>
              <p className={styles.post_container_detailsAuthor}>{post.author}</p>
              <p className={styles.post_container_detailsDate}>{moment(post.createdAt).format("MMM DD, YYYY")}</p>
            </span>
            <p className={styles.post_containerWarn}>{post.warn}</p>
            {post.text.map((one) => (
              <div key={one.id}>
                <h2 className={styles.post_containerSubtitle}>
                  {one.subtitle}
                </h2>
                <p className={styles.post_containerParagraph}>
                  {one.paragraph}
                </p>
              </div>
            ))}
          </article>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default Post;
