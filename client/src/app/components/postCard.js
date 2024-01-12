import Link from "next/link";
import Image from "next/image";

import moment from "moment";

import ModifyPublication from "./modifyPublication";
import styles from "../styles/home.module.scss";

const PostCard = ({ post }) => {
  return (
    <article className={styles.home_container_card}>
      <header>
        <ModifyPublication slug={post.slug} />
        <h2>
          <Link href={`/${post.slug}`} className={styles.home_container_cardTitle}>
            {post.title}
          </Link>
        </h2>
      </header>
      <Link href={`/${post.slug}`} className={styles.home_container_cardImage}>
        <Image
          src={post.banner}
          className={styles.home_container_cardImage}
          width={800}
          height={500}
          alt="Picture of the post"
        />
      </Link>
      <span className={styles.home_container_card_details}>
        <span className={styles.home_container_card_detailsAuthor}>{post.author}</span>
        <span className={styles.home_container_card_detailsDate}>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
      </span>
      <Link href={`/${post.slug}`} className={styles.home_container_cardDescription}>
        <p>Read more...</p>
      </Link>
    </article>
  );
};

export default PostCard;
