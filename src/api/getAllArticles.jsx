import { axiosPrivate } from "./axios";

export const getAllArticles = async (pageUI = 1, size = 5) => {
  const backendPage = Math.max(0, pageUI - 1);

  const res = await axiosPrivate.get("/api/articles", {
    params: { page: backendPage } 
  });
  return res.data; 
};
