import { Router } from "express";

import { findAll } from "../controllers/posts.controller.js";

const router = Router();

router.get("/posts", findAll);

export default router;
