import { getAccessToken } from "@/lib/token-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "https://l2brary-api.onrender.com/v1/api",
});

api.interceptors.request.use(
  async (config) => {
    // You would retrieve your bearer token from SecureStore, AsyncStorage, or any secure storage here
    // Example: const token = await getAccessToken();
    const token = await getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
