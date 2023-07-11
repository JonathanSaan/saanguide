import { findAllService } from "../services/posts.service.js";

export const findAll = async (req, res) => {
  try {
    const users = await findAllService();

    if (users.length === 0) {
      return res.status(400).send({ message: "There are no registered users" });
    }

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
