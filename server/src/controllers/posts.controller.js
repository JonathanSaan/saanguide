import { createService, findAllService, findBySlugService, updateService, eraseService, addCommentService, addLikeToCommentService, addDislikeToCommentService, deleteCommentService, addReplyService, deleteReplyService, addLikeToReplyService, addDislikeToReplyService } from "../services/posts.service.js";

export const create = async (req, res) => {
  try {
    const { title, author, banner, description } = req.body;
    const isAdmin = req.isAdmin;
    const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '').trim();

    if (!title || !author || !banner || !description) {
      return res.status(400).send({ message: "Submit all fields for registration" });
    }

    if (!isAdmin) {
      return res.status(400).send({ message: "You don't have permission to create the post." });
    }

    const existingPost = await findBySlugService(slug);
    if (existingPost) {
      return res.status(409).send({ message: "Post with this title already exists." });
    }

    await createService({
      title,
      slug,
      author,
      banner,
      description,
    });

    res.status(201).send({ message: "post created" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const posts = await findAllService();

    if (!posts) {
      return res.status(400).send({ message: "There are no registered posts" });
    }
    
    res.send(posts);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await findBySlugService(slug);

    if (!post) {
      return res.status(404).send({ message: "Post not found." });
    }

    return res.send(post);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { title, banner, description } = req.body;
    const { slug } = req.params;
    const isAdmin = req.isAdmin;

    if (!title && !banner && !description) {
      res.status(400).send({ message: "Submit at least one field to update the post" });
    }

    const post = await findBySlugService(slug);
    
    if (!post) {
      return res.status(404).send({ message: "Post not found." });
    }
    
    if (!isAdmin) {
      return res.status(400).send({ message: "You didn't update this post" });
    }
    
    const newSlug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '').trim();

    const existingPost = await findBySlugService(newSlug);
    if (existingPost) {
      return res.status(409).send({ message: "Post with this title already exists." });
    }

    await updateService(slug, newSlug, title, banner, description);

    return res.send({ message: "Post updated successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const erase = async (req, res) => {
  try {
    const { slug } = req.params;
    const isAdmin = req.isAdmin;

    const post = await findBySlugService(slug);

    if (!post) {
      return res.status(404).send({ message: "Post not found." });
    }

    if (!isAdmin) {
      return res.status(400).send({ message: "You didn't delete this post" });
    }

    await eraseService(slug);

    return res.send({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getAllCommentsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const post = await findBySlugService(slug);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    const allComments = post.comments;

    res.status(200).send(allComments);
  } catch (error) {
    res.status(500).send({ message: "Error fetching all comments:" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { slug } = req.params;
    const username = req.username;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({ message: "Write a message to comment" });
    }

    await addCommentService(slug, comment, username);

    res.send({ message: "Comment successfully completed!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const addLikeToComment = async (req, res) => {
  try {
    const { slug, idComment } = req.params;
    const username = req.username;

    const post = await findBySlugService(slug);

    if (!post) {
      return res.status(404).send({ message: "Post not found." });
    }

    const commentLiked = await addLikeToCommentService(slug, idComment, username);

    if (!commentLiked) {
      return res.status(404).send({ message: "Comment not found." });
    }
    
    res.send({ message: "Like added/removed successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const addDislikeToComment = async (req, res) => {
  try {
    const { slug, idComment } = req.params;
    const username = req.username;

    const post = await findBySlugService(slug);

    if (!post) {
      return res.status(404).send({ message: "Post not found." });
    }

    const commentDisliked = await addDislikeToCommentService(slug, idComment, username);

    if (!commentDisliked) {
      res.status(404).send({ message: "Comment not found." });
    }

    res.send({ message: "Dislike added/removed successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const addLikeToReply = async (req, res) => {
  try {
    const { slug, idComment, idReply } = req.params;
    const username = req.username;
    
    const post = await findBySlugService(slug);

    if (!post) {
      return res.status(404).send({ message: "Post not found." });
    }
    
    const replyLiked = await addLikeToReplyService(slug, idComment, idReply, username);

    if (!replyLiked) {
      return res.status(200).send({ message: "Reply not found." });
    }
    
    res.send({ message: "Like added/removed successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const addDislikeToReply = async (req, res) => {
  try {
    const { slug, idComment, idReply } = req.params;
    const username = req.username;

    const post = await findBySlugService(slug);

    if (!post) {
      return res.status(404).send({ message: "Post not found." });
    }
    
    const replyDisliked = await addDislikeToReplyService(slug, idComment, idReply, username);

    if (!replyDisliked) {
      res.status(404).send({ message: "Reply not found." });
    }

    res.send({ message: "Dislike added/removed successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { slug, idComment } = req.params;
    const username = req.username;
    const isAdmin = req.isAdmin;
    
    const commentDeleted = await deleteCommentService(slug, idComment, username);

    const commentFinder = commentDeleted.comments.find(comment => comment.idComment === idComment);
    
    if (!commentFinder) {
      return res.status(404).send({ message: "Comment not found" });
    }
    
    if (commentFinder.username !== username && !isAdmin) {
      return res.status(400).send({ message: "You can't delete this comment" });
    }
	
    res.send({ message: "Comment successfully removed!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const addReply = async (req, res) => {
  try {
    const { slug, idComment } = req.params;
    const username = req.username;
    const { replyText } = req.body;

    if (!replyText) {
      return res.status(400).send({ message: "Write a reply to comment" });
    }

    await addReplyService(slug, idComment, replyText, username);

    res.send({ message: "Reply added successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const { slug, idComment, idReply } = req.params;
    const username = req.username;
    const isAdmin = req.isAdmin;

    const replyDeleted = await deleteReplyService(slug, idComment, idReply, username);

    const replyFinder = replyDeleted.comments.find((comment) => comment.replies.some((reply) => reply.idReply === idReply));

    if (!replyFinder) {
      return res.status(404).send({ message: "Reply not found" });
    }

    if (replyFinder.replies.username !== username && !isAdmin) {
      return res.status(400).send({ message: "You can't delete this reply" });
    }

    res.send({ message: "Reply successfully removed!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
