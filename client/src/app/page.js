"use client";

import { useState, useEffect } from "react";

import getAllPosts from "./api/getAllPosts";
import Header from "./components/header";
import CookieConsent from "./components/cookieConsent";
import PostCard from "./components/postCard";
import Footer from "./components/footer";
import styles from "./styles/home.module.scss";

const Home = () => {
  const [posts, setPosts] = useState();

  const fetchPosts = async () => {
    const postsData = await getAllPosts();
    
    if(postsData) {
      setPosts(postsData.results);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  return (
    <div className={styles.home}>
      <Header />
      <main className={styles.home_container}>
        {posts ? (
          <>
            {posts && posts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </>
        ) : (
          <div className={styles.home_containerNofound}>
            <p>No posts found.</p>
          </div>
        )}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};
                
export default Home;
