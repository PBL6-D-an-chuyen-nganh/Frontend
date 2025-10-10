import { axiosPrivate } from "./axios";

export const getBusyDate = async (specialtyId) => {
  const response = await axiosPrivate.get(
    `/api/appointments/unavailable-dates-in-month?specialtyId=${specialtyId}`
  );
  return response.data;
};
