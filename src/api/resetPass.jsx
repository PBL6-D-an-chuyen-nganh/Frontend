import { axiosPrivate } from "./axios";

export const resetPass = async (email, otp, newPassword) => {
  const response = await axiosPrivate.post('/api/v1/auth/reset-password', {
    email,
    otp,
    newPassword,
  });
  return response.data;
}   