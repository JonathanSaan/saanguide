import Posts from "../models/Posts.js";

export const createService = (body) => Posts.create(body);

export const findAllService = () => Posts.find();

export const findBySlugService = (slug) => Posts.findOne({ slug });