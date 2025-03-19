import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./config";
import { ApiResponse, UserModel } from "@/models/User";
import { JwtModel, LoginModel } from "@/models/Auth";

// Define API slice
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery("/auth"),
  endpoints: (build) => ({
    login: build.mutation<ApiResponse<JwtModel>, LoginModel>({
      query: (loginData) => ({
        url: "/logInForAdmin",
        method: "POST",
        body: loginData,
      }),
    }),
    verifyJwt: build.mutation<ApiResponse<UserModel>, object>({
      query: (jwtData) => ({
        url: "/verifyJwtForAdmin",
        method: "POST",
        body: jwtData,
      }),
    }),
  }),
});

// Export hooks
export const { useLoginMutation, useVerifyJwtMutation } = authApi;
