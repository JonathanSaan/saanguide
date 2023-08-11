import bcrypt from "bcrypt";
import { loginService, generateTokenService, createService, findByUsernameService, findByEmailService } from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = [];

    if (!email || !email.length) {
      errors.push("Email is required.");
    }

    if (!password || !password.length) {
      errors.push("Password is required.");
    }

    if (errors.length > 0) {
      return res.status(400).send({ messages: errors });
    }
    
    if (!password || password.length < 8) {
      return res.status(400).send({ message: "Password must have at least 8 characters" });
    }
    
    const user = await loginService(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(404).send({ message: "User or Password not found" });
    }

    const token = generateTokenService(user._id);
    
    res.send({
      user: {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      token: token,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password, repeatPassword } = req.body;
    const errors = [];
    
    const existingUsername = await findByUsernameService(username);
    if (existingUsername) {
      return res.status(403).send({ usernameRegistered: true, message: "Username is already in use. Please choose a different username." });
    }

    if (!username) {
      errors.push("Username is required.");
    }

    const existingEmail = await findByEmailService(email);
    if (existingEmail) {
      return res.status(403).send({ emailRegistered: true, message: "Email is already in use. Please choose a different email." });
    }

    if (!email) {
      errors.push("Email is required.");
    }

    if (!password) {
      errors.push("Password is required.");
    }

    if (!repeatPassword) {
      errors.push("Repeat password is required.");
    }

    if (errors.length > 0) {
      return res.status(400).send({ messages: errors });
    }

    if (username.length < 4) {
      return res.status(400).send({ message: "Username must have at least 4 characters." });
    }
    
    if (username.length > 50) {
      return res.status(400).send({ message: "Username must have a maximum of 50 characters" });
    }

    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).send({ message: "Username can only contain letters, numbers, underscores, and hyphens." });
    }
    
    if (password.length < 8 || repeatPassword.length < 8) {
      return res.status(400).send({ message: "Passwords must have at least 8 characters." });
    }
    
    if (password !== repeatPassword) {
      return res.status(400).send({ message: "Passwords must be the same." });
    }

    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialChars.test(password) || !specialChars.test(repeatPassword)) {
      return res.status(400).send({ message: "The password must contain at least one special character." });
    }
    
    const user = await createService(req.body);

    if (!user) {
      return res.status(400).send({ message: "Error creating user" });
    }
    
    const token = generateTokenService(user._id);

    res.status(201).send({
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      token: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
