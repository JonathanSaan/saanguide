import Cookies from "js-cookie";
import axios from "axios";

export default async function updatePublication(data) {
  try {
    const token = Cookies.get("token");

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_SERVER_BACK_URL}/post/${data.slug}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    return { error: true, message: error.response.data.message };
  }
}
