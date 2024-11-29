import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BreadCrumb from '@/app/layout/components/breadcrumb/BreadCrumb';
import { Img } from 'react-image';
import { WorkType } from '@/lib/constant';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { TestModel, WorkModel } from '@/models/Work';
import WorkInfo from '../components/WorkInfo';
import TestInfo from '../components/TestInfo';
import FreelancersInfo from '../components/FreelancersInfo';

const WorkDetail: React.FC = () => {
  const location = useLocation();
  const state = location.state as { work: WorkModel; request: boolean };
  const work = state?.work;
  const request = state?.request;
  const [test, setTest] = useState<TestModel>(work.test);

  if (!work) {
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
          { label: 'Các loại dịch vụ', href: '/works/' },
          { label: `${work.id}`, href: '' },
        ]}
      />
      <div className="min-h-screen space-y-5">
        {/* Thông tin tài khoản */}

        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <Img
              src={work.image}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              loader={<div>Loading...</div>}
            />

            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {WorkType[work.name as keyof typeof WorkType].value}
              </h2>
              <div className="text-sm text-gray-500">{work.id}</div>
            </div>
          </div>
        </div>
        <Tabs defaultValue={request ? 'freelancer' : 'detail'}>
          <TabsList>
            <TabsTrigger value="detail">Thông tin chi tiết</TabsTrigger>
            <TabsTrigger value="test">Thông tin bài test</TabsTrigger>
            <TabsTrigger value="freelancer">Freelancers</TabsTrigger>
          </TabsList>
          <TabsContent value="detail">
            <WorkInfo work={work} />
          </TabsContent>
          <TabsContent value="test">
            <TestInfo workId={work.id} test={test} setTest={setTest} />
          </TabsContent>
          <TabsContent value="freelancer">
            <FreelancersInfo work={work} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default WorkDetail;
