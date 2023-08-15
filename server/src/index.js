import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDatabase from "./database/db.js";
import postsRouter from "./routes/posts.route.js"
import authRoute from "./routes/auth.route.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

connectDatabase();

app.use(cors({ 
  origin: "*",
  credentials: true
}));
/*app.use(cors({ 
  origin: process.env.SERVER_FRONT_URL,
  credentials: true
}));*/

app.use(express.json());
app.use("/", postsRouter);
app.use("/auth", authRoute);

app.listen(port, () => console.log("working server"));
