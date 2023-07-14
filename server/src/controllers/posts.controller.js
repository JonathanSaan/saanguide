import { createService, findAllService, findBySlugService } from "../services/posts.service.js";

export const create = async (req, res) => {
  try {
    const { title, slug, warn, text, banner } = req.body;

    if (!title || !slug || !warn || !text || !banner) {
      res.status(400).send({ message: "Submit all fields for registration" });
    }

    await createService({
      title,
      slug,
      warn,
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