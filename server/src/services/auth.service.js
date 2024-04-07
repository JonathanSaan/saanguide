import jwt from "jsonwebtoken";
import User from "../models/User.js";
import client from "../helpers/redis.js";

export const loginService = (email) => User.findOne({ email: email }).select("+password");

export const createService = (body) => User.create(body);

export const generateTokenService = (id) => jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: "24h" });

export const findByUsernameService = async (username) => {
  const usernameFromCache = await client.get(username);
  
  if (usernameFromCache) {
    return JSON.parse(usernameFromCache);
  }
  
  const foundUsername = await User.findOne({ username });
  
  client.set(foundUsername, JSON.stringify(username), {ex: 3600});
  
  return foundUsername;
};

export const findByEmailService = async (email) => {
  const emailFromCache = await client.get(email);
  
  if (emailFromCache) {
    return JSON.parse(emailFromCache);
  }
  
  const foundEmail = await User.findOne({ email });
  
  client.set(foundEmail, JSON.stringify(email), {ex: 3600});
  
  return foundEmail;
};
