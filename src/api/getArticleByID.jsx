import { axiosPrivate } from "./axios";

export const getArticleByID = async (articleID) => {
    const response = await axiosPrivate.get(`/api/articles/${articleID}`);
    return response.data;
};

