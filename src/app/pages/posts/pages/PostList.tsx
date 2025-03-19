import { useGetPostsQuery } from "@/app/api/postApi";
import PostTable from "../../posts/components/PostTable";
import { toast } from "@/hooks/use-toast";

const PostList = () => {
  const { data, isFetching, isError } = useGetPostsQuery();

  const posts = isError || !data?.items ? [] : data.items;

  if (isError) {
    toast({
      title: "Thất bại",
      description: data?.message || "Lỗi không xác định",
      variant: "destructive",
    });
  }

  return (
    <div className="w-full">
      <div className="text-xl font-medium mb-2">Quản lý đơn công việc</div>
      <PostTable posts={posts} loading={isFetching} />
    </div>
  );
};

export default PostList;
