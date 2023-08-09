import Cookies from "js-cookie";
import axios from "axios";

export default async function postComment({ slug, comment }) {
  try {
    const token = Cookies.get("token");

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_SERVER_BACK_URL}/post/comment/${slug}`,
      { comment: comment },
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
