import { Router } from "express";

import {
  create,
  findAll,
  findBySlug,
  update,
  erase,
  getAllCommentsBySlug,
  addComment,
  addLikeToComment,
  addDislikeToComment,
  deleteComment,
  addReply,
  addLikeToReply,
  addDislikeToReply,
  deleteReply,
} from "../controllers/posts.controller.js";
import authMiddleware from "../middlewares/auth.middlewares.js";
import adminMiddleware from "../middlewares/isAdmin.middlewares.js";

const router = Router();

router.post("/publish", authMiddleware, adminMiddleware, create);
router.get("/posts", findAll);
router.get("/post/:slug", findBySlug);
router.get("/post/comments/:slug", getAllCommentsBySlug);
router.patch("/post/:slug", authMiddleware, adminMiddleware, update);
router.delete("/post/:slug", authMiddleware, adminMiddleware, erase);
router.patch("/post/comment/:slug", authMiddleware, addComment);
router.put("/post/comment/:slug/:idComment/like", authMiddleware, addLikeToComment);
router.put("/post/comment/:slug/:idComment/dislike", authMiddleware, addDislikeToComment);
router.patch("/post/comment/:slug/:idComment", authMiddleware, deleteComment);
router.patch("/post/comment/:slug/:idComment/reply", authMiddleware, addReply);
router.put("/post/comment/:slug/:idComment/:idReply/like", authMiddleware, addLikeToReply);
router.put("/post/comment/:slug/:idComment/:idReply/dislike", authMiddleware, addDislikeToReply);
router.patch("/post/comment/:slug/:idComment/:idReply", authMiddleware, deleteReply);

export default router;
