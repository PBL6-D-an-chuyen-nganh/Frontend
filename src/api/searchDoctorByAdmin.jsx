import { axiosPrivate } from "./axios";

export const searchDoctorByAdmin = async ({ name = '', degree = '', position = '', page, size }) => {
    const response = await axiosPrivate.get('/api/admin/doctors/search-filter', {
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