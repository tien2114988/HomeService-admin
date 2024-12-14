import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserModel } from '@/models/User';
import UserInfo from '../components/UserInfo';
import { Img } from 'react-image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/lib/constant';
import UserPosts from '../components/UserPosts';
import BreadCrumb from '@/app/layout/components/breadcrumb/BreadCrumb';
import ProvidingWork from '../components/ProvidingWork';
import { getUserById } from '@/services/userService';

const UserDetail: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserModel>();
  // const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      // setLoading(true); // Start loading
      if (id) {
        const data = await getUserById(id);
        setUser(data.items);
      }
      // setLoading(false); // End loading
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="text-center text-gray-500">
        Loading user information...
      </div>
    );
  }

  return (
    <>
      <BreadCrumb
        links={[
          { label: 'Quản lý người dùng', href: '/users/' },
          { label: `${user.name}`, href: '' },
        ]}
      />
      <div className="min-h-screen space-y-5">
        {/* Thông tin tài khoản */}
        <div className="flex items-center space-x-4">
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
            <div className="text-sm text-gray-500">
              {user.role === 'CUSTOMER' ? 'Khách hàng' : 'Freelancer'}
            </div>
            <div className="text-sm text-gray-500">{user.id}</div>
          </div>
        </div>
        <Tabs defaultValue="info">
          <TabsList>
            <TabsTrigger value="info">Thông tin cá nhân</TabsTrigger>
            {user.role === UserRole.FREELANCER && (
              <TabsTrigger value="service">Dịch vụ cung cấp</TabsTrigger>
            )}
            <TabsTrigger value="post">Lịch sử công việc</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <UserInfo user={user} />
          </TabsContent>
          {user.role === UserRole.FREELANCER && (
            <TabsContent value="service">
              <ProvidingWork user={user} />
            </TabsContent>
          )}
          <TabsContent value="post">
            <UserPosts userId={user.id} userRole={user.role} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default UserDetail;
