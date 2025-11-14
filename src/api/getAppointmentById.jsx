import { axiosPrivate } from "./axios";

export const getAppointmentById = async (appointmentID) => {
  try {
    const res = await axiosPrivate.get(`/api/appointments/${appointmentID}`);
    return res.data;  
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return null; 
  }
};
