import axios from "axios";

const api = axios.create({
baseURL: import.meta.env.VITE_API_URL
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ⚠️ DO NOT AUTO LOGOUT ON 401
// Just return error and let components handle it
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;