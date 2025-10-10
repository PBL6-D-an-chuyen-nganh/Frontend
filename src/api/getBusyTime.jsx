import { axiosPrivate } from "./axios";

export const getBusyTime= async (date) => {
  const response = await axiosPrivate.get(
    `/api/appointments/unavailable-slots-by-specialty?date=${date}`
  );
  return response.data;
};
