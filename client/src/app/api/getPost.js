import axios from "axios";

export default async function getPost(slug) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BACK_URL}/post/${slug}`);

  return response.data;
}
