import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { findByIdService } from "../services/user.service.js";

dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    
    if (!authorization) {
      return res.status(401).send("Unauthorized");
    }
    
    const parts = authorization.split(" ");
    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.status(401).send("Unauthorized");
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "You need to be logged in." });
      }
      console.log(decoded);
      const user = await findByIdService(decoded.id);
      
      if (!user || !user.id) {
        return res.status(404).send({ message: "Invalid token!" });
      }
  
      req.userId = user._id;
      req.username = user.username;
      req.isAdmin = user.isAdmin;
      return next();
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

};

export default authMiddleware;
