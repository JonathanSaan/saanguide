import Posts from "../models/Posts.js";
import client from "../helpers/redis.js";

export const createService = (body) => Posts.create(body);

export const findAllService = async () => {
  const cachedPosts = await client.get("all_posts");
  
  if (cachedPosts) {
    return JSON.parse(cachedPosts);
  }
  
  const posts = await Posts.find().exec();

  if (!posts) return null;

  const recentPosts = posts.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const postsDetails = {
    results: recentPosts.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      author: item.author,
      banner: item.banner,
      createdAt: item.createdAt,
    })),
  };
  
  await client.set("all_posts", 3600, JSON.stringify(postsDetails));
  
  return postsDetails;
};

export const findBySlugService = async (slug) => {
  const cachedPost = await client.get(slug);
  
  if (cachedPost) {
    return JSON.parse(cachedPost);
  }
  
  const post = await Posts.findOne({ slug });
  
  if (!post) return null;
  
  await client.set(slug, 3600, JSON.stringify(post));
  
  return post;
}

export const updateService = (oldSlug, newSlug, title, banner, description) =>
  Posts.findOneAndUpdate(
    { slug: oldSlug },
    { slug: newSlug, title, banner, description },
    {
      rawResult: true,
    }
  );

export const eraseService = (slug) => Posts.findOneAndDelete({ slug: slug });

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

export const addLikeToCommentService = async (slug, idComment, username) => {
  const post = await Posts.findOne({ slug });
  const comment = post.comments.find(c => c.idComment === idComment);

  const userIndex = comment.likes.indexOf(username);
  const userDislikeIndex = comment.dislikes.indexOf(username);

  userIndex === -1 ? comment.likes.push(username) : comment.likes.splice(userIndex, 1);
  
  if (userDislikeIndex !== -1) {
    comment.dislikes.splice(userDislikeIndex, 1);
  }

  await post.save();
  return comment;
};
export const addDislikeToCommentService = async (slug, idComment, username) => {
  const post = await Posts.findOne({ slug });
  const comment = post.comments.find(c => c.idComment === idComment);

  const userIndex = comment.dislikes.indexOf(username);
  const userDislikeIndex = comment.likes.indexOf(username);

  userIndex === -1 ? comment.dislikes.push(username) : comment.dislikes.splice(userIndex, 1);
  
  if (userDislikeIndex !== -1) {
    comment.likes.splice(userDislikeIndex, 1);
  }

  await post.save();
  return comment;
};

export const addLikeToReplyService = async (slug, idComment, idReply, username) => {
  const post = await Posts.findOne({ slug });
  const comment = post.comments.find(c => c.idComment === idComment);

  const reply = comment.replies.find(r => r.idReply === idReply);

  const userIndex = reply.likes.indexOf(username);
  const userDislikeIndex = reply.dislikes.indexOf(username);

  userIndex === -1 ? reply.likes.push(username) : reply.likes.splice(userIndex, 1);

  if (userDislikeIndex !== -1) {
    reply.dislikes.splice(userDislikeIndex, 1);
  }

  await post.save();
  return reply;
};
export const addDislikeToReplyService = async (slug, idComment, idReply, username) => {
  const post = await Posts.findOne({ slug });
  const comment = post.comments.find(c => c.idComment === idComment);

  const reply = comment.replies.find(r => r.idReply === idReply);

  const userIndex = reply.dislikes.indexOf(username);
  const userLikeIndex = reply.likes.indexOf(username);

  userIndex === -1 ? reply.dislikes.push(username) : reply.dislikes.splice(userIndex, 1);
  
  if (userLikeIndex !== -1) {
    reply.likes.splice(userLikeIndex, 1);
  }

  await post.save();
  return reply;
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

export const addReplyService = async (slug, idComment, replyText, username) => {
  const idReply = Math.floor(Date.now() * Math.random()).toString(36);

  const update = {
    $push: {
      'comments.$[comment].replies': {
        idReply,
        username,
        replyText,
        createdAt: new Date(),
      },
    },
  };

  const options = {
    arrayFilters: [{ 'comment.idComment': idComment }],
  };

  return Posts.findOneAndUpdate(
    { slug },
    update,
    options
  );
};

export const deleteReplyService = async (slug, idComment, idReply, username) => {
  const update = {
    $pull: {
      'comments.$[comment].replies': { idReply: idReply, username: username },
    },
  };

  const options = {
    arrayFilters: [
      { 'comment.idComment': idComment },
    ],
  };

  return Posts.findOneAndUpdate(
    { slug },
    update,
    options
  );
};
