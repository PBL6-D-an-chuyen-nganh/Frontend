import { axiosPrivate } from "./axios";

export const updateDoctorProfile = async (data) => {
    try {
        const response = await axiosPrivate.put(`/api/doctor/profile/update`, data);
        return { message: response.data, error: null };
    } catch (error) {
        return { message: null, error: error.response?.data?.message || "Cập nhật thông tin bác sĩ thất bại" };
    }
};