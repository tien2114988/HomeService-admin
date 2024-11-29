import React from 'react';
import { UserModel } from '@/models/User';
import { WorkType } from '@/lib/constant';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FreelancerWorkModel } from '@/models/Work';
import FreelancerWorkStatusBadge from '../../requests/components/FreelancerWorkStatusBadge';

interface ProvidingWorkProps {
  user: UserModel; // Khai báo prop user có kiểu UserModel
}

const ProvidingWork: React.FC<ProvidingWorkProps> = ({ user }) => {
  const navigate = useNavigate();

  const navigateToRequest = (request: FreelancerWorkModel) => {
    request.freelancer = user;
    navigate(`/requests/${request.id}`, {
      state: { request },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl px-6">
      <div className="py-6">
        <h3 className="text-lg font-medium text-teal-700 mb-4">
          Các dịch vụ cung cấp
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.freelancerWorkServices.length > 0 ? (
            user.freelancerWorkServices.map(req => (
              <Card
                key={req.id}
                className="p-4 hover:shadow-lg cursor-pointer transition space-y-2"
                onClick={() => navigateToRequest(req)}
              >
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {WorkType[req.work.name as keyof typeof WorkType].value}
                  </h3>
                </div>
                <div className="text-gray-700">
                  <span className="font-semibold">Mã dịch vụ: </span>{' '}
                  {req.work.id}
                </div>
                <FreelancerWorkStatusBadge status={req.status} />
              </Card>
            ))
          ) : (
            <div>Chưa đăng ký cung cấp dịch vụ nào</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProvidingWork;
