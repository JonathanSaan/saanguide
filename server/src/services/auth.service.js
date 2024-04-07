import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const loginService = (email) => User.findOne({ email: email }).select("+password");

export const createService = (body) => User.create(body);

export const generateTokenService = (id) => jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: "24h" });

export const findByUsernameService = async (username) => {
  const foundUsername = await User.findOne({ username });

  if (!foundUsername) return null;
  
  return foundUsername;
};

export const findByEmailService = async (email) => {
  const foundEmail = await User.findOne({ email });

  if (!foundEmail) return null;

  return foundEmail;
};
