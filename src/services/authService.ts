// userService.ts
import axiosInstance from '@/config/axiosConfig';
import { JwtModel, LoginModel } from '@/models/Auth';
import { ApiResponse, UserModel } from '@/models/User';

const baseUrl = '/auth';

// Hàm gọi API để cập nhật thông tin người dùng
export const login = async (loginData: LoginModel) => {
  try {
    const response: ApiResponse<JwtModel> = await axiosInstance.post(
      `${baseUrl}/logInForAdmin`,
      loginData,
    );
    return response;
  } catch (error) {
    console.error('Error login:', error);
    throw error;
  }
};

export const verifyJwt = async (jwtData: object) => {
  try {
    const response: ApiResponse<UserModel> = await axiosInstance.post(
      `${baseUrl}/verifyJwtForAdmin`,
      jwtData,
    );
    return response;
  } catch (error) {
    console.error('Error verify jwt:', error);
    throw error;
  }
};
