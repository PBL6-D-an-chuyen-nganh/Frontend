import { axiosPrivate } from "./axios";

export const reportUser = async (userId) => {
    try {
        const response = await axiosPrivate.delete(`/api/admin/users?id=${userId}`);
        return { message: response.data, error: null};
    } catch (error) {         
        return { message: null, error: error.response?.data || error.message };
    }
};