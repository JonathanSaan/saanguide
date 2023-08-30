"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import postPublication from "../api/postPublication";
import { UserContext } from "../UserContext";
import Header from "../components/header";
import FormPublication from "../components/formPublication";
import Footer from "../components/footer";
import styles from "../styles/publish_edit.module.scss";

const PublishPage = () => {
  const router = useRouter();
  const { isLoggedIn, isAdmin } = useContext(UserContext);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [description, setDescription] = useState("");
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleCoverPhotoBase64Change = ({ base64 }) => {
    setCoverPhoto(base64);
  };
  const handleDescriptionUpdate = (event) => {
    setDescription(event);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    document.body.style.cursor = "wait";
    const response = await postPublication({
      title: title,
      author: isLoggedIn.username,
      description: description,
      banner: coverPhoto
    });

    if (response.error) {
      document.body.style.cursor = "default";
      return setError(response.message);
    }

    document.body.style.cursor = "default";
    setError("");
    router.push("/");
  };
  
  return (
    <div className={styles.publish_edit}>
      <Header />
      {isAdmin ? (
        <main className={styles.publish_edit_container}>
          {error && (
            <p className={styles.publish_edit_containerErrorMessage}>
              {error}
            </p>
          )}
          <h1 className={styles.publish_edit_containerTitle}>Publish publication</h1>
          <FormPublication
            handleSubmit={handleSubmit}
            title={title}
            handleTitleChange={handleTitleChange}
            handleCoverPhotoBase64Change={handleCoverPhotoBase64Change}
            coverPhoto={coverPhoto}
            setCoverPhoto={setCoverPhoto}
            description={description}
            handleDescriptionUpdate={handleDescriptionUpdate}
            label="Publish"
          />
        </main>
       ) : (
        <div className={styles.AccessDenied}>
          <h1 className={styles.AccessDeniedTitle}>Access denied!</h1>
          <h2 className={styles.AccessDeniedSubtitle}>You do not have permission to access this page.</h2>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PublishPage;