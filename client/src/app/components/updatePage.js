"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";

import getPost from "../api/getPost";
import updatePublication from "../api/updatePublication";
import { UserContext } from "../UserContext";
import Header from "../components/header";
import FormPublication from "../components/formPublication";
import Footer from "../components/footer";
import styles from "../styles/publish_edit.module.scss";

const UpdatePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slugUrl = searchParams.get("slug");
  const { isLoggedIn, isAdmin } = useContext(UserContext);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPost(slugUrl);
      
      if (response) {
        setTitle(response.title);
        setCoverPhoto(response.banner);
        setDescription(response.description);
      }
    };
  
    fetchPost();
  }, [slugUrl]);
  
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
    const response = await updatePublication({
      title: title,
      slug: slugUrl,
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
          <h1 className={styles.publish_edit_containerTitle}>Edit publication</h1>
          <FormPublication
            handleSubmit={handleSubmit}
            title={title}
            handleTitleChange={handleTitleChange}
            handleCoverPhotoBase64Change={handleCoverPhotoBase64Change}
            coverPhoto={coverPhoto}
            setCoverPhoto={setCoverPhoto}
            description={description}
            handleDescriptionUpdate={handleDescriptionUpdate}
            label="Update"
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

export default UpdatePage;