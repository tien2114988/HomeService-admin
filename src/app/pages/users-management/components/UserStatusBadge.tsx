import { Badge } from '@/components/ui/badge';
import { getEnumValue, UserStatus } from '@/lib/enum';

interface UserStatusBadgeProps {
  status: string; // Chấp nhận kiểu unknown
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  return (
    <Badge
      className={`capitalize px-2 py-1 ${
        status == 'ACTIVE' ? 'bg-emerald-400' : 'bg-red-400'
      }`}
    >
      {getEnumValue(UserStatus, status)}
    </Badge>
  );
};

export default UserStatusBadge;
