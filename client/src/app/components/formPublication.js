"use client";

import Image from "next/image";
import { useRef } from "react";

import JoditEditor from "jodit-react";
import FileBase64 from "react-file-base64";

import styles from "../styles/publish_edit.module.scss";

const formPublication = ({ handleSubmit, title, handleTitleChange, handleCoverPhotoBase64Change, coverPhoto, setCoverPhoto, description, handleDescriptionUpdate }) => {
  const editor = useRef(null);
  
  const config = {
    readonly: false,
    height: 400
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
                <button
                  className={styles.publish_edit_container_previewButton}
                  onClick={() => setCoverPhoto("")}
                >
                  Delete Image
                </button>
              </div>
            )}
          </div>
          <JoditEditor
            ref={editor}
            value={description}
            config={config}
            tabIndex={1}
            onBlur={handleDescriptionUpdate}
            onChange={newContent => {}}
          />
          <button className={styles.publish_edit_containerButton} disabled={!title || !coverPhoto || !description}>Update</button>
        </form>
  );
};

export default formPublication;
