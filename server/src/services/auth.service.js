import jvt from "jsonwebtoken";
import User from "../models/User.js";

export const loginService = (email) =>
  User.findOne({ email: email }).select("+password");

export const createService = (body) => User.create(body);

export const generateTokenService = (id, hr) =>
  jvt.sign({ id: id }, process.env.SECRET_JVT, { expiresIn: hr });

export const findByUsernameService = (username) => User.findOne({ username });

export const findByEmailService = (email) => User.findOne({ email });
