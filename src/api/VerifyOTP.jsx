import { axiosPrivate } from "./axios";

export const verifyOTP = async (email, otp) => {
  try {
    const response = await axiosPrivate.post("/api/v1/auth/verify-otp", {
      email,
      otp
    });
    const data = response.data;
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "OTP không đúng hoặc đã hết hạn!",
    };
  }
};
