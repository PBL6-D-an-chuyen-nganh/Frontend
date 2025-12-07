import { axiosPrivate } from "./axios";

export const getPatientDiagnosisHistory = async (userId) => {
  const url = `/api/user/diagnoses/${userId}`;
  const response = await axiosPrivate.get(url);
  return response.data;
};
