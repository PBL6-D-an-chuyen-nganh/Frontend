import { axiosPrivate } from "./axios";

export const getDiagnosisDetail = async (diagnosisId) => {
    const response = await axiosPrivate.get(`/api/doctor/diagnoses/${diagnosisId}`);
    return response.data;
};

