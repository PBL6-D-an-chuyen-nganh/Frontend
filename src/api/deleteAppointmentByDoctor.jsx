import { axiosPrivate } from "./axios";

export const deleteAppointmentByDoctor = async (appointmentID) => {
    try {
        const response = await axiosPrivate.delete(`/api/appointments/by-doctor/${appointmentID}`);
        return { message: response.data, error: null};
    } catch (error) {
    return { message: null, error: error.response?.data || error.message };
  }
};

