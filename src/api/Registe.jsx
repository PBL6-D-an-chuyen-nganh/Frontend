import axiosPrivate from "./axios";

export const fetchRegister = async (name, email, phoneNumber, password) => {
  try {
    const response = await axiosPrivate.post("/api/v1/auth/register", {
      name,
      email,
      phoneNumber,
      password
    });
    const data = response.data;

    return { success: true, email };
  } catch (error) {
    console.error("Error during register:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi đăng ký",
    };
  }
};
