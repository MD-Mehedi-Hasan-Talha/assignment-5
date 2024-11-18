import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import useAuth from "./useAuth";

export default function useAxios() {
  const { handleGetAuth, handleSetAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Request Interceptor here

    const requestIntercept = api.interceptors.request.use(
      (config) => {
        let accessToken = handleGetAuth()?.accessToken;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor here
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = handleGetAuth()?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/refresh-token`,
              { refreshToken }
            );

            const { accessToken, refreshToken: nextRefreshToken } =
              response.data.data;

            handleSetAuth({
              ...handleGetAuth(),
              accessToken,
              refreshToken: nextRefreshToken,
            });

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (error) {
            console.log(error);
            if (error.status === 401) {
              return handleSetAuth(null); // if refresh token will expired.
            }
            throw error;
          }
        }

        return Promise.reject(error);
      }
    );

    setLoading(false);

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [handleGetAuth, handleSetAuth]);

  return { api, loading };
}
