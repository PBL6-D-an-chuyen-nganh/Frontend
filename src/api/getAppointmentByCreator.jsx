import { axiosPrivate } from "./axios";

export const getAppointmentByCreator = async (creatorId) => {
    const response = await axiosPrivate.get(`/api/appointments/creator/${creatorId}`);
    return response.data;
};

