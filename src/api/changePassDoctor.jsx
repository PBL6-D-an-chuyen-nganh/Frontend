import { axiosPrivate } from "./axios";

export const changePassDoctor = async (data) => {
    try {
        const response = await axiosPrivate.put("/api/doctor/profile/change-password", data);
        return { message: response.data, error: null };
    }   catch (error) { 
        return { message: null, error: error.response?.data?.message || "Đổi mật khẩu thất bại" };
    }
};