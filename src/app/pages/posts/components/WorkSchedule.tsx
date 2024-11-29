import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PostModel, WorkScheduleModel } from '@/models/Post';
import { PackageName } from '@/lib/constant';
import WorkScheduleStatusBadge from './WorkScheduleStatusBadge';
import moment from 'moment';

interface WorkScheduleProps {
  post: PostModel;
}

const WorkSchedule: React.FC<WorkScheduleProps> = ({ post }) => {
  const [selectedWorkSchedule, setSelectedWorkSchedule] =
    useState<WorkScheduleModel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   const openModal = (WorkSchedule: WorkScheduleModel) => {
  //     setSelectedWorkSchedule(WorkSchedule);
  //     setIsModalOpen(true);
  //   };

  const closeModal = () => {
    setSelectedWorkSchedule(null);
    setIsModalOpen(false);
  };

  // Sắp xếp địa chỉ mặc định lên đầu
  const sortedWorkSchedules = [...post.workSchedules].sort((a, b) => {
    const dateA = new Date(a.date.join('-')); // Chuyển mảng [Year, Month, Day] thành chuỗi và rồi thành Date
    const dateB = new Date(b.date.join('-'));

    return dateA.getTime() - dateB.getTime(); // So sánh theo timestamp, giảm dần
  });

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h3 className="text-lg font-medium text-teal-700 mb-4">Lịch làm việc</h3>
      <div className="grid grid-cols-3 gap-4 text-gray-600 pb-4">
        <div>
          <span className="font-medium">Loại gói:</span>{' '}
          {PackageName[post.packageName as keyof typeof PackageName].value}
        </div>
        <div>
          <span className="font-medium">Số ngày đã làm:</span>{' '}
          {post.numOfWorkedDay} / {post.totalWorkDay}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
        {sortedWorkSchedules.map(workSchedule => (
          <Card
            key={workSchedule.id}
            className="p-4 transition space-y-2"
            // onClick={() => openModal(workSchedule)}
          >
            <div className="flex flex-row justify-between items-center">
              <h3 className="font-semibold">
                {moment([
                  workSchedule.date[0],
                  workSchedule.date[1] - 1,
                  workSchedule.date[2],
                ])?.format('DD/MM/YYYY')}
              </h3>
              <WorkScheduleStatusBadge status={workSchedule.status} />
            </div>

            <div className="text-gray-600">
              <span className="font-medium">Giờ bắt đầu:</span> {post.startTime}
            </div>

            <div className="text-gray-600">
              <span className="font-medium">Thời gian làm:</span>{' '}
              {post.duration} phút
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader className="flex flex-row justify-center item-centers">
            <DialogTitle>Thông Tin người làm</DialogTitle>
          </DialogHeader>
          {selectedWorkSchedule && (
            <div className="space-y-3">
              <p>
                <strong>ID:</strong> {selectedWorkSchedule.date}
              </p>
              <p>
                <strong>Tên:</strong> {selectedWorkSchedule.status}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={closeModal}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkSchedule;
