"use client";

import { useContext, useEffect, useState, useCallback } from "react";

import { BsFillTrashFill } from "react-icons/bs";
import { BiLike, BiDislike } from "react-icons/bi";
import ClipLoader from "react-spinners/ClipLoader";

import postComment from "../api/postComment";
import postReply from "../api/postReply";
import postLike from "../api/postLike";
import postLikeReply from "../api/postLikeReply";
import postDislike from "../api/postDislike";
import postDislikeReply from "../api/postDislikeReply";
import getAllComments from "../api/getAllComments";
import deleteComment from "../api/deleteComment";
import deleteReply from "../api/deleteReply";
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
  const [isLoading, setIsLoading] = useState(true);
  const [allComments, setAllComments] = useState([]);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const [commentToDelete, setCommentToDelete] = useState(false);
  const [replyToDelete, setReplyToDelete] = useState(false);
  
  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    const comments = await getAllComments(slug);
    setAllComments(comments);
    setIsLoading(false);
  }, [slug]);
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);
  
  const handleOpenReply = (comment) => {
    if(!isLoggedIn) {
      return handleFormClick("login");
    }

    setShowReplyInput(prevState => ({ ...prevState, [comment.idComment]: !prevState[comment.idComment] }));
  };

  const handleLikeClick = async (slug, idComment) => {
    if(!isLoggedIn) {
      return handleFormClick("login");
    }

    await postLike(slug, idComment);
    fetchComments();
  };
  const handleDislikeClick = async (slug, idComment) => {
    if(!isLoggedIn) {
      return handleFormClick("login");
    }

    await postDislike(slug, idComment);
    fetchComments();
  };

  const handleLikeReplyClick = async (slug, idComment, idReply) => {
    if(!isLoggedIn) {
      return handleFormClick("login");
    }

    await postLikeReply(slug, idComment, idReply);
    fetchComments();
  };
  const handleDislikeReplyClick = async (slug, idComment, idReply) => {
    if(!isLoggedIn) {
      return handleFormClick("login");
    }

    await postDislikeReply(slug, idComment, idReply);
    fetchComments();
  };
  
  const handleDeleteComment = (idComment) => {
    document.body.style.overflow = "hidden";
    setCommentToDelete(idComment);
  };
  const handleDeleteReply = (idReply) => {
    document.body.style.overflow = "hidden";
    setReplyToDelete(idReply);
  };

  const handleConfirmDeleteComment = async (idComment) => {
    document.body.style.overflow = "auto";
    document.body.style.cursor = "wait";
    await deleteComment({ slug, idComment });
    setAllComments((prevComments) => prevComments.filter((comment) => comment.idComment !== idComment));
    setCommentToDelete(false);
    document.body.style.cursor = "default";
  };
  const handleConfirmDeleteReply = async (idComment, idReply) => {
    document.body.style.overflow = "auto";
    document.body.style.cursor = "wait";
    await deleteReply({ slug, idComment, idReply });
    setAllComments((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        const updatedReplies = comment.replies.filter((reply) => reply.idReply !== idReply);
        return { ...comment, replies: updatedReplies };
      });
    
      return updatedComments;
    });
    setReplyToDelete(false);
    document.body.style.cursor = "default";
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
    setReplyToDelete(false);
  };

  return (
    <div className={styles.post_container_comments}>
      <header className={styles.post_container_commentsHeader}>
        <label className={styles.post_container_commentsAccountant}>
          Comments ({allComments.length + allComments.reduce((total, comment) => total + (comment.replies ? comment.replies.length : 0), 0)})
        </label>
      </header>
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

      {isLoading ? (
        <div className={styles.post_container_comments_loading}>
          <ClipLoader color="#fafaf9" size={30} />
        </div>
      ) : (
        <>
          {allComments && allComments.map((comment) => {
            const createdAt = new Date(comment.createdAt);
            const today = new Date();
            const differenceInTime = today.getTime() - createdAt.getTime();
            const time = commentPostedTime(differenceInTime);
            
            const isOwner = isLoggedIn && isLoggedIn.username === comment.username || isAdmin;
            const userLiked = isLoggedIn && comment.likes.includes(isLoggedIn.username);
            const userDisliked = isLoggedIn && comment.dislikes.includes(isLoggedIn.username);

            return (
              <div className={styles.post_container_comments_comment} key={comment.idComment}>
                <header className={styles.post_container_comments_commentHeader}>
                  <h4 className={styles.post_container_comments_commentUsername}>{comment.username}</h4>
                  <h5 className={styles.post_container_comments_commentTime}>{time}</h5>
                  {isOwner && (
                    <>
                      <button className={styles.post_container_comments_commentDelete} onClick={(event) => handleDeleteComment(comment.idComment, event)}>
                        <BsFillTrashFill size={20} />
                      </button>
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
                <div className={styles.post_container_comments_commentActions}>
                  <button onClick={() => handleLikeClick(slug, comment.idComment)} className={`${styles.post_container_comments_commentActionsButton} ${userLiked ? styles.blue : ""}`}>
                    <BiLike size={23} />
                  </button>
                  <label className={styles.post_container_comments_commentActionsLabel}>{comment.likes.length}</label>
                  <button onClick={() => handleDislikeClick(slug, comment.idComment)} className={`${styles.post_container_comments_commentActionsButton} ${userDisliked ? styles.blue : ""}`}>
                    <BiDislike size={23} />
                  </button>
                  <label className={styles.post_container_comments_commentActionsLabel}>{comment.dislikes.length}</label>
                  <button 
                    className={styles.post_container_comments_commentActionsReply}
                    onClick={() => handleOpenReply(comment)}
                  >
                    Reply
                  </button>
                </div>

                {comment.replies && comment.replies.map((reply) => {
                  const createdAt = new Date(reply.createdAt);
                  const now = new Date();
                  const differenceInTime = now.getTime() - createdAt.getTime();
                  const time = commentPostedTime(differenceInTime);

                  const isOwner = isLoggedIn && isLoggedIn.username === reply.username || isAdmin;
                  const userLiked = isLoggedIn && reply.likes.includes(isLoggedIn.username);
                  const userDisliked = isLoggedIn && reply.dislikes.includes(isLoggedIn.username);

                  return (
                    <div className={styles.post_container_comments_comment_reply} key={reply.idReply}>
                      <header className={styles.post_container_comments_comment_replyHeader}>
                        <h4 className={styles.post_container_comments_comment_replyUsername}>{reply.username}</h4>
                        <h5 className={styles.post_container_comments_comment_replyTime}>{time}</h5>
                        {isOwner && (
                          <>
                            <button className={styles.post_container_comments_comment_replyDelete} onClick={(event) => handleDeleteReply(reply.idReply, event)}>
                              <BsFillTrashFill size={20} />
                            </button>
                            <ModalDelete
                              isOpen={replyToDelete === reply.idReply}
                              onCancel={handleRemoveBackgroundClick}
                              onConfirm={() => handleConfirmDeleteReply(comment.idComment, reply.idReply)}
                            >
                              Are you sure you want to delete this reply?
                            </ModalDelete>
                          </>
                        )}
                      </header>
                      <span>
                        <p className={styles.post_container_comments_comment_replyByUser}>{reply.replyText}</p>
                      </span>
                      <div className={styles.post_container_comments_comment_replyActions}>
                        <button onClick={() => handleLikeReplyClick(slug, comment.idComment, reply.idReply)} className={`${styles.post_container_comments_comment_replyActionsButton} ${userLiked ? styles.blue : ""}`}>
                          <BiLike size={23} />
                        </button>
                        <label className={styles.post_container_comments_comment_replyActionsLabel}>{reply.likes.length}</label>
                        <button onClick={() => handleDislikeReplyClick(slug, comment.idComment, reply.idReply)} className={`${styles.post_container_comments_comment_replyActionsButton} ${userDisliked ? styles.blue : ""}`}>
                          <BiDislike size={23} />
                        </button>
                        <label className={styles.post_container_comments_comment_replyActionsLabel}>{reply.dislikes.length}</label>
                        <button 
                          className={styles.post_container_comments_comment_replyActionsReplay}
                          onClick={() => handleOpenReply(comment)}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                )}

                {showReplyInput[comment.idComment] && isLoggedIn && (
                  <AddReply slug={slug} idComment={comment.idComment} fetchComments={fetchComments} />
                )}
              </div>
            );
          })}
        </>
      )}
      
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

    document.body.style.cursor = "wait";
    await postComment({ slug, comment: commentText });
    setCommentText("");
    fetchComments();
    document.body.style.cursor = "default";
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
const AddReply = ({ slug, idComment, fetchComments }) => {
  const [replyText, setReplyText] = useState("");
  
  const handleReplySubmit = async (event) => {
    event.preventDefault();

    if (replyText.trim() === "") {
      return;
    }

    document.body.style.cursor = "wait";
    await postReply({ slug, idComment, replyText });
    setReplyText("");
    fetchComments();
    document.body.style.cursor = "default";
  };
  
  return (
    <form className={styles.post_container_comments_replycomment} onSubmit={handleReplySubmit}>
      <textarea
        className={styles.post_container_comments_replycommentTextarea}
        placeholder="Add a comment..."
        onChange={(event) => setReplyText(event.target.value)}
        value={replyText}
      />
      <button 
        className={styles.post_container_comments_replycommentButton} 
        type="submit" 
      >
        Reply
      </button>
    </form>
  );
};

export default Comments;
