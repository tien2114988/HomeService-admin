// userService.ts
import axiosInstance from '@/config/axiosConfig';
import { ApiResponse } from '@/models/User';
import { FreelancerWorkModel, WorkModel } from '@/models/Work';

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

export const updateWork = async (
  id: string,
  data: object,
): Promise<ApiResponse<WorkModel>> => {
  try {
    const response: ApiResponse<WorkModel> = await axiosInstance.patch(
      `${baseUrl}/${id}`,
      data,
    );
    return response; // Trả về dữ liệu phản hồi đã được ép kiểu
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

export const getRequests = async (
  id?: string,
): Promise<ApiResponse<FreelancerWorkModel[]>> => {
  let url = `${baseUrl}/freelancers`;
  url += id ? '?id=' + id : '';
  try {
    const response: ApiResponse<FreelancerWorkModel[]> =
      await axiosInstance.get(url);
    return response; // Trả về dữ liệu phản hồi đã được ép kiểu
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

export const updateRequest = async (
  workId: string,
  freelancerId: string,
  data: object,
): Promise<ApiResponse<FreelancerWorkModel>> => {
  try {
    console.log(workId, freelancerId);
    const response: ApiResponse<FreelancerWorkModel> =
      await axiosInstance.patch(
        `${baseUrl}/${workId}/freelancers/${freelancerId}`,
        data,
      );
    return response; // Trả về dữ liệu phản hồi đã được ép kiểu
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};
