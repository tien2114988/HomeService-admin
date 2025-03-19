import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./config";
import { ApiResponse, UserModel } from "@/models/User";

// Define API slice
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery("/users"),
  endpoints: (build) => ({
    getUsers: build.query<ApiResponse<UserModel[]>, void>({
      query: () => "",
    }),
    getUserById: build.query<ApiResponse<UserModel>, string>({
      query: (id) => `/${id}`,
    }),

    updateUser: build.mutation<
      ApiResponse<UserModel>,
      { userId: string; userData: object }
    >({
      query: ({ userId, userData }) => ({
        url: `/${userId}`,
        method: "PATCH",
        body: userData,
      }),
      async onQueryStarted({ userId, userData }, { dispatch }) {
        try {
          // Cập nhật cache cho danh sách người dùng
          dispatch(
            userApi.util.updateQueryData("getUsers", undefined, (draft) => {
              if (draft?.items) {
                const index = draft.items.findIndex(
                  (user) => user.id === userId
                );
                if (index !== -1) {
                  draft.items[index] = { ...draft.items[index], ...userData };
                }
              }
            })
          );
          // Cập nhật cache cho getUserById
          dispatch(
            userApi.util.updateQueryData("getUserById", userId, (draft) => {
              if (draft?.items) {
                draft.items = { ...draft.items, ...userData };
              }
            })
          );
        } catch (error) {
          console.error("Lỗi cập nhật cache:", error);
        }
      },
    }),
  }),
});

// Export hooks
export const { useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation } =
  userApi;
