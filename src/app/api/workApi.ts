import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./config";
import { ApiResponse } from "@/models/User";
import { FreelancerWorkModel, WorkModel } from "@/models/Work";

export const workApi = createApi({
  reducerPath: "workApi",
  baseQuery: baseQuery("/works"),
  tagTypes: ["Works"],
  endpoints: (build) => ({
    getAllWorks: build.query<ApiResponse<WorkModel[]>, void>({
      query: () => "",
      providesTags: ["Works"],
    }),
    updateWork: build.mutation<
      ApiResponse<WorkModel>,
      { id: string; data: object }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Works"],
    }),
    getRequests: build.query<ApiResponse<FreelancerWorkModel[]>, string | void>(
      {
        query: (id) => (id ? `/freelancers?id=${id}` : "/freelancers"),
      }
    ),
    updateRequest: build.mutation<
      ApiResponse<FreelancerWorkModel>,
      { workId: string; freelancerId: string; data: object }
    >({
      query: ({ workId, freelancerId, data }) => ({
        url: `/${workId}/freelancers/${freelancerId}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ workId, freelancerId, data }, { dispatch }) {
        try {
          // Cập nhật cache cho danh sách người dùng
          dispatch(
            workApi.util.updateQueryData("getRequests", undefined, (draft) => {
              if (draft?.items) {
                const index = draft.items.findIndex(
                  (request) =>
                    request.freelancer.id === freelancerId &&
                    request.work.id === workId
                );
                if (index !== -1) {
                  draft.items[index] = { ...draft.items[index], ...data };
                }
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
export const {
  useGetAllWorksQuery,
  useUpdateWorkMutation,
  useGetRequestsQuery,
  useUpdateRequestMutation,
} = workApi;
