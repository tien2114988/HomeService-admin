import { createApi } from '@reduxjs/toolkit/query/react';
import { PostModel, TakePostModel } from '@/models/Post';
import baseQuery from './config';
import { ApiResponse } from '@/models/User';

// Define our single API slice object
export const postApi = createApi({
  // All of our requests will have URLs starting with '/fakeApi'
  reducerPath: 'postApi',
  baseQuery: baseQuery('/posts'),
  endpoints: build => ({
    getPosts: build.query<ApiResponse<PostModel[]>, void>({
      query: () => '',
    }),
    getPostsByUserId: build.query<
      ApiResponse<PostModel[] | TakePostModel[]>,
      { userId: string; isCustomer: boolean }
    >({
      query: ({ userId, isCustomer }) =>
        `/${isCustomer ? 'customers' : 'freelancers'}/${userId}`,
    }),
    getFreelancersByPostId: build.query<ApiResponse<TakePostModel[]>, string>({
      query: postId => `/${postId}/freelancers`,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useGetFreelancersByPostIdQuery,
} = postApi;
