import { axiosPrivate } from "./axios";

export const DeleteAccountUser= async () => {
    try {
        const response = await axiosPrivate.delete(`/api/user/profile/delete`);
        return { message: response.data, error: null};
    } catch (error) {
    return { message: null, error: error.response?.data || error.message };
  }
};

