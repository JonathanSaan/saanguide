import Cookies from "js-cookie";
import axios from "axios";

export default async function postReply({ slug, replyText, idComment }) {
  try {
    const token = Cookies.get("token");

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_SERVER_BACK_URL}/post/comment/${slug}/${idComment}/reply`,
      { replyText },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  } catch (error) {
    console.log(`Error fetching add comment: ${error.message}`);
  }
}
