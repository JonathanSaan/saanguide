import axios from "axios";

export default async function getPost(slug) {
  const response = await axios.get(`http://localhost:8000/post/${slug}`);

  return response.data;
}
