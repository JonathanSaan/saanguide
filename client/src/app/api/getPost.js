import axios from "axios";

export default async function getPost(slug) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BACK_URL}/post/${slug}`);
    return response.data;

  } catch (error) {
    console.log(`Error fetching the post: ${error.message}`);
  }
}
