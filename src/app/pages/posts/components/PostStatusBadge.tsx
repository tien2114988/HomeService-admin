import { Badge } from '@/components/ui/badge';
import { PostStatus } from '@/lib/constant';

interface PostStatusBadgeProps {
  status: string; // Chấp nhận kiểu unknown
}

const PostStatusBadge: React.FC<PostStatusBadgeProps> = ({ status }) => {
  return (
    <Badge
      className={`text-center rounded-xl py-1 px-2 text-white pointer-events-none ${
        PostStatus[status as keyof typeof PostStatus].bgColor
      }`}
    >
      {PostStatus[status as keyof typeof PostStatus].value}
    </Badge>
  );
};

export default PostStatusBadge;
