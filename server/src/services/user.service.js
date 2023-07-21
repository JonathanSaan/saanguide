import User from "../models/User.js";

export const findAllService = () => User.find();

export const findByIdService = (id) => User.findById(id);
