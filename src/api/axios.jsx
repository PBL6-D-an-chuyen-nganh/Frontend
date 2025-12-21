import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"; 
const AI_BASE_URL = import.meta.env.VITE_AI_API_URL || "http://localhost:5000"; 

console.log("Main API URL:", BASE_URL);
console.log("AI API URL:", AI_BASE_URL);

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, 
});

export const axiosAI = axios.create({
  baseURL: AI_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const attachToken = (config) => {
    const tokenObj = useAuthStore.getState().token; 
    const token = typeof tokenObj === "string" ? tokenObj : tokenObj?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

axiosPrivate.interceptors.request.use(
  (config) => attachToken(config),
  (error) => Promise.reject(error)
);

axiosAI.interceptors.request.use(
  (config) => attachToken(config),
  (error) => Promise.reject(error)
);

const handleSessionError = (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        useAuthStore.getState().logout();
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
};

axiosPrivate.interceptors.response.use(
    (response) => response,
    (error) => handleSessionError(error)
);

axiosAI.interceptors.response.use(
    (response) => response,
    (error) => handleSessionError(error)
);