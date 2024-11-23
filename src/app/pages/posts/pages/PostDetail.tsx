import React from 'react';
import { useLocation } from 'react-router-dom';
import { PostModel } from '@/models/Post';

import BreadCrumb from '@/app/layout/components/breadcrumb/BreadCrumb';
import { Img } from 'react-image';
import { WorkType } from '@/lib/constant';

import PostInfo from '../components/PostInfo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import moment from 'moment';
import { normalizeCreatedAt } from '@/lib/utils';
import PostStatusBadge from '../components/PostStatusBadge';
import FreelancerInfo from '../components/FreelancerInfo';
import WorkSchedule from '../components/WorkSchedule';

const PostDetail: React.FC = () => {
  const location = useLocation();
  const state = location.state as { post: PostModel };
  const post = state?.post;

  if (!post) {
    return (
      <div className="text-center text-gray-500">
        Loading post information...
      </div>
    );
  }

  return (
    <>
      <BreadCrumb
        links={[
          { label: 'Các đơn công việc', href: '/posts/' },
          { label: `${post.id}`, href: '' },
        ]}
      />
      <div className="min-h-screen space-y-5">
        {/* Thông tin tài khoản */}

        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <Img
              src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              loader={<div>Loading...</div>}
            />

            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {WorkType[post.work.name as keyof typeof WorkType].value}
              </h2>
              <div className="text-sm text-gray-500">{post.id}</div>
              <PostStatusBadge status={post.status} />
            </div>
          </div>
          <div>
            <div>
              <span className="font-medium">Ngày tạo:</span>{' '}
              {moment(normalizeCreatedAt(post.createdAt))?.format(
                'DD/MM/YYYY HH:mm:ss',
              )}
            </div>
            <div>
              <span className="font-medium">Lần cập nhật cuối:</span>{' '}
              {moment(normalizeCreatedAt(post.updatedAt))?.format(
                'DD/MM/YYYY HH:mm:ss',
              )}
            </div>
          </div>
        </div>
        <Tabs defaultValue="detail">
          <TabsList>
            <TabsTrigger value="detail">Thông tin chi tiết</TabsTrigger>
            <TabsTrigger value="freelancer">Thông tin người làm</TabsTrigger>
            <TabsTrigger value="schedule">Lịch làm việc</TabsTrigger>
          </TabsList>
          <TabsContent value="detail">
            <PostInfo post={post} />
          </TabsContent>
          <TabsContent value="freelancer">
            <FreelancerInfo post={post} />
          </TabsContent>
          <TabsContent value="schedule">
            <WorkSchedule post={post} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default PostDetail;
