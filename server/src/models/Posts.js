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
  comments: [
    {
      idComment: String,
      username: String,
      comment: String,
      likes: {
        type: [String],
        default: []
      },
      dislikes: {
        type: [String],
        default: []
      },
      createdAt: Date,
      replies: [
        {
          idReply: String,
          username: String,
          replyText: String,
          likes: {
            type: [String],
            default: []
          },
          dislikes: {
            type: [String],
            default: []
          },
          createdAt: Date,
        },
      ],
    },
  ],
});

const Posts = mongoose.model("Posts", PostsSchema);

export default Posts;
