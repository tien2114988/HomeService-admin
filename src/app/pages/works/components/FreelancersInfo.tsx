import React from 'react';

import { WorkModel } from '@/models/Work';
import RequestTable from '../../requests/components/RequestTable';

interface FreelancersInfoProps {
  work: WorkModel; // Khai báo prop user có kiểu UserModel
}

const FreelancersInfo: React.FC<FreelancersInfoProps> = ({ work }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl px-6">
      <div className="border-b py-6">
        <h3 className="text-lg font-medium text-teal-700 mb-4">
          Thông tin Freelancers đăng ký dịch vụ
        </h3>

        <RequestTable workId={work.id} />
      </div>
    </div>
  );
};

export default FreelancersInfo;
