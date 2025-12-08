import { axiosPrivate } from "./axios";

export const getDoctorListByAdmin = async ({
  page = 0,
  size = 10,
  sortBy = "userId",
  sortDir = "asc",
} = {}) => {
  const url = `/api/admin/doctors`;
  const response = await axiosPrivate.get(url, {
    params: { page, size, sortBy, sortDir },
  });
  return response.data;
};
