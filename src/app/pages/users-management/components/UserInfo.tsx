import React from 'react';
import { UserModel } from '@/models/User';
import { Img } from 'react-image';
import UserStatusBadge from '../components/UserStatusBadge';
import { Gender, getEnumValue } from '@/lib/enum';
import moment from 'moment';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Address from './Address';
import { normalizeCreatedAt } from '@/lib/utils';

interface UserInfoProps {
  user: UserModel; // Khai báo prop user có kiểu UserModel
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl px-6">
      <div className="border-b py-6">
        <h3 className="text-lg font-medium text-teal-700 mb-4">
          Thông tin tài khoản
        </h3>
        <div className="grid grid-cols-4 gap-4 text-gray-600">
          <div>
            <span className="font-medium">Ngày tạo:</span>{' '}
            {moment(normalizeCreatedAt(user.createdAt))?.format(
              'DD/MM/YYYY HH:mm:ss',
            )}
          </div>
          <div>
            <span className="font-medium">Số dư tài khoản:</span>{' '}
            {parseFloat(user.balance).toLocaleString()} đ
          </div>
          <div>
            <span className="font-medium">Điểm uy tín:</span>{' '}
            {user.reputationPoint || 'Chưa có'}
          </div>
          <div className="flex flex-row items-center">
            <div className="font-medium mr-2">Trạng thái:</div>
            <UserStatusBadge status={user.status} />
          </div>
        </div>
      </div>
      <div className="border-b py-6">
        <h3 className="text-lg font-medium text-teal-700 mb-4">
          Thông tin cá nhân
        </h3>
        <div className="grid grid-cols-4 gap-4 text-gray-600">
          <div>
            <span className="font-medium">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-medium">Số điện thoại:</span>{' '}
            {user.phoneNumber || '---'}
          </div>
          <div>
            <span className="font-medium">Ngày sinh:</span>{' '}
            {user.dob ? moment(user.dob)?.format('DD/MM/YYYY') : '...'}
          </div>
          <div>
            <span className="font-medium">Giới tính:</span>{' '}
            {getEnumValue(Gender, user.gender)}
          </div>
          <div className="flex flex-row items-center space-x-2">
            <div className="font-medium">Tài khoản ngân hàng: </div>
            <div className="flex flex-row items-center space-x-1">
              {user.bankAccount ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Img
                          src={
                            user.bankAccount?.bank.logo
                              ? user.bankAccount?.bank.logo
                              : ''
                          }
                          alt="Bank"
                          className="w-8 h-8 rounded-full object-cover"
                          loader={<div>Loading...</div>}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{user.bankAccount?.bank.fiName}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                'Chưa cập nhật'
              )}

              <div>{user.bankAccount?.accountNumber}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6">
        <h3 className="text-lg font-medium text-teal-700 mb-4">
          Danh Sách Địa Chỉ
        </h3>
        <Address addresses={user.addresses} />
      </div>
    </div>
  );
};

export default UserInfo;
