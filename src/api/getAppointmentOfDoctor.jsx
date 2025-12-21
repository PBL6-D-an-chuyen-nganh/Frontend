import { axiosPrivate } from "./axios";

export const getAppointmentOfDoctor = async (month, year) => {
  try {
    const response = await axiosPrivate.get(
      "/api/admin/statistics/doctor-appointments",
      {
        params: {
          month,
          year,
        },
      }
    );
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error("Lỗi khi lấy thống kê lịch hẹn bác sĩ:", error);
    return {
      data: null,
      error: error.response?.data || error.message,
    };
  }
};
