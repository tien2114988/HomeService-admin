import React, { useEffect, useState } from 'react';
import { PostModel } from '@/models/Post';

import PostTable from '../../posts/components/PostTable';
import { UserRole } from '@/lib/constant';
import {
  getPostsByCustomerId,
  getPostsByFreelancerId,
} from '@/services/postService';

interface UserPostsProps {
  userId: string;
  userRole: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ userId, userRole }) => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      if (userRole === UserRole.CUSTOMER) {
        const data = await getPostsByCustomerId(userId);
        setPosts(data.items);
      } else {
        const data = await getPostsByFreelancerId(userId);
        setPosts(data.items.map(takePost => takePost.post));
      }

      setLoading(false); // End loading
    };

    fetchData();
  }, []);

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
