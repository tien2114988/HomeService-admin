import React from 'react';
import { PostModel, TakePostModel } from '@/models/Post';

import PostTable from '../../posts/components/PostTable';
import { UserRole } from '@/lib/constant';
import { useGetPostsByUserIdQuery } from '@/app/api/postApi';
import { toast } from '@/hooks/use-toast';

interface UserPostsProps {
  userId: string;
  userRole: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ userId, userRole }) => {
  const { data, isFetching, isError } = useGetPostsByUserIdQuery({
    userId: userId,
    isCustomer: userRole === UserRole.CUSTOMER,
  });

  let posts: PostModel[];

  const isTakePostModel = (
    items: PostModel[] | TakePostModel[],
  ): items is TakePostModel[] => {
    return items.length > 0 && 'post' in items[0]; // Kiểm tra thuộc tính đặc trưng của PostModel
  };

  if (!data?.items || isError) {
    posts = [];
  } else if (!isTakePostModel(data?.items)) {
    posts = data.items;
  } else {
    posts = data?.items.map(takePost => takePost.post);
  }

  if (isError) {
    toast({
      title: 'Thất bại',
      description: data?.message || 'Lỗi không xác định',
      variant: 'destructive',
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h3 className="text-lg font-medium text-teal-700 mb-4">
        Lịch sử công việc
      </h3>
      <PostTable posts={posts} loading={isFetching} />
    </div>
  );
};

export default UserPosts;
