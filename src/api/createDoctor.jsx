import { axiosPrivate } from "./axios";

export const CreateDoctor = async (doctorData) => {
  try {
    const response = await axiosPrivate.post("/api/admin/doctors", doctorData);
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
