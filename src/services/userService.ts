// userService.ts
import axiosInstance from '@/config/axiosConfig';
import { ApiResponse, UserModel } from '@/models/User';
import { AxiosResponse } from 'axios';

// Hàm gọi API để lấy thông tin người dùng
export const getUsers = async (): Promise<ApiResponse<UserModel[]>> => {
  try {
    const response: ApiResponse<UserModel[]> = await axiosInstance.get(
      `/users/`,
    );
    return response; // Trả về dữ liệu phản hồi đã được ép kiểu
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

// Hàm gọi API để cập nhật thông tin người dùng
export const updateUser = async (userId: string, userData: object) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Hàm gọi API để xóa người dùng
export const deleteUser = async (userId: string) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
