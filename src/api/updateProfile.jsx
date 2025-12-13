import { axiosPrivate } from "./axios";

export const UpdateProfile = async (profileData) => {
  try {
    const response = await axiosPrivate.put("/api/user/profile/update", profileData);
    const data = response.data;
    return { message: data, error: null };
  } catch (error) {
    let rawError = error.response?.data || error.message || "";
    let cleanError = rawError.includes(":")
      ? rawError.split(":").slice(1).join(":").trim()
      : rawError;
    return { message: null, error: cleanError };
  }
};