import { axiosPrivate } from "./axios";

export const createDiagnosis = async (diagnosisData) => {
  try {
    const response = await axiosPrivate.post("/api/diagnoses", diagnosisData);
    const data = response.data; 
    return { message: data, error: null };
  } catch (error) {
    return { message: null, error: error.response?.data || error.message };
  }
};