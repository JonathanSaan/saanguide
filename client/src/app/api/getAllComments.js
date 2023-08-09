import axios from "axios";

export default async function getAllComments(slug) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BACK_URL}/post/comments/${slug}`);

    if (!response.data) {
      return null;
    }
    
    return response.data;
  } catch (error) {
    console.log(`Error fetching the all comments: ${error.message}`);
    return null;
  }
}
