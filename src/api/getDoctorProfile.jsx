import { axiosPrivate } from "./axios";

export const getDoctorProfile = async (doctorId) => {
    try {
        const response = await axiosPrivate.get(`/api/doctor/profile`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Lấy thông tin bác sĩ thất bại");
    }
};