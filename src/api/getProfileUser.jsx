import { axiosPrivate } from "./axios";

export const GetProfileUser = async () => {
  try {
    const response = await axiosPrivate.get(`/api/user/profile`);
    const data = response.data;
    return { profile: data, error: null };
  } catch (error) {
    return { profile: null, error: error.response?.data || error.message };
  }
};