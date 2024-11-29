import React from 'react';
import { WorkType } from '@/lib/constant';
import { useNavigate } from 'react-router-dom';

import { FreelancerWorkModel } from '@/models/Work';
import FreelancerWorkStatusBadge from './FreelancerWorkStatusBadge';
import { Img } from 'react-image';

interface RequestInfoProps {
  request: FreelancerWorkModel; // Khai báo prop user có kiểu UserModel
}

const RequestInfo: React.FC<RequestInfoProps> = ({ request }) => {
  const navigate = useNavigate();
  const navigateToFreelancer = () => {
    navigate(`/users/${request.freelancer.id}`, {
      state: { user: request.freelancer },
    });
  };

  const navigateToWork = () => {
    navigate(`/works/${request.work.id}`, {
      state: { work: request.work },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl px-6">
      <div className="border-b py-6">
        <h3 className="text-lg font-medium text-teal-700 mb-4">
          Thông tin chi tiết
        </h3>

        <div className="flex flex-row space-x-6">
          <Img
            src={
              'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/169183/Originals/fba1a1bb-1-1.jpg'
            }
            alt="Avatar"
            className="w-96 h-80 rounded object-cover"
            loader={<div>Loading...</div>}
          />
          <div className="grid grid-cols-2 gap-x-4 items-center">
            <div className="flex flex-row space-x-2">
              <div className="font-medium">Mã đăng ký:</div>
              <div>{request.id}</div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="font-medium">Trạng thái:</div>
              <FreelancerWorkStatusBadge status={request.status} />
            </div>
            <div className="flex flex-row space-x-2">
              <div className="font-medium">Mã freelancer:</div>
              <div>{request.freelancer.id}</div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="font-medium">Freelancer:</div>
              <div
                onClick={navigateToFreelancer}
                className="cursor-pointer text-cyan-600 hover:text-cyan-800"
              >
                {request.freelancer.name}
              </div>{' '}
            </div>
            <div className="flex flex-row space-x-2">
              <div className="font-medium">Mã dịch vụ đăng ký:</div>
              <div>{request.work.id}</div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="font-medium">Tên dịch vụ:</div>
              <div
                onClick={navigateToWork}
                className="cursor-pointer text-cyan-600 hover:text-cyan-800"
              >
                {WorkType[request.work.name as keyof typeof WorkType].value}
              </div>
            </div>
            <div>
              <div className="font-medium">
                Mô tả của freelancer cho dịch vụ:
              </div>
              <div>{request.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestInfo;
