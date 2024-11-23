import React, { useEffect, useState } from 'react';
import { getAllPosts } from '@/services/postService';
import { PostModel } from '@/models/Post';

import PostTable from '../../posts/components/PostTable';

const PostList = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      const data = await getAllPosts();
      setPosts(data.items);
      setLoading(false); // End loading
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="text-xl font-medium mb-2">Quản lý đơn công việc</div>
      <PostTable posts={posts} loading={loading} />
    </div>
  );
};

export default PostList;
