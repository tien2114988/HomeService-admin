import { Badge } from '@/components/ui/badge';
import { QuestionType } from '@/lib/constant';

interface QuestionTypeBadgeProps {
  status: string; // Chấp nhận kiểu unknown
}

const QuestionTypeBadge: React.FC<QuestionTypeBadgeProps> = ({ status }) => {
  return (
    <Badge
      className={`text-center rounded-xl py-1 px-2 text-white pointer-events-none ${
        QuestionType[status as keyof typeof QuestionType].bgColor
      }`}
    >
      {QuestionType[status as keyof typeof QuestionType].value}
    </Badge>
  );
};

export default QuestionTypeBadge;
