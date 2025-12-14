import { axiosPrivate } from "./axios";

export const registerDoctorSchedule = async (payload) => {
  try {
    const res = await axiosPrivate.post(`api/doctor/schedules`, payload);
    return res.data;
  } catch (error) {
    console.error('Lỗi khi gọi API registerDoctorSchedule:', error);
    return { appointments: [], total: 0 };
  }
};

