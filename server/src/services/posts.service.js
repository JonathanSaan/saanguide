import Posts from "../models/Posts.js";

export const createService = (body) => Posts.create(body);

export const findAllService = () => Posts.find();

export const findBySlugService = (slug) => Posts.findOne({ slug });

export const updateService = (id, title, text, banner) =>
  Posts.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    {
      rawResult: true,
    }
  );

export const eraseService = (id) => Posts.findByIdAndDelete({ _id: id });

export const addCommentService = (slug, comment, username) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);

  return Posts.findOneAndUpdate(
    { slug: slug },
    {
      $push: {
        comments: { idComment, username, comment, createdAt: new Date() },
      },
    }
  );
};
  
export const deleteCommentService = (slug, idComment, username, isAdmin) => {
  const filter = { slug: slug };
  
  if (!isAdmin) {
    filter['comments.idComment'] = idComment;
    filter['comments.username'] = username;
  }
  
  return Posts.findOneAndUpdate(
    filter,
    { $pull: { comments: { idComment: idComment } } }
  );
};
