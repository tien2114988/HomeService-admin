import { Badge } from '@/components/ui/badge';
import { WorkScheduleStatus } from '@/lib/constant';

interface WorkScheduleStatusBadgeProps {
  status: string; // Chấp nhận kiểu unknown
}

const WorkScheduleStatusBadge: React.FC<WorkScheduleStatusBadgeProps> = ({
  status,
}) => {
  return (
    <Badge
      className={`text-center rounded-xl py-1 px-2 text-white pointer-events-none ${
        WorkScheduleStatus[status as keyof typeof WorkScheduleStatus].bgColor
      }`}
    >
      {WorkScheduleStatus[status as keyof typeof WorkScheduleStatus].value}
    </Badge>
  );
};

export default WorkScheduleStatusBadge;
