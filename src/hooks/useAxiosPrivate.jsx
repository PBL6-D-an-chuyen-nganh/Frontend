import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useAuthStore } from "../store/useAuthStore";

const useAxiosPrivate = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    // intercept request để gắn token
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    // intercept response (chỉ giữ lại pass-through, không xử lý refresh)
    const resInterceptor = axiosPrivate.interceptors.response.use(
      (res) => res,
      (err) => Promise.reject(err)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqInterceptor);
      axiosPrivate.interceptors.response.eject(resInterceptor);
    };
  }, [accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
