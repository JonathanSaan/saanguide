import axios from "axios";

export default async function getAllPosts() {
  const response = await axios.get("http://localhost:8000/posts");
  
  return response.data;
}
