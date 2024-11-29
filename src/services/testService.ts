// userService.ts
import axiosInstance from '@/config/axiosConfig';
import { ApiResponse } from '@/models/User';
import { QuestionModel } from '@/models/Work';

const baseUrl = '/tests';

export const getQuestions = async (
  testId: string,
): Promise<ApiResponse<QuestionModel[]>> => {
  try {
    const response: ApiResponse<QuestionModel[]> = await axiosInstance.get(
      `${baseUrl}/${testId}/questions`,
    );
    return response; // Trả về dữ liệu phản hồi đã được ép kiểu
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

export const addQuestion = async (
  testId: string,
  data: object,
): Promise<ApiResponse<QuestionModel>> => {
  try {
    const response: ApiResponse<QuestionModel> = await axiosInstance.post(
      `${baseUrl}/${testId}/questions`,
      data,
    );
    return response; // Trả về dữ liệu phản hồi đã được ép kiểu
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

export const updateQuestion = async (
  id: string,
  data: object,
): Promise<ApiResponse<QuestionModel>> => {
  try {
    const response: ApiResponse<QuestionModel> = await axiosInstance.patch(
      `${baseUrl}/questions/${id}`,
      data,
    );
    return response; // Trả về dữ liệu phản hồi đã được ép kiểu
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

export const deleteQuestion = async (
  id: string,
): Promise<ApiResponse<null>> => {
  try {
    const response: ApiResponse<null> = await axiosInstance.delete(
      `${baseUrl}/questions/${id}`,
    );
    return response; // Trả về dữ liệu phản hồi đã được ép kiểu
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};
