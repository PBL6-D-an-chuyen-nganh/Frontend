import { axiosPrivate } from "./axios";

export const getPatientDiagnosisHistory = async () => {
  const url = `/api/user/diagnoses/by-user`;
  const response = await axiosPrivate.get(url);
  return response.data;
};
