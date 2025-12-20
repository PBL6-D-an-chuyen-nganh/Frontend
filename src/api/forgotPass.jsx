import { axiosPrivate } from "./axios";

export const forgotPass = async (email) => {
  const response = await axiosPrivate.post('/api/v1/auth/forgot-password', {
    email,
  });
  return response.data;
}