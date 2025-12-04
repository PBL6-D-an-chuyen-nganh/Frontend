import { axiosPrivate } from "./axios";

export const fetchLogin = async (email, password) => {
  try {
    const response = await axiosPrivate.post("/api/v1/auth/login", {
      email,
      password,
    });
    const { token, user } = response.data;

    return {token, user, error: null };
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.error;

    if (status === 403 && message === "Tài khoản của bạn chưa được xác thực") {
      return { user: { email, isVerified: false }, error: "unverified" };
    }

    throw error; 
  } 
};
