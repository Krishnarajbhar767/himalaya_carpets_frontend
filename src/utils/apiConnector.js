// axiosInstance.js
import axios from "axios";
import { store } from "../redux/store";
import { clearUser, setToken } from "../redux/slices/userSlice";
import authApis from "../services/api/auth/auth.apis";

// 1) Create a “main” axios instance that we’ll export.
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 120_000, // 2 minutes
    withCredentials: true,
});

// 2) Request interceptor: always attach Authorization header if token exists
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!error.response || error.response.status !== 401) {
            return Promise.reject(error);
        }

        if (originalRequest._hasRetried) {
            // Once we've already retried the request, reject and logout
            // Trigger logout on the frontend (clear cookies, localStorage, etc.)
            store.dispatch(clearUser());
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirect to login page
            return Promise.reject(error);
        }

        originalRequest._hasRetried = true;

        try {
            const refreshResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/regenerate-token`,
                {},
                {
                    withCredentials: true,
                }
            );

            const newToken = refreshResponse.data?.data;
            if (newToken) {
                localStorage.setItem("token", newToken);
                store.dispatch(setToken(newToken));

                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return axiosInstance(originalRequest);
            }

            throw new Error("No token in refresh response");
        } catch (refreshError) {
            // Handle refresh failure by redirecting to login
            store.dispatch(clearUser());
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirect to login page
            return Promise.reject(refreshError);
        }
    }
);

export default axiosInstance;
