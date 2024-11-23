import { Badge } from '@/components/ui/badge';
import { UserStatus } from '@/lib/constant';

interface UserStatusBadgeProps {
  status: string; // Chấp nhận kiểu unknown
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  return (
    <Badge
      className={`text-center rounded-xl py-1 px-2 text-white pointer-events-none ${
        UserStatus[status as keyof typeof UserStatus].bgColor
      }`}
    >
      {UserStatus[status as keyof typeof UserStatus].value}
    </Badge>
  );
};

export default UserStatusBadge;
