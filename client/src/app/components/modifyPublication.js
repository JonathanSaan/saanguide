"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useContext, useState, useRef } from "react";

import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";

import deletePublication from "../api/deletePublication";
import { UserContext } from "../UserContext";
import ModalDelete from "./modalDelete";

import styles from "../styles/modifyPublication.module.scss";
import stylesBackground from "../styles/header.module.scss";

const ModifyPublication = ({ slug }) => {
  const router = useRouter();
  const { isAdmin } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [publicationToDelete, setPublicationToDelete] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const menuRef = useRef(null);

  const handleRemoveBackgroundClick = () => {
    document.body.style.overflow = "auto";
    setShowBackground(false);
    setPublicationToDelete(false);
  };

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDeletePublication = () => {
    document.body.style.overflow = "hidden";
    setIsMenuOpen(false);
    setShowBackground(true);
    setPublicationToDelete(slug);
  };
  const handleConfirmDeletePublication = async () => {
    document.body.style.overflow = "auto";
    setLoading(true);
    await deletePublication(slug);
    handleRemoveBackgroundClick();
    setLoading(false);
    router.push("/");
  };
  
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  document.addEventListener("click", handleClickOutside);
  return (
    <>
      {isAdmin ? (
        <>
          {showBackground && <div className={stylesBackground.background} onClick={handleRemoveBackgroundClick}></div>}
          <div className={styles.container} ref={menuRef}>
            <button className={styles.containerMenuicon} onClick={handleButtonClick} >
              <div className={styles.containerMenuiconDot}></div>
              <div className={styles.containerMenuiconDot}></div>
              <div className={styles.containerMenuiconDot}></div>
            </button>
            {isMenuOpen && (
              <div className={styles.container_menu}>
                <Link className={styles.container_menuButton} href={`/update?slug=${slug}`}>
                  <BsPencilSquare size={20} /> 
                  <span>Edit publication</span>
                </Link>
                <button className={styles.container_menuButton} onClick={handleDeletePublication}>
                  <BsFillTrashFill size={20} /> 
                  <span>Delete publication</span>
                </button>
              </div>
            )}
            <ModalDelete
              isOpen={publicationToDelete === slug}
              onCancel={handleRemoveBackgroundClick}
              onConfirm={handleConfirmDeletePublication}
              loading={loading}
            >
              Are you sure you want to delete this publication?
            </ModalDelete>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ModifyPublication;
