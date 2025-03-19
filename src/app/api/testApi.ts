import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./config";
import { ApiResponse } from "@/models/User";
import { QuestionModel } from "@/models/Work";

export const testApi = createApi({
  reducerPath: "testApi",
  baseQuery: baseQuery("/tests"),
  tagTypes: ["Questions"], // Thêm tag để quản lý cache
  endpoints: (build) => ({
    getQuestions: build.query<ApiResponse<QuestionModel[]>, string>({
      query: (testId) => `/${testId}/questions`,
      providesTags: (result, error, testId) => [
        { type: "Questions", id: testId },
      ],
    }),
    addQuestion: build.mutation<
      ApiResponse<QuestionModel>,
      { testId: string; data: object }
    >({
      query: ({ testId, data }) => ({
        url: `/${testId}/questions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { testId }) => [
        { type: "Questions", id: testId },
      ],
    }),
    updateQuestion: build.mutation<
      ApiResponse<QuestionModel>,
      { id: string; testId: string; data: object }
    >({
      query: ({ id, data }) => ({
        url: `/questions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { testId }) => [
        { type: "Questions", id: testId },
      ],
    }),
    deleteQuestion: build.mutation<
      ApiResponse<null>,
      { id: string; testId: string }
    >({
      query: ({ id }) => ({
        url: `/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { testId }) => [
        { type: "Questions", id: testId },
      ],
    }),
  }),
});

// Export hooks
export const {
  useGetQuestionsQuery,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = testApi;
