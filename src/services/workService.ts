// userService.ts
import axiosInstance from '@/config/axiosConfig';
import { ApiResponse } from '@/models/User';
import { WorkModel } from '@/models/Work';

const baseUrl = '/works';

export const getAllWorks = async (): Promise<ApiResponse<WorkModel[]>> => {
  try {
    const response: ApiResponse<WorkModel[]> = await axiosInstance.get(
      `${baseUrl}`,
    );
    return response; // Trả về dữ liệu phản hồi đã được ép kiểu
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};
