import axios from "axios";

export default async function getAllPosts() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BACK_URL}/posts`);
    return response.data;
    
  } catch (error) {
    console.log(`Error fetching all posts: ${error.message}`);
  }
}
