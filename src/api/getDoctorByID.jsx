import { axiosPrivate } from "./axios";

export const getDoctorByID = async (userId) => {
    const response = await axiosPrivate.get(`/api/doctors/${userId}`);
    return response.data;
};

