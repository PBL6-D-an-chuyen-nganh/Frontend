export const createAppointment = async (axiosPrivate, appointmentData) => {
  try {
    const response = await axiosPrivate.post("/api/user/appointments/create", appointmentData);
    const data = response.data; 
    return { message: data, error: null };
  } catch (error) {
    return { message: null, error: error.response?.data || error.message };
  }
};