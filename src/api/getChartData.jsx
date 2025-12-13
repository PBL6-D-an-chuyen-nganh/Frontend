import { axiosPrivate } from "./axios";

export const getChartData = async () => {
    try {
        const response = await axiosPrivate.get(`/api/admin/statistics/appointments`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Lấy dữ liệu biểu đồ thất bại");
    }
};