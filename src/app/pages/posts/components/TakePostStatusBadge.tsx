import { Badge } from '@/components/ui/badge';
import { TakePostStatus } from '@/lib/constant';

interface TakePostStatusBadgeProps {
  status: string; // Chấp nhận kiểu unknown
}

const TakePostStatusBadge: React.FC<TakePostStatusBadgeProps> = ({
  status,
}) => {
  return (
    <Badge
      className={`text-center rounded-xl py-1 px-2 text-white pointer-events-none ${
        TakePostStatus[status as keyof typeof TakePostStatus].bgColor
      }`}
    >
      {TakePostStatus[status as keyof typeof TakePostStatus].value}
    </Badge>
  );
};

export default TakePostStatusBadge;
