import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Error Handler
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // get new token
        await axiosInstance.post("/api/auth/refresh_token");
        // re-call api
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh Token failed!", refreshError);
        // If refresh token fails, redirect to login
        await axiosInstance.post("/api/auth/logout");
        // if (window.location.pathname !== "/login") {
        //   window.location.href = "/login";
        // }
        return Promise.reject(error.response);
      }
    }

    return Promise.reject(error.response);
  }
);

export default axiosInstance;

// Define a generic fetcher function that returns a Promise of type T
export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);
