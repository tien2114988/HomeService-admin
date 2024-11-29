import { Badge } from '@/components/ui/badge';
import { FreelancerWorkStatus } from '@/lib/constant';

interface FreelancerWorkStatusBadgeProps {
  status: string; // Chấp nhận kiểu unknown
}

const FreelancerWorkStatusBadge: React.FC<FreelancerWorkStatusBadgeProps> = ({
  status,
}) => {
  return (
    <Badge
      className={`text-center rounded-xl py-1 px-2 text-white pointer-events-none ${
        FreelancerWorkStatus[status as keyof typeof FreelancerWorkStatus]
          .bgColor
      }`}
    >
      {FreelancerWorkStatus[status as keyof typeof FreelancerWorkStatus].value}
    </Badge>
  );
};

export default FreelancerWorkStatusBadge;
