import { axiosPrivate } from "./axios";

export const getAppointmentByIdDoctor = async (appointmentID) => {
  try {
    const res = await axiosPrivate.get(`/api/doctor/appointments/${appointmentID}/detail`);
    return res.data;  
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return null; 
  }
};
