import { axiosPrivate } from "./axios";

export const deleteAppointment = async (appointmentID) => {
    try {
        const response = await axiosPrivate.delete(`/api/user/appointments/${appointmentID}`);
        return { message: response.data, error: null};
    } catch (error) {
    return { message: null, error: error.response?.data || error.message };
  }
};

