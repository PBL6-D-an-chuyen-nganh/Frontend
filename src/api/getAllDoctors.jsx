import { axiosPrivate } from "./axios";

export const getAllDoctors = async (pageUI = 1, size = 5) => {
  const backendPage = Math.max(0, pageUI - 1);

  const res = await axiosPrivate.get("/api/doctors", {
    params: { page: backendPage } 
  });
  return res.data; 
};
