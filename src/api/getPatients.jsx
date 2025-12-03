import { axiosPrivate } from "./axios";

export const getPatients = async (doctorId, date) => {
  const url = `/api/doctors/${doctorId}/diagnosis-list`;
  const response = await axiosPrivate.get(url, {
    params: date ? { date } : {}, 
  });

  return response.data;
};
