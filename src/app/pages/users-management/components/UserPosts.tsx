import React, { useEffect, useState } from "react";
import { PostModel } from "@/models/Post";

import PostTable from "../../posts/components/PostTable";
import { UserRole } from "@/lib/constant";
import {
  useGetPostsByCustomerIdQuery,
  useGetPostsByFreelancerIdQuery,
} from "@/app/api/postApi";
import { toast } from "@/hooks/use-toast";

interface UserPostsProps {
  userId: string;
  userRole: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ userId, userRole }) => {
  let posts: PostModel[] = [];
  let loading;
  let error;
  let res;

  if (userRole === UserRole.CUSTOMER) {
    const { data, isFetching, isError } = useGetPostsByCustomerIdQuery(userId);
    error = isError;
    posts = data?.items && !error ? data.items : [];
    loading = isFetching;
    res = data;
  } else {
    const { data, isFetching, isError } =
      useGetPostsByFreelancerIdQuery(userId);
    error = isError;
    loading = isFetching;
    posts =
      data?.items && !error ? data?.items.map((takePost) => takePost.post) : [];
    res = data;
  }

  if (error) {
    toast({
      title: "Thất bại",
      description: res?.message || "Lỗi không xác định",
      variant: "destructive",
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h3 className="text-lg font-medium text-teal-700 mb-4">
        Lịch sử công việc
      </h3>
      <PostTable posts={posts} loading={loading} />
    </div>
  );
};

export default UserPosts;
