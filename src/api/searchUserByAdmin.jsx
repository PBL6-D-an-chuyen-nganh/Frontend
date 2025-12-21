import { axiosPrivate } from "./axios";

export const searchUserByAdmin = async (name = '', page = 0, size = 5) => {
    const response = await axiosPrivate.get('/api/admin/users/search', {
        params: {
            name,
            page,
            size
        }
    });
    return response.data;
}