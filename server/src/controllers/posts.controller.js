import { createService, findAllService, findBySlugService, addCommentService, deleteCommentService } from "../services/posts.service.js";

export const create = async (req, res) => {
  try {
    const { title, slug, author, description, banner } = req.body;

    if (!title || !slug || !author || !banner || !description) {
      res.status(400).send({ message: "Submit all fields for registration" });
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

    if (posts.length === 0) {
      return res.status(400).send({ message: "There are no registered posts" });
    }
    
    const recentPosts = posts.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    res.send({
      results: recentPosts.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        author: item.author,
        banner: item.banner,
        createdAt: item.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await findBySlugService(slug);

    return res.send(post);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !text && !banner) {
      res
        .status(400)
        .send({ message: "Submit at least one field to update the post" });
    }

    const posts = await findByIdService(id);

    if (String(posts.user._id) !== req.userId) {
      return res.status(400).send({ message: "You didn't update this post" });
    }

    await updateService(id, title, text, banner);

    return res.send({ message: "Post successfully updated!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const erase = async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await findByIdService(id);

    if (String(posts.user._id) !== req.userId) {
      return res.status(400).send({ message: "You didn't delete this post" });
    }

    await eraseService(id);

    return res.send({ message: "Posts deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getAllCommentsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const post = await findBySlugService(slug);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
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

export const deleteComment = async (req, res) => {
  try {
    const { slug, idComment } = req.params;
    const username = req.username;

    const commentDeleted = await deleteCommentService(slug, idComment, username);
    
    const commentFinder = commentDeleted.comments.find(comment => comment.idComment === idComment)
    
    if(!commentFinder) {
      return res.status(400).send({ message: "Comment not found" });
    }
    
    if (commentFinder.username !== username) {
      return res.status(400).send({ message: "You can't delete this comment" });
    }
	
    res.send({ message: "Comment successfully removed!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
