import { axiosPrivate } from "./axios";

export const ChangePassword = async (data) => {
  try {
    const response = await axiosPrivate.put("/api/user/profile/change-password", data);
    return { message: response.data, error: null };
  } catch (error) {
    return { message: null, error: error.response?.data?.message || "Đổi mật khẩu thất bại" };
  }
};