import { createService, findAllService, findBySlugService, addCommentService, deleteCommentService } from "../services/posts.service.js";

export const create = async (req, res) => {
  try {
    const { title, slug, warn, description, text, banner } = req.body;

    if (!title || !slug || !warn || !description || !text || !banner) {
      res.status(400).send({ message: "Submit all fields for registration" });
    }

    await createService({
      title,
      slug,
      warn,
      description,
      text: text,
      banner,
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

    res.send({
      results: posts.map((item) => ({
        id: item.id,
        title: item.title,
        author: item.author,
        slug: item.slug,
        warn: item.warn,
        text: item.text,
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

    const news = await findByIdService(id);

    if (String(news.user._id) !== req.userId) {
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

    const news = await findByIdService(id);

    if (String(news.user._id) !== req.userId) {
      return res.status(400).send({ message: "You didn't delete this post" });
    }

    await eraseService(id);

    return res.send({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
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
