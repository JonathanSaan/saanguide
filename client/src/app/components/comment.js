"use client";

import { useContext, useEffect, useState, useCallback } from "react";

import postComment from "../api/postComment";
import getAllComments from "../api/getAllComments";
import deleteComment from "../api/deleteComment";
import ModalDelete from "./modalDelete";
import Login from "./login";
import Register from "./register";
import commentPostedTime from "../utils/commentPostedTime";
import { UserContext } from "../UserContext";
import styles from "../styles/post.module.scss";
import stylesBackground from "../styles/header.module.scss";

const Comments = ({ slug }) => {
  const { isLoggedIn, isAdmin } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [commentToDelete, setCommentToDelete] = useState(false);
  
  const fetchComments = useCallback(async () => {
    const comments = await getAllComments(slug);
    setAllComments(comments);
  }, [slug]);
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);
  
  const handleDeleteComment = (idComment) => {
    document.body.style.overflow = "hidden";
    setCommentToDelete(idComment);
  };

  const handleConfirmDeleteComment = async (idComment) => {
    document.body.style.overflow = "auto";
    await deleteComment({ slug, idComment });
    setAllComments((prevComments) =>
      prevComments.filter((comment) => comment.idComment !== idComment)
    );
    setCommentToDelete(false);
  };

  const handleFormClick = (type) => {
    document.body.style.overflow = "hidden";
    setShowBackground(true);
    
    if (type === "login") {
      setShowLogin(!showLogin);
      setShowRegister(false);
    }

    if (type === "register") {
      setShowRegister(!showRegister);
      setShowLogin(false);
    }
  };

  const handleRemoveBackgroundClick = () => {
    document.body.style.overflow = "auto";
    setShowBackground(false);
    setShowLogin(false);
    setShowRegister(false);
    setCommentToDelete(false);
  };

  return (
    <div className={styles.post_container_comments}>
      {isLoggedIn ? (
        <AddComment slug={slug} fetchComments={fetchComments} />
      ) : (
        <>
          <h3 className={styles.post_container_commentsNotLoggedInMessage}>
            You need to <span className={styles.post_container_commentsNotLoggedInMessageColor} onClick={() => handleFormClick("login")}>
              Sign in
            </span>{" "}
            to post a comment.
          </h3>

          {showBackground && (
            <div
              className={stylesBackground.background}
              onClick={handleRemoveBackgroundClick}
            ></div>
          )}
          {showLogin && (
            <Login
              handleFormClick={handleFormClick}
              handleRemoveBackgroundClick={handleRemoveBackgroundClick}
            />
          )}
          {showRegister && (
            <Register
              handleFormClick={handleFormClick} 
              handleRemoveBackgroundClick={handleRemoveBackgroundClick} 
            />
          )}
        </>
      )}

      {allComments && allComments.map((comment) => {
        const createdAt = new Date(comment.createdAt);
        const today = new Date();
        const differenceInTime = today.getTime() - createdAt.getTime();
        const time = commentPostedTime(differenceInTime);
        
        const isOwner = isLoggedIn && isLoggedIn.username === comment.username || isAdmin;
        
        return (
          <div className={styles.post_container_comments_comment} key={comment.idComment}>
            <header className={styles.post_container_comments_commentHeader}>
              <h4 className={styles.post_container_comments_commentUsername}>{comment.username}</h4>
              <h5 className={styles.post_container_comments_commentTime}>{time}</h5>
              {isOwner && (
                <>
                  <button className={styles.post_container_comments_commentDelete} onClick={(event) => handleDeleteComment(comment.idComment, event)}>Delete</button>
                  <ModalDelete
                    isOpen={commentToDelete === comment.idComment}
                    onCancel={handleRemoveBackgroundClick}
                    onConfirm={() => handleConfirmDeleteComment(comment.idComment)}
                  >
                    Are you sure you want to delete this comment?
                  </ModalDelete>
                </>
              )}
            </header>
            <span>
              <p className={styles.post_container_comments_commentByUser}>{comment.comment}</p>
            </span>
          </div>
        );
      })}
    </div>
  );
};

const AddComment = ({ slug, fetchComments }) => {
  const [commentText, setCommentText] = useState("");
  
  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (commentText.trim() === "") {
      return;
    }
    
    await postComment({ slug, comment: commentText });
    setCommentText("");
    fetchComments();
  };
  
  return (
    <form className={styles.post_container_comments_addcomment} onSubmit={handleCommentSubmit}>
      <textarea
        className={styles.post_container_comments_addcommentTextarea}
        placeholder="Add a comment..."
        onChange={(event) => setCommentText(event.target.value)}
        value={commentText}
       />
      <button 
        className={styles.post_container_comments_addcommentButton} 
        type="submit" 
      >
        Comment
      </button>
    </form>
  );
};

export default Comments;
