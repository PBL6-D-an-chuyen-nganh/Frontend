import { axiosPrivate } from "./axios";

export const searchDoctors = async (name = '', degree = '', position = '', page = 0, size = 5) => {
    const response = await axiosPrivate.get('/api/doctors/search-filter', {
        params: {
            name,
            degree,
            position,
            page,
            size
        }
    });
    return response.data;
}