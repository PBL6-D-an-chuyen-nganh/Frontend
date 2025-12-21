import { axiosPrivate } from "./axios";

export const reOpenDoctor = async (doctorId) => {
    try {
        const response = await axiosPrivate.put(`/api/admin/doctors/${doctorId}/reopen-doctor`);
        return { message: response.data, error: null};
    } catch (error) {         
        return { message: null, error: error.response?.data || error.message };
    }
};