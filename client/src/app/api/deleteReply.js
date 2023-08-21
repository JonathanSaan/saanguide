import Cookies from "js-cookie";
import axios from "axios";

export default async function deleteReply({ slug, idComment, idReply }) {
  try {
    const token = Cookies.get("token");

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_SERVER_BACK_URL}/post/comment/${slug}/${idComment}/${idReply}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
  } catch (error) {
    console.log(`Error deleting reply: ${error.message}`);
  }
}
