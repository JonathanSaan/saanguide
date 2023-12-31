import axios from "axios";

export default async function postRegister(data) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BACK_URL}/auth/register`, data);
  
    return response.data;
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data.message,
      usernameRegistered: error.response.data.usernameRegistered,
      emailRegistered: error.response.data.emailRegistered,
    };
  }
}
