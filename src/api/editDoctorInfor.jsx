import { axiosPrivate } from "./axios";

export const editDoctor = async (doctorId, doctorData) => {
  try {
    const url = `/api/admin/doctors/${doctorId}`;
    const response = await axiosPrivate.put(url, doctorData);
    const data = response.data;
    return { message: data, error: null };
  } catch (error) {
    return { message: null, error: error.response?.data || error.message };
  }
};