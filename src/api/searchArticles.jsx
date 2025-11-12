import { axiosPrivate } from "./axios";

export const searchArticles = async (
  keyword,
  sortBy = "createdAt",
  sortDir = "desc"
) => {
  const response = await axiosPrivate.get(
    `/api/articles/search?keyword=${keyword}&sortBy=${sortBy}&sortDir=${sortDir}`
  );
  return response.data;
};
