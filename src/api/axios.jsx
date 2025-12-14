import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"; 

console.log("Current API URL:", BASE_URL);

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, 
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const tokenObj = useAuthStore.getState().token; 
    const token = typeof tokenObj === "string" ? tokenObj : tokenObj?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);