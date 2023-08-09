"use client";

import { useContext, useState, useRef } from "react";

import JoditEditor from "jodit-react";
import FileBase64 from "react-file-base64";

import postPublication from "../api/postPublication";
import { UserContext } from "../UserContext";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/publish.module.scss";

const Publish = () => {
  const { isLoggedIn } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTIyV5p5nWeJRMvbEtcnSE_-AvSH0KeztqKRObmMEXFL90E1xti");
  const [description, setDescription] = useState("");
  const editor = useRef(null);
  
  if (!isLoggedIn) {
    return (
      <div className={styles.publish}>
        <Header />
        <div className={styles.AccessDenied}>
          <h1 className={styles.AccessDeniedTitle}>Access denied!</h1>
          <h2 className={styles.AccessDeniedSubtitle}>You do not have permission to access this page.</h2>
        </div>
        <Footer />
      </div>
    )
  }
  
  const config = {
    readonly: false,
    height: 400
  };
  
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
    
    const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
    
    await postPublication({
      title: title,
      slug: slug,
      author: isLoggedIn,
      description: description,
      banner: coverPhoto
    });
    
    setTitle("");
    setCoverPhoto("");
    setDescription("");
    editor.current.value = "";
  };
  
  return (
    <div className={styles.publish}>
      <Header />
        <main className={styles.publish_container}>
          <h1 className={styles.publish_containerTitle}>Publish publication</h1>
          <form action="" onSubmit={handleSubmit}>
            <input className={styles.publish_containerInput} placeholder="Post title" value={title} onChange={handleTitleChange} required />
            <div className={styles.publish_containerInput_image}>
              <label>Upload cover photo</label>
              <FileBase64 multiple={false} onDone={handleCoverPhotoBase64Change} />
            </div>
            <JoditEditor
			  ref={editor}
			  value={description}
			  config={config}
			  tabIndex={1}
			  onBlur={handleDescriptionUpdate}
			  onChange={newContent => {}}
		    />
		    <button className={styles.publish_containerButton} disabled={!title || !description}>Publish</button>
		  </form>
        </main>
      <Footer />
    </div>
  );
};

export default Publish;
