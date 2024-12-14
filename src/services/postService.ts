// userService.ts
import axiosInstance from '@/config/axiosConfig';
import { PostModel, TakePostModel } from '@/models/Post';
import { ApiResponse } from '@/models/User';

const baseUrl = '/posts';

export const getPostsByCustomerId = async (
  userId: string,
): Promise<ApiResponse<PostModel[]>> => {
  try {
    const response: ApiResponse<PostModel[]> = await axiosInstance.get(
      `${baseUrl}/customers/${userId}`,
    );
    return response; // Trả về dữ liệu phản hồi đã được ép kiểu
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

export const getPostsByFreelancerId = async (
  userId: string,
): Promise<ApiResponse<TakePostModel[]>> => {
  try {
    const response: ApiResponse<TakePostModel[]> = await axiosInstance.get(
      `${baseUrl}/freelancers/${userId}`,
    );
    return response; // Trả về dữ liệu phản hồi đã được ép kiểu
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

export const getFreelancersByPostId = async (
  postId: string,
): Promise<ApiResponse<TakePostModel[]>> => {
  try {
    const response: ApiResponse<TakePostModel[]> = await axiosInstance.get(
      `${baseUrl}/${postId}/freelancers`,
    );
    return response; // Trả về dữ liệu phản hồi đã được ép kiểu
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

export const getAllPosts = async (): Promise<ApiResponse<PostModel[]>> => {
  try {
    const response: ApiResponse<PostModel[]> = await axiosInstance.get(
      `${baseUrl}`,
    );
    return response; // Trả về dữ liệu phản hồi đã được ép kiểu
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

// Hàm gọi API để xóa người dùng
export const deleteUser = async (userId: string) => {
  try {
    const response = await axiosInstance.delete(`${baseUrl}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
