import Image from "next/image";
import { notFound } from "next/navigation";

import moment from "moment";

import getAllPosts from "../api/getAllPosts";
import getPost from "../api/getPost";
import Header from "../components/header";
import ModifyPublication from "../components/modifyPublication";
import Comments from "../components/comment";
import CookieConsent from "../components/cookieConsent";
import Footer from "../components/footer";
import styles from "../styles/post.module.scss";

export async function generateMetadata({ params }) {
  try {
    const post = await getPost(params.slug);

    return {
      title: `${post.title} - Saan's Guidebook`,
      description: `An article by ${post.title} - Saan's Guidebook`,
      alternates: {
        canonical: `/${post.slug}`,
      },
    };
  } catch (error) {
    return {
      title: "Not Found - Saan's Guidebook",
      description: "The page you are looking for does not exist.",
    };
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  if (!posts || !posts.results || !Array.isArray(posts.results)) {
    return [];
  }

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
        <article key={post.id}>
          <header>
            <ModifyPublication slug={post.slug} />
            <h1 className={styles.post_containerTitle}>{post.title}</h1>
          </header>
          <Image
            src={post.banner}
            className={styles.post_containerImage}
            width={800}
            height={500}
            alt="Picture of the post"
          />
          <span className={styles.post_container_details}>
            <p className={styles.post_container_detailsAuthor}>{post.author}</p>
            <p className={styles.post_container_detailsDate}>{moment(post.createdAt).format("MMM DD, YYYY")}</p>
          </span>
          <div className={styles.post_container_description} dangerouslySetInnerHTML={{ __html: post.description }}></div>
          <Comments slug={params.slug} />
        </article>
      </main>
      <CookieConsent />
      <Footer />
    </div>
  );
};

export default Post;
