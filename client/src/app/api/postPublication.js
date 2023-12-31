import Cookies from "js-cookie";
import axios from "axios";

export default async function postPublication(data) {
  try {
    const token = Cookies.get("token");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_BACK_URL}/publish`,
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
