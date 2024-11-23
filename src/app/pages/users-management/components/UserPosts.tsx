import React, { useEffect, useState } from 'react';
import { getPostsByUserId } from '@/services/postService';
import { PostModel } from '@/models/Post';

import PostTable from '../../posts/components/PostTable';

interface UserPostsProps {
  userId: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ userId }) => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      const data = await getPostsByUserId(userId);
      setPosts(data.items);
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
