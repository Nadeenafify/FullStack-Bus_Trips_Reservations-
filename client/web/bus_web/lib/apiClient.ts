import axios from "axios";

// 🔹 Main API client
const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Separate client for refresh (NO interceptors → avoids loops)
const refreshClient = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// ✅ Attach token ONLY when requested
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");

    // 👇 opt-in flag: useAuth
    const useAuth = config.headers?.useAuth !== false;

    if (token && useAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  // remove internal flag before sending to backend
  if (config.headers?.useAuth) {
    delete config.headers.useAuth;
  }

  return config;
});

// ✅ Refresh + retry logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await refreshClient.post("/auth/refresh");

        const newAccessToken = res.data.accessToken;

        // save new token
        localStorage.setItem("accessToken", newAccessToken);

        // attach new token to retry request
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return apiClient(originalRequest);
      } catch (err) {
        // refresh failed → logout
        localStorage.removeItem("accessToken");
  
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;