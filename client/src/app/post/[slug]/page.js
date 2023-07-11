import Header from "../../components/header";
import Footer from "../../components/footer";

import styles from "../../styles/post.module.scss";

const Post = () => {
  return (
    <div className={styles.post}>
      <Header />
      <main className={styles.post_container}>
        <h1>title</h1>
      </main>
      <Footer />
    </div>
  );
};

export default Post;
