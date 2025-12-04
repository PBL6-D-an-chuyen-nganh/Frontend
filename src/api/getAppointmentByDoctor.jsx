import { axiosPrivate } from "./axios";

export const getAppointmentByDoctor = async (doctorId, date) => {
  try {
    const res = await axiosPrivate.get(`/api/doctor/appointments/${doctorId}`, {
      params: { date }, 
    });
    const data = res.data;
    return {
      appointments: Array.isArray(data.content) ? data.content : [],
      total: typeof data.totalElements === "number"
        ? data.totalElements
        : (data.content?.length || 0),
      totalPages: data.totalPages || 1,
      pageNo: data.pageNo ?? 0,
    };
  } catch (error) {
    console.error("Lỗi khi gọi API getAppointmentByDoctor:", error);
    return { appointments: [], total: 0, totalPages: 1, pageNo: 0 };
  }
};
