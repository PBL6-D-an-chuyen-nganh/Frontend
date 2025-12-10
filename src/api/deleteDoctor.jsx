import { axiosPrivate } from "./axios";

export const deleteDoctor = async (doctorId) => {
    try {
        const response = await axiosPrivate.delete(`/api/admin/doctors/${doctorId}`);
        return { message: response.data, error: null};
    } catch (error) {
    return { message: null, error: error.response?.data || error.message };
  }
};