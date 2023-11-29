"use client";

import Image from "next/image";
import { useRef } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FileBase64 from "react-file-base64";
import { CircularProgress } from "react-cssfx-loading";

import styles from "../styles/publish_edit.module.scss";

const formPublication = ({ handleSubmit, title, handleTitleChange, handleCoverPhotoBase64Change, coverPhoto, setCoverPhoto, description, handleDescriptionUpdate, loading, label }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ color: [] }],
      ["clean"],
    ],
  };
  
  return (
    <form action="" onSubmit={handleSubmit}>
      <input className={styles.publish_edit_containerInput} placeholder="Post title" value={title} onChange={handleTitleChange} required />
      <div className={styles.publish_edit_containerInput_image}>
        <label>Upload cover photo</label>
        <FileBase64 type="file" accept="image/jpeg, image/png, image/jpg" multiple={false} onDone={handleCoverPhotoBase64Change} />
        {coverPhoto && (
          <div className={styles.publish_edit_container_preview}>
            <Image
              className={styles.publish_edit_container_previewImage}
              src={coverPhoto}
              width={600}
              height={500}
              alt="Picture of the post"
            />
            <button className={styles.publish_edit_container_previewButton} onClick={() => setCoverPhoto("")}>
              Delete Image
            </button>
          </div>
        )}
      </div>
      <ReactQuill
        value={description}
        theme="snow"
        onChange={handleDescriptionUpdate}
        modules={modules} 
      />
      <button className={styles.publish_edit_containerButton} disabled={loading}>
        {loading ? <CircularProgress color={"#fafaf9"} height="2em" width="2em" /> : label}
      </button>
    </form>
  );
};

export default formPublication;
