import Cookies from "js-cookie";
import axios from "axios";

export default async function postLike(slug, idComment) {
  try {
    const token = Cookies.get("token");

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_BACK_URL}/post/comment/${slug}/${idComment}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(`Error fetching add like to comment: ${error.message}`);
  }
}