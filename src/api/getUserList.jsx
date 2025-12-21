import { axiosPrivate } from "./axios";

export const GetUserList = async ({ page = 0, size = 5 }) => {
  const response = await axiosPrivate.get(
    "/api/admin/users/role-user",
    {
      params: {
        page,
        size
      }
    }
  );

  return response.data;
};
  