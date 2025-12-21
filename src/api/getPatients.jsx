import { axiosPrivate } from "./axios";

export const getPatients = async (date) => {
  const url = `/api/doctor/diagnoses/diagnosis-list`;
  const response = await axiosPrivate.get(url, {
    params: date ? { date } : {}, 
  });

  return response.data;
};
