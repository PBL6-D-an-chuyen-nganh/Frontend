import { axiosPrivate } from "./axios";

export const getAppointmentByCreator = async (page = 1, size = 8) => {
  const response = await axiosPrivate.get(
    `/api/user/appointments/creator`,
    {
      params: {
        page: page - 1,   
        size: size,     
      },
    }
  );

  const data = response.data;

  return {
    appointments: Array.isArray(data.content) ? data.content : [],
    totalElements: data.totalElements ?? 0,
    totalPages: data.totalPages ?? 1,
    pageNo: data.pageNo ?? 0,
  };
};
