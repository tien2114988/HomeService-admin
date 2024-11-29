import React from 'react';
import { WorkType } from '@/lib/constant';

import { WorkModel } from '@/models/Work';
import { Img } from 'react-image';

interface PostInfoProps {
  work: WorkModel; // Khai báo prop user có kiểu UserModel
}

const WorkInfo: React.FC<PostInfoProps> = ({ work }) => {
  //   const navigate = useNavigate();
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const navigateToCustomer = () => {
  //     navigate(`/users/${post.customer.id}`, {
  //       state: { user: post.customer },
  //     });
  //   };

  //   const openModal = () => {
  //     setIsModalOpen(true);
  //   };

  //   const closeModal = () => {
  //     setIsModalOpen(false);
  //   };

  return (
    <div className="bg-white rounded-lg shadow-xl px-6">
      <div className="border-b py-6">
        <h3 className="text-lg font-medium text-teal-700 mb-4">
          Thông tin chi tiết
        </h3>

        <div className="flex flex-row justify-between space-x-6">
          <Img
            src={work.image}
            alt="Avatar"
            className="w-96 h-96 rounded object-cover"
            loader={<div>Loading...</div>}
          />
          <div className="space-y-5">
            <div className="flex flex-row space-x-2">
              <div className="font-medium">Mã dịch vụ:</div>
              <div>{work.id}</div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="font-medium">Tên dịch vụ:</div>
              <div>{WorkType[work.name as keyof typeof WorkType].value}</div>
            </div>
            <div>
              <div className="font-medium">Mô tả dịch vụ:</div>
              <div>{work.description}</div>
            </div>
          </div>
        </div>
      </div>

      {/* <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="w-72">
          <DialogHeader className="flex flex-row justify-center item-centers">
            <DialogTitle>Thông Tin từng trẻ</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {post.babysitting?.babies && post.babysitting?.babies.length > 0 ? (
              post.babysitting.babies.map((baby, i) => (
                <p>
                  <strong>Trẻ {i + 1}:</strong> {baby.age} tuổi
                </p>
              ))
            ) : (
              <div>Không có thông tin trẻ</div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={closeModal}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default WorkInfo;
