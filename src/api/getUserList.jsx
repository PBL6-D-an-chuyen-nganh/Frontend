import { axiosPrivate } from "./axios";

export const GetUserList = async (page) => {
  try {
    const response = await axiosPrivate.get("/api/admin/users/role-user", {
      params: {
        page: page - 1, 
        size: 10 
      }
    });
    
    const data = response.data;
    return { users: data, error: null };
  } catch (error) {   
    return { users: null, error: error.response?.data || error.message };
  }
};