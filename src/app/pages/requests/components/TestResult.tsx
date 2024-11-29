import React from 'react';
import { FreelancerWorkModel } from '@/models/Work';
import { Separator } from '@/components/ui/separator';
import { cn, normalizeCreatedAt } from '@/lib/utils';
import moment from 'moment';
import { Check, X } from 'lucide-react';
import { QuestionType } from '@/lib/constant';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';

interface TestResultProps {
  request: FreelancerWorkModel;
}

const TestResult: React.FC<TestResultProps> = ({ request }) => {
  const testResult = request.testResult;

  if (!testResult) {
    return (
      <div className="bg-white rounded-lg shadow-xl px-6 py-4 text-center">
        <h3 className="text-lg font-medium text-red-500">
          Không tìm thấy kết quả bài test.
        </h3>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl px-6">
      <div className="border-b py-6">
        <h3 className="text-lg font-medium text-teal-700 mb-4">
          Kết quả bài test
        </h3>
        <div className="grid grid-cols-3 gap-4 text-gray-600">
          <div>
            <span className="font-medium">Số câu trắc nghiệm đúng:</span>{' '}
            {testResult.numOfCorrectAnswers}
          </div>
          <div>
            <span className="font-medium">Bắt đầu:</span>{' '}
            {moment(normalizeCreatedAt(testResult.startTime)).format(
              'DD/MM/YYYY HH:mm:ss',
            )}
          </div>
          <div>
            <span className="font-medium">Kết thúc:</span>{' '}
            {moment(normalizeCreatedAt(testResult.endTime)).format(
              'DD/MM/YYYY HH:mm:ss',
            )}
          </div>

          {/* <div>
            <span className="font-medium">Điểm:</span> {testResult.point}
          </div> */}
        </div>

        <div className="mt-6">
          <h4 className="text-md font-semibold text-teal-700 mb-4">
            Chi tiết bài làm
          </h4>
          <Separator className="mb-4" />

          <div className="overflow-y-auto max-h-[300px]">
            {testResult.answerForQuestions.map((answer, index) => (
              <div key={index} className="py-4 border-b">
                <div className="flex items-start gap-2 mb-2">
                  <span className="font-semibold">Câu {index + 1}:</span>
                  <span>{answer.question.content}</span>
                  {answer.question.type === QuestionType['MULTICHOICE'].key && (
                    <div>
                      {answer.correct ? (
                        <Check className="text-green-500" />
                      ) : (
                        <X className="text-red-500" />
                      )}
                    </div>
                  )}
                </div>

                {answer.question.type === QuestionType['MULTICHOICE'].key ? (
                  <RadioGroup className="space-y-2">
                    {answer.question.choices.map(choice => (
                      <div
                        key={choice.id}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          id={`choice-${choice.id}`}
                          value={choice.id ? choice.id : ''}
                          disabled
                          checked={answer.choice?.id === choice.id}
                        />
                        <label
                          htmlFor={`choice-${choice.id}`}
                          className={cn(
                            'text-sm flex items-center space-x-2',
                            choice.answer
                              ? 'font-bold text-green-600'
                              : 'text-gray-700',
                          )}
                        >
                          <div>{choice.content}</div>
                          {choice.answer && (
                            <Badge className="bg-green-400 text-center rounded-xl py-1 px-2 text-white pointer-events-none">
                              Đáp án
                            </Badge>
                          )}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div>{answer.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
