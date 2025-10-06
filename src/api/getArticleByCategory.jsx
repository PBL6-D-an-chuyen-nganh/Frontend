import { axiosPrivate } from "./axios";

export const getArticleByCategory = async (
  categoryID,
  page = 0,
  sortBy = "createdAt",
  sortDir = "desc"
) => {
  const response = await axiosPrivate.get(
    `/api/articles/category/${categoryID}?page=${page}&sortBy=${sortBy}&sortDir=${sortDir}`
  );
  return response.data;
};
