import dotenv from "dotenv";
import { Redis } from "@upstash/redis";

dotenv.config();

const client = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN
});

export default client;
