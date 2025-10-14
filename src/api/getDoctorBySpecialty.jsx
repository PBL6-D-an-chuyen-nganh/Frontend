import { axiosPrivate } from "./axios";

export const getDoctorBySpecialty = async (specialty) => {
  const response = await axiosPrivate.get(
    `/api/doctors/by-specialty?specialtyId=${specialty}`
  );
  return response.data;
};
