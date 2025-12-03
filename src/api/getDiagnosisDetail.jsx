import { axiosPrivate } from "./axios";

export const getDiagnosisDetail = async (diagnosisId) => {
    const response = await axiosPrivate.get(`/api/diagnoses/${diagnosisId}`);
    return response.data;
};

