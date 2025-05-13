import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import BreadCrumb from '@/app/layout/components/breadcrumb/BreadCrumb';
import { Img } from 'react-image';
import { FreelancerWorkStatus, WorkType } from '@/lib/constant';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import moment from 'moment';
import { normalizeCreatedAt } from '@/lib/utils';
import RequestInfo from '../components/RequestInfo';
import { FreelancerWorkModel } from '@/models/Work';
import FreelancerWorkStatusBadge from '../components/FreelancerWorkStatusBadge';
import TestResult from '../components/TestResult';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useUpdateRequestMutation } from '@/app/api/workApi';

const RequestDetail: React.FC = () => {
  const location = useLocation();
  const state = location.state as { request: FreelancerWorkModel };
  const [request, setRequest] = useState<FreelancerWorkModel>(state?.request);
  const [mode, setMode] = useState<string>('');
  const [updateRequest, { isLoading, isError }] = useUpdateRequestMutation();

  if (!request) {
    return (
      <div className="text-center text-gray-500">
        Loading post information...
      </div>
    );
  }

  console.info({ request });

  const handleUpdateRequest = async (status: string) => {
    const workId = request.work.id;
    const freelancerId = request.freelancer.id;
    const data = {
      status,
    };
    setMode(status);
    const res = await updateRequest({ workId, freelancerId, data });
    if (!isError && res.data) {
      setRequest(res.data?.items);
      toast({
        title: 'Thành công',
        description: 'Cập nhật trạng thái thành công',
        variant: 'success',
      });
    } else {
      toast({
        title: 'Thất bại',
        description: 'Cập nhật trạng thái thất bại',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <BreadCrumb
        links={[
          { label: 'Các đơn công việc', href: '/requests/' },
          { label: `${request.id}`, href: '' },
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
                {request.freelancer.name}
              </h2>
              <div className="text-sm text-gray-500">
                {WorkType[request.work.name as keyof typeof WorkType].value}
              </div>
              <FreelancerWorkStatusBadge status={request.status} />
            </div>
          </div>
          <div>
            <div>
              <span className="font-medium">Ngày gửi đăng ký:</span>{' '}
              {moment(normalizeCreatedAt(request.createdAt))?.format(
                'DD/MM/YYYY HH:mm:ss',
              )}
            </div>
            <div>
              <span className="font-medium">Lần cập nhật cuối:</span>{' '}
              {moment(normalizeCreatedAt(request.updatedAt))?.format(
                'DD/MM/YYYY HH:mm:ss',
              )}
            </div>
          </div>
        </div>
        <Tabs defaultValue="detail">
          <TabsList>
            <TabsTrigger value="detail">Thông tin đăng ký</TabsTrigger>
            <TabsTrigger value="test">Kết quả bài test</TabsTrigger>
          </TabsList>
          <TabsContent value="detail">
            <RequestInfo request={request} />
          </TabsContent>
          <TabsContent value="test">
            <TestResult request={request} />
          </TabsContent>
        </Tabs>

        {request.status !== FreelancerWorkStatus.WORK.key && (
          <div className="flex flex-row justify-end space-x-2">
            <Button
              disabled={
                isLoading || request.status === FreelancerWorkStatus.DISABLE.key
              }
              variant="destructive"
              onClick={() =>
                handleUpdateRequest(FreelancerWorkStatus.DISABLE.key)
              }
            >
              Từ chối
              {isLoading && mode === FreelancerWorkStatus.DISABLE.key && (
                <Loader2 className="animate-spin" />
              )}
            </Button>

            <Button
              disabled={
                isLoading || request.status === FreelancerWorkStatus.DISABLE.key
              }
              variant="success"
              onClick={() => handleUpdateRequest(FreelancerWorkStatus.WORK.key)}
            >
              Xét duyệt
              {isLoading && mode === FreelancerWorkStatus.WORK.key && (
                <Loader2 className="animate-spin" />
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default RequestDetail;
