import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  slug: {
    type: String,
  },
  warn: {
    type: String,
  },
  text: [
    {
      subtitle: {
        type: String,
      },
      paragraph: {
        type: String,
      },
    },
  ],
  banner: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  comments: {
    type: Array,
    require: true,
  },
});

const Posts = mongoose.model("Posts", PostsSchema);

export default Posts;
