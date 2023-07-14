import { Router } from "express";

import { create, findAll, findBySlug } from "../controllers/posts.controller.js";

const router = Router();

router.post("/addPost", create);
router.get("/posts", findAll);
router.get("/post/:slug", findBySlug);

export default router;
