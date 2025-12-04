import { axiosPrivate } from "./axios";

export const getAppointmentByCreator = async (creatorId, page = 1, size = 8) => {
  const response = await axiosPrivate.get(
    `/api/user/appointments/creator/${creatorId}`,
    {
      params: {
        pageNo: page - 1,
        pageSize: size,
      },
    }
  );
  const data = response.data;
  return {
    appointments: Array.isArray(data.content) ? data.content : [],
    totalElements:
      typeof data.totalElements === "number"
        ? data.totalElements
        : data.content?.length || 0,
    totalPages: data.totalPages || 1,
    pageNo: data.pageNo ?? 0,
  };
};
