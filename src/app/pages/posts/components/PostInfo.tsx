import React, { useState } from 'react';
import { PostModel } from '@/models/Post';
import { PaymentType, WorkType } from '@/lib/constant';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import PostStatusBadge from './PostStatusBadge';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PostInfoProps {
  post: PostModel; // Khai báo prop user có kiểu UserModel
}

const PostInfo: React.FC<PostInfoProps> = ({ post }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigateToCustomer = () => {
    navigate(`/users/${post.customer.id}`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl px-6">
      <div className="border-b py-6">
        <h3 className="text-lg font-medium text-teal-700 mb-4">
          Thông tin chi tiết
        </h3>
        <div className="grid grid-cols-3 gap-4 text-gray-600">
          <div>
            <span className="font-medium">Loại dịch vụ:</span>{' '}
            {WorkType[post.work.name as keyof typeof WorkType].value}
          </div>
          <div>
            <span className="font-medium">Mã đơn dịch vụ:</span> {post.id}
          </div>
          <div className="flex flex-row items-center">
            <div className="font-medium mr-2">Trạng thái:</div>
            <PostStatusBadge status={post.status} />
          </div>

          <div>
            <span className="font-medium">
              {post.babysitting ? 'Số trẻ' : 'Diện tích'}:
            </span>{' '}
            <span className="">
              {post.babysitting
                ? post.babysitting.numOfBaby
                : post.houseCleaning?.area + 'm^2'}
            </span>{' '}
            {post.babysitting && (
              <span
                onClick={openModal}
                className="text-cyan-600 underline cursor-pointer"
              >
                Chi tiết
              </span>
            )}
          </div>

          <div>
            <span className="font-medium">Giá dịch vụ:</span>{' '}
            <span className="text-lg text-green-600">
              {post.price.toLocaleString()} đ
            </span>
          </div>

          <div>
            <span className="font-medium">Hình thức thanh toán:</span>{' '}
            {PaymentType[post.paymentType as keyof typeof PaymentType].value}
          </div>
          <div>
            <span className="font-medium">Trạng thái thanh toán:</span>{' '}
            {post.payment ? 'Đã thanh toán' : 'Chưa thanh toán'}
          </div>
          <div>
            <span className="font-medium">Chọn freelancer:</span>{' '}
            {post.chooseFreelancer ? 'Khách hàng tự chọn' : 'Freelancer nhận'}
          </div>
          <div>
            <span className="font-medium">Ghi chú của khách hàng:</span>{' '}
            {post.customerNote}
          </div>
        </div>
      </div>
      <div className="border-b py-6">
        <h3 className="text-lg font-medium text-teal-700 mb-4">
          Thông tin khách hàng
        </h3>
        <div className="grid grid-cols-2 gap-4 text-gray-600">
          <div>
            <span className="font-medium">Tên khách hàng:</span>{' '}
            {post.address.customerName}
          </div>
          <div>
            <span className="font-medium">Số điện thoại:</span>{' '}
            {post.address.phoneNumber}
          </div>
          <div className="flex flex-row items-center">
            <div className="font-medium mr-2">Địa chỉ:</div>
            <MapPin className="text-red-600 mr-1" />
            <div>{post.address.detail}</div>
          </div>

          <div
            className="text-cyan-600 underline cursor-pointer"
            onClick={navigateToCustomer}
          >
            Xem chi tiết khách hàng
          </div>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
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
      </Dialog>
    </div>
  );
};

export default PostInfo;
