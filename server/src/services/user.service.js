import User from "../models/User.js";

export const findByIdService = (id) => User.findById(id);
