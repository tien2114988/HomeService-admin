import React, { useEffect, useState } from 'react';
import { getAllWorks } from '@/services/workService';
import { WorkModel } from '@/models/Work';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card'; // Cấu trúc shadcn card
import { Skeleton } from '@/components/ui/skeleton';
import { Img } from 'react-image';
import { WorkType } from '@/lib/constant';

const WorkList: React.FC = () => {
  const [works, setWorks] = useState<WorkModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Bắt đầu loading
      const data = await getAllWorks();
      setWorks(data.items);
      setLoading(false); // Kết thúc loading
    };

    fetchData();
  }, []);

  const viewWorkDetail = (id: string) => {
    console.log(id);
  };

  return (
    <div className="w-full">
      <div className="text-xl font-medium mb-4">Quản lý loại dịch vụ</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} /> // Hiển thị skeleton khi đang load
            ))
          : works.map(work => (
              <Card
                key={work.id}
                onClick={() => viewWorkDetail(work.id)}
                className="shadow-md hover:shadow-lg"
              >
                <CardHeader className="p-0">
                  <Img
                    src={work.image}
                    alt={work.name}
                    className="rounded-t-lg w-full h-32 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">
                    {WorkType[work.name as keyof typeof WorkType].value}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {work.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4">
                  {/* <button className="text-teal-600 font-medium hover:underline">
                    Xem chi tiết
                  </button> */}
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
};

// Skeleton cho Card
const SkeletonCard: React.FC = () => (
  <div className="shadow-md p-4 rounded-lg">
    <Skeleton className="w-full h-32 mb-4 rounded-lg" />
    <Skeleton className="h-6 w-2/3 mb-2 rounded" />
    <Skeleton className="h-4 w-5/6 mb-4 rounded" />
    <Skeleton className="h-5 w-1/3 rounded" />
  </div>
);

export default WorkList;
