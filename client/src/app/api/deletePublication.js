import Cookies from "js-cookie";
import axios from "axios";

export default async function deletePublication(slug) {
  try {
    const token = Cookies.get("token");

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_BACK_URL}/post/${slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
  } catch (error) {
    console.log(`Error deleting publication: ${error.message}`);
  }
}
