export const fetchLogout = async (axiosPrivate) => {
  try {
    const response = await axiosPrivate.post("/api/v1/auth/logout");
    const data = response.data; 
    return { message: data, error: null };
  } catch (error) {
    return { message: null, error: error.response?.data || error.message };
  }
};
