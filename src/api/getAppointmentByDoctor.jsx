import { axiosPrivate } from "./axios";

export const getAppointmentByDoctor = async (doctorId, date) => {
  try {
    const res = await axiosPrivate.get(`api/appointments/doctor/${doctorId}?date=${date}`);
    return res.data;
  } catch (error) {
    console.error('Lỗi khi gọi API getAppointmentByDoctor:', error);
    return { appointments: [], total: 0 };
  }
};
