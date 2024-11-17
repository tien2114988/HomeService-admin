import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { UserModel } from '@/models/User';
import { Img } from 'react-image';
import UserStatusBadge from '../components/UserStatusBadge';
import { Gender, getEnumValue } from '@/lib/enum';

const UserInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as { user: UserModel };
  const user = state?.user;

  if (!user) {
    return (
      <div className="text-center text-gray-500">
        Loading user information...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Thông tin tài khoản */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <Img
            src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            loader={<div>Loading...</div>}
          />

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500">
              {user.role === 'CUSTOMER' ? 'Khách hàng' : 'Freelancer'}
            </p>
            <p className="text-sm text-gray-500">{user.id}</p>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-teal-700 mb-4">
            Thông tin tài khoản
          </h3>
          <div className="grid grid-cols-4 gap-4 text-gray-600">
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Số dư tài khoản:</span>{' '}
              {parseFloat(user.balance).toLocaleString()} đ
            </p>
            <p>
              <span className="font-medium">Điểm uy tín:</span>{' '}
              {user.reputationPoint || 'Chưa có'}
            </p>
            <div className="flex flex-row items-center">
              <div className="font-medium mr-2">Trạng thái:</div>
              <UserStatusBadge status={user.status} />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-teal-700 mb-4">
            Thông tin cá nhân
          </h3>
          <div className="grid grid-cols-4 gap-4 text-gray-600">
            <p>
              <span className="font-medium">Số điện thoại:</span>{' '}
              {user.phoneNumber || '---'}
            </p>
            <p>
              <span className="font-medium">Ngày sinh:</span>{' '}
              {new Date(user.dob).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Giới tính:</span>{' '}
              {getEnumValue(Gender, user.gender)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
