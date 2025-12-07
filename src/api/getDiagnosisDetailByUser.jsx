import { axiosPrivate } from "./axios";

export const getDiagnosisDetailByUser = async (diagnosisId) => {
    const response = await axiosPrivate.get(`/api/user/diagnoses/${diagnosisId}/detail`);
    return response.data;
};

