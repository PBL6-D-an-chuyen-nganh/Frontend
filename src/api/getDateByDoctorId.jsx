import { axiosPrivate } from "./axios";

export const getDoctorBySpecialty = async (doctorId) => {
  const response = await axiosPrivate.get(
    `/api/doctors/${doctorId}/available-slots`
  );
  return response.data;
};
