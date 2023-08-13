import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  slug: {
    type: String,
  },
  author: {
    type: String,
  },
  banner: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: Array,
    require: true,
  },
});

const Posts = mongoose.model("Posts", PostsSchema);

export default Posts;
