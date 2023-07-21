import axios from "axios";

export default async function postLogin(event) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BACK_URL}/auth/login`, data);

    return response.data;
  } catch (error) {
    return { error: true, message: error.response.data.message };
  }
}
