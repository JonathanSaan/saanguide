import { Router } from "express";

import { create, findAll, findBySlug, update, erase, getAllCommentsBySlug, addComment, deleteComment } from "../controllers/posts.controller.js";
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
router.patch("/post/comment/:slug/:idComment", authMiddleware, deleteComment);

export default router;
