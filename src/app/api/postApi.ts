import { createApi } from "@reduxjs/toolkit/query/react";
import { PostModel, TakePostModel } from "@/models/Post";
import baseQuery from "./config";
import { ApiResponse } from "@/models/User";

// Define our single API slice object
export const postApi = createApi({
  // All of our requests will have URLs starting with '/fakeApi'
  reducerPath: "postApi",
  baseQuery: baseQuery("/posts"),
  endpoints: (build) => ({
    getPosts: build.query<ApiResponse<PostModel[]>, void>({
      query: () => "",
    }),
    getPostsByCustomerId: build.query<ApiResponse<PostModel[]>, string>({
      query: (customerId) => `/customers/${customerId}`,
    }),
    getPostsByFreelancerId: build.query<ApiResponse<TakePostModel[]>, string>({
      query: (freelancerId) => `/freelancers/${freelancerId}`,
    }),
    getFreelancersByPostId: build.query<ApiResponse<TakePostModel[]>, string>({
      query: (postId) => `/${postId}/freelancers`,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetPostsQuery,
  useGetPostsByCustomerIdQuery,
  useGetFreelancersByPostIdQuery,
  useGetPostsByFreelancerIdQuery,
} = postApi;
