import React, { useState } from 'react';
import { TestModel } from '@/models/Work';
import { Input } from '@/components/ui/input'; // Shadcn Input
import { Button } from '@/components/ui/button'; // Shadcn Button
import { toast } from '@/hooks/use-toast';
import { updateWork } from '@/services/workService';
import { ClipLoader } from 'react-spinners';

import QuestionList from './QuestionList';

interface PostInfoProps {
  workId: string;
  test: TestModel;
  setTest: (newTest: TestModel) => void;
}

const TestInfo: React.FC<PostInfoProps> = ({ workId, test, setTest }) => {
  const [testDuration, setTestDuration] = useState<number | ''>('');
  const [passedPoint, setPassedPoint] = useState<number | ''>('');
  const [questionCount, setQuestionCount] = useState<number | ''>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [edit, setEdit] = useState<boolean>(false);

  const handleEdit = () => {
    setTestDuration(test.testDuration);
    setPassedPoint(test.passedPoint);
    setQuestionCount(test.questionCount);
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleCreateTest = async () => {
    if (
      testDuration &&
      passedPoint &&
      questionCount &&
      testDuration >= 0 &&
      passedPoint >= 0 &&
      questionCount >= 0
    ) {
      const data = {
        createTestDto: {
          testDuration: Number(testDuration),
          passedPoint: Number(passedPoint),
          questionCount: Number(questionCount),
        },
      };
      setLoading(true);
      const res = await updateWork(workId, data);
      setLoading(false);
      if (res.returnCode == 1000) {
        setTest(res.items.test);
        toast({
          title: 'Thành công',
          description: 'Cập nhật bài test thành công',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Cập nhật bài test thất bại',
          description: res.message,
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Điền sai thông tin',
        description: 'Các thông tin phải điền đầy đủ và lớn hơn 0 !!!!',
      });
    }

    if (edit) {
      setEdit(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl px-6">
      <div className="border-b py-6">
        <h3 className="text-lg font-medium text-teal-700 mb-4">
          Thông tin bài test đầu vào
        </h3>
        {!edit && test ? (
          <>
            <div className="grid grid-cols-4 gap-4 text-gray-600">
              <div>
                <span className="font-medium">Thời lượng làm bài:</span>{' '}
                {test.testDuration} phút
              </div>
              <div>
                <span className="font-medium">Số lượng câu hỏi:</span>{' '}
                {test.questionCount}
              </div>
              <div>
                <span className="font-medium">Điểm tiêu chuẩn:</span>{' '}
                {test.passedPoint}
              </div>
            </div>
            <Button
              disabled={loading}
              className="mt-4 bg-teal-600 hover:bg-teal-700 text-white"
              onClick={handleEdit}
            >
              Chỉnh sửa
            </Button>
          </>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-3 text-gray-4 gap-8">
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  Thời lượng làm bài (phút)
                </label>
                <Input
                  type="number"
                  min={0}
                  value={testDuration}
                  onChange={e => setTestDuration(e.target.valueAsNumber || '')}
                  placeholder="Nhập thời lượng"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  Số lượng câu hỏi
                </label>
                <Input
                  min={0}
                  type="number"
                  value={questionCount}
                  onChange={e => setQuestionCount(e.target.valueAsNumber || '')}
                  placeholder="Nhập số lượng câu hỏi"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  Điểm tiêu chuẩn
                </label>
                <Input
                  min={0}
                  type="number"
                  value={passedPoint}
                  onChange={e => setPassedPoint(e.target.valueAsNumber || '')}
                  placeholder="Nhập điểm tiêu chuẩn"
                />
              </div>
            </div>
            {edit ? (
              <div className="flex flex-row space-x-2">
                <Button
                  disabled={loading}
                  className="bg-gray-400 hover:bg-gray-500 text-white"
                  onClick={handleCancel}
                >
                  Hủy
                </Button>
                <Button
                  disabled={loading}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={handleCreateTest}
                >
                  Cập nhật
                  {loading && (
                    <ClipLoader size={16} color="white" className="mr-2" />
                  )}
                </Button>
              </div>
            ) : (
              <Button
                disabled={loading}
                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white"
                onClick={handleCreateTest}
              >
                Tạo bài test
                {loading && (
                  <ClipLoader size={16} color="white" className="mr-2" />
                )}
              </Button>
            )}
          </div>
        )}
      </div>

      {test && <QuestionList test={test} />}
    </div>
  );
};

export default TestInfo;
