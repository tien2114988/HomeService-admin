import React, { useEffect, useState } from 'react';
import { ChoiceModel, QuestionModel, TestModel } from '@/models/Work';
import { Input } from '@/components/ui/input'; // Shadcn Input
import { Button } from '@/components/ui/button'; // Shadcn Button
import { toast } from '@/hooks/use-toast';
import { ClipLoader } from 'react-spinners';
import { Card } from '@/components/ui/card';
import QuestionTypeBadge from './QuestionTypeBadge';
import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  Dialog,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  addQuestion,
  deleteQuestion,
  getQuestions,
  updateQuestion,
} from '@/services/testService';
import { Edit, Trash2, CircleCheckBig } from 'lucide-react';
import { QuestionType } from '@/lib/constant';
import { Skeleton } from '@/components/ui/skeleton';

interface QuestionListProps {
  test: TestModel;
}

const QuestionList: React.FC<QuestionListProps> = ({ test }) => {
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [showAddQuestionDialog, setShowAddQuestionDialog] = useState(false);
  const [showDeleteQuestionDialog, setShowDeleteQuestionDialog] =
    useState(false);
  const [newQuestion, setNewQuestion] = useState<Partial<QuestionModel>>({
    content: '',
    type: 'MULTICHOICE',
  });
  const [deleteQuestionId, setDeleteQuestionId] = useState<string>('');
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [newOption, setNewOption] = useState<string>('');

  const handleAddOption = () => {
    if (newOption.trim()) {
      const newChoice: ChoiceModel = {
        id: '_' + Date.now().toString(),
        content: newOption.trim(),
        deleted: false,
        answer: false,
      };
      const updatedChoices: ChoiceModel[] = [
        ...(newQuestion.choices || []),
        newChoice,
      ];
      setNewQuestion({ ...newQuestion, choices: updatedChoices });
      setNewOption('');
    }
  };

  const handleSetAnswer = (id?: string) => {
    const updatedChoices =
      newQuestion.choices?.map(choice =>
        choice.id === id
          ? { ...choice, answer: true }
          : { ...choice, answer: false },
      ) || [];
    setNewQuestion({ ...newQuestion, choices: updatedChoices });
  };

  const handleDeleteOption = (id?: string) => {
    let updatedChoices;
    if (id?.startsWith('_')) {
      updatedChoices =
        newQuestion.choices?.filter(choice => choice.id !== id) || [];
    } else {
      updatedChoices =
        newQuestion.choices?.map(choice =>
          choice.id === id ? { ...choice, deleted: true } : choice,
        ) || [];
    }
    setNewQuestion({ ...newQuestion, choices: updatedChoices });
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const res = await getQuestions(test.id);
      setLoading(false);
      if (res.returnCode == 1000) {
        setQuestions(res.items);
      } else {
        toast({
          title: 'Tải câu hỏi thất bại',
          description: res.message,
          variant: 'destructive',
        });
      }
    };
    fetchQuestions();
  }, []);

  const handleAddQuestion = () => {
    setNewQuestion({ content: '', type: 'MULTICHOICE' });
    setEdit(false);
    setShowAddQuestionDialog(true);
  };

  const handleEditQuestion = (question: QuestionModel) => {
    setNewQuestion(question);
    setEdit(true);
    setShowAddQuestionDialog(true);
  };

  const handleDeleteQuestion = async () => {
    setSaveLoading(true);
    const res = await deleteQuestion(deleteQuestionId);
    setSaveLoading(false);
    if (res.returnCode == 1000) {
      const updatedQuestions = questions.filter(q => q.id !== deleteQuestionId);
      setQuestions(updatedQuestions);
      toast({
        title: 'Thành công',
        description: 'Xóa câu hỏi thành công',
        variant: 'success',
      });
    } else {
      toast({
        title: 'Thất bại',
        description: res.message,
        variant: 'destructive',
      });
    }
    setShowDeleteQuestionDialog(false);
  };

  const handleOpenDeleteQuestionDialog = (id: string) => {
    setDeleteQuestionId(id);
    setShowDeleteQuestionDialog(true);
  };

  const handleSaveQuestion = async () => {
    const newQuestionData =
      newQuestion.type === QuestionType['MULTICHOICE'].key
        ? {
            ...newQuestion,
            choices: newQuestion.choices?.map(choice =>
              choice.id?.startsWith('_') ? { ...choice, id: null } : choice,
            ),
          }
        : {
            ...newQuestion,
            choices: [],
          };

    console.log(newQuestionData);

    if (edit && newQuestionData.id) {
      // Update existing question
      setSaveLoading(true);
      const { id, ...updatedData } = newQuestionData;
      const res = await updateQuestion(id, updatedData);
      setSaveLoading(false);

      if (res.returnCode == 1000) {
        const updatedQuestions = questions.map(q =>
          q.id === res.items.id ? { ...res.items } : q,
        );

        setQuestions(updatedQuestions);
        toast({
          title: 'Thành công',
          description: 'Cập nhật câu hỏi thành công',
          variant: 'success',
        });
      } else {
        console.log(res.message);
        toast({
          title: 'Cập nhật câu hỏi thất bại',
          description: res.message,
          variant: 'destructive',
        });
      }
    } else {
      setSaveLoading(true);
      const res = await addQuestion(test.id, newQuestionData);
      setSaveLoading(false);

      if (res.returnCode == 1000) {
        setQuestions([...questions, res.items]);
        toast({
          title: 'Thành công',
          description: 'Thêm câu hỏi thành công',
          variant: 'success',
        });
      } else {
        console.log(res.message);
        toast({
          title: 'Thêm câu hỏi thất bại',
          description: res.message,
          variant: 'destructive',
        });
      }
    }
    setShowAddQuestionDialog(false);
  };

  const filteredQuestions = questions.filter(q =>
    q.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <div className="border-b py-6">
        <h3 className="text-lg font-medium text-teal-700 mb-4">
          Danh sách câu hỏi
        </h3>
        <Input
          placeholder="Tìm kiếm câu hỏi..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="mb-4 w-1/2"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonQuestion key={index} /> // Hiển thị skeleton khi đang load
            ))
          ) : filteredQuestions.length > 0 ? (
            filteredQuestions.map((question, i) => (
              <Card key={i} className="p-4 transition space-y-2 relative">
                <div className="flex flex-row space-x-2">
                  <div className="font-medium">Câu hỏi: </div>
                  <div>{question.content}</div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <QuestionTypeBadge status={question.type} />
                  <div className="flex flex-row space-x-2">
                    <Edit
                      onClick={() => handleEditQuestion(question)}
                      size={20}
                      className="text-emerald-500 hover:text-emerald-700 cursor-pointer"
                    />
                    <Trash2
                      onClick={() =>
                        handleOpenDeleteQuestionDialog(question.id)
                      }
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      size={20}
                    />
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div>Chưa có câu hỏi</div>
          )}
        </div>
        <Button
          className="mt-4 bg-teal-600 hover:bg-teal-700 text-white"
          onClick={handleAddQuestion}
        >
          Thêm câu hỏi
        </Button>
      </div>

      {/* Dialog for Add/Edit Question */}
      <Dialog
        open={showAddQuestionDialog}
        onOpenChange={setShowAddQuestionDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              {edit ? 'Sửa câu hỏi' : 'Thêm câu hỏi'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Loại câu hỏi
              </label>
              <Select
                value={newQuestion.type}
                onValueChange={value =>
                  setNewQuestion({ ...newQuestion, type: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn loại câu hỏi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MULTICHOICE">
                    {QuestionType['MULTICHOICE'].value}
                  </SelectItem>
                  <SelectItem value="ESSAY">
                    {QuestionType['ESSAY'].value}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Nội dung
              </label>
              <Input
                value={newQuestion.content || ''}
                onChange={e =>
                  setNewQuestion({ ...newQuestion, content: e.target.value })
                }
                placeholder="Nhập nội dung câu hỏi"
              />
            </div>
            {newQuestion.type === 'MULTICHOICE' && (
              <div className="space-y-2">
                <div className="font-medium text-gray-700">
                  Danh sách lựa chọn
                </div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {newQuestion.choices &&
                    newQuestion.choices.length > 0 &&
                    newQuestion.choices
                      .filter(option => !option.deleted)
                      .map(option => (
                        <div
                          key={option.id}
                          className="flex items-center justify-between space-x-2"
                        >
                          <Input
                            value={option.content}
                            onChange={e =>
                              setNewQuestion({
                                ...newQuestion,
                                choices: newQuestion.choices?.map(o =>
                                  o.id === option.id
                                    ? { ...o, content: e.target.value }
                                    : o,
                                ),
                              })
                            }
                          />
                          {option.answer ? (
                            <CircleCheckBig
                              size={20}
                              className="text-emerald-500"
                            />
                          ) : (
                            <Edit
                              onClick={() => handleSetAnswer(option.id)}
                              size={20}
                              className="text-blue-500 hover:text-blue-700 cursor-pointer"
                            />
                          )}

                          <Trash2
                            onClick={() => handleDeleteOption(option.id)}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          />
                        </div>
                      ))}
                </div>
                <div className="flex items-center mt-4 space-x-2">
                  <Input
                    placeholder="Thêm lựa chọn mới"
                    value={newOption}
                    onChange={e => setNewOption(e.target.value)}
                  />
                  <Button className="bg-gray-500" onClick={handleAddOption}>
                    Thêm
                  </Button>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddQuestionDialog(false)}
            >
              Hủy
            </Button>
            <Button
              onClick={handleSaveQuestion}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Lưu
              {saveLoading && (
                <ClipLoader size={16} color="white" className="mr-2" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showDeleteQuestionDialog}
        onOpenChange={setShowDeleteQuestionDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Xóa câu hỏi</DialogTitle>
          </DialogHeader>
          <div>Bạn có chắc chắn muốn xóa câu hỏi ?</div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteQuestionDialog(false)}
            >
              Hủy
            </Button>
            <Button
              onClick={handleDeleteQuestion}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Xóa
              {saveLoading && (
                <ClipLoader size={16} color="white" className="mr-2" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Skeleton cho Card
const SkeletonQuestion: React.FC = () => (
  <div className="shadow-md p-4 rounded-lg">
    <Skeleton className="h-6 w-2/3 mb-2 rounded" />
    <Skeleton className="h-4 w-5/6 mb-4 rounded" />
  </div>
);

export default QuestionList;
