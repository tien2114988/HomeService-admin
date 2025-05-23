// axiosConfig.ts
import axios from "axios";

// URL cơ sở của API, bạn có thể thay đổi tùy vào backend của bạn
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Tạo instance axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Nếu bạn sử dụng token trong header, thêm ở đây
  },
});

// Bạn có thể thêm các interceptor nếu cần
axiosInstance.interceptors.request.use(
  (config) => {
    // Ví dụ: Thêm token vào request nếu cần
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      config.headers["Authorization"] = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý lỗi phản hồi của axios
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Xử lý lỗi API toàn cục ở đây
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default axiosInstance;
