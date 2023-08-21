import Cookies from "js-cookie";
import axios from "axios";

export default async function postDislikeReply(slug, idComment, idReply) {
  try {
    const token = Cookies.get("token");

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_BACK_URL}/post/comment/${slug}/${idComment}/${idReply}/dislike`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(`Error fetching add dislike to reply: ${error.message}`);
  }
}