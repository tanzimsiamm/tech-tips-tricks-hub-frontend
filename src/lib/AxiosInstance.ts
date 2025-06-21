// frontend/src/lib/AxiosInstance.ts
'use server';

import axios from "axios";
import { cookies } from "next/headers";

import envConfig from "@/src/config/envConfig";
import { getNewAccessToken } from "../service/AuthService";

const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for Server Actions/Components
axiosInstance.interceptors.request.use(
  async function (config) {
    // NOTE: This interceptor runs on the server for Server Actions/Components.
    // The `Authorization` header here should be set manually for `getCurrentUser`
    // as `cookies().get('token')` is handled directly where `getCurrentUser` is called.
    // For other generic server-side calls, if a token is in cookies, it will be added.
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("token")?.value;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor for Server Actions/Components
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest?.sent) {
      originalRequest.sent = true;

      try {
        const res = await getNewAccessToken();
        const newAccessToken = res.data?.token;

        if (newAccessToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } else {
          throw new Error("New access token not received.");
        }
      } catch (refreshError) {
        console.error("Server-side token refresh failed:", refreshError);
        const cookieStore = await cookies();
        cookieStore.delete("token");
        throw error;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;