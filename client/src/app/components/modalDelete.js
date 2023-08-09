"use client";

import styles from "../styles/modal.module.scss";

const ModalDelete = ({ isOpen, onCancel, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {isOpen && <div className={styles.background} onClick={onCancel}></div>}
      
      <dialog open className={styles.modal}>
        <h1 className={styles.modalTitle}>{children}</h1>
        <span className={styles.modal_buttons}>
          <button className={styles.modalButton} onClick={onCancel}>Cancel</button>
          <button className={`${styles.modalButton} ${styles.delete}`} onClick={onConfirm}>Delete</button>
        </span>
      </dialog>
    </>
  );
};

export default ModalDelete;
