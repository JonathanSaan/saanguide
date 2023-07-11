import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  paragraph: {
    type: String,
  },
  banner: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: Array,
    require: true,
  },
  comments: {
    type: Array,
    require: true,
  },
});

const News = mongoose.model("News", NewsSchema);

export default News;
