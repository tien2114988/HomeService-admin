import React from "react";
import { WorkModel } from "@/models/Work";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Cấu trúc shadcn card
import { Skeleton } from "@/components/ui/skeleton";
import { Img } from "react-image";
import { WorkType } from "@/lib/constant";
import { User, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetAllWorksQuery } from "@/app/api/workApi";
import { toast } from "@/hooks/use-toast";

const WorkList: React.FC = () => {
  const { data, isFetching, isError } = useGetAllWorksQuery();
  const works = data?.items ?? [];
  const navigate = useNavigate();

  if (isError) {
    toast({
      title: "Thất bại",
      description: data?.message,
      variant: "destructive",
    });
  }

  const viewWorkDetail = (work: WorkModel, request: boolean) => {
    console.log(request);
    navigate(`/works/${work.id}`, {
      state: { work, request },
    });
  };

  return (
    <div className="w-full">
      <div className="text-xl font-medium mb-4">Quản lý loại dịch vụ</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isFetching
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} /> // Hiển thị skeleton khi đang load
            ))
          : works.map((work) => (
              <Card
                key={work.id}
                onClick={() => viewWorkDetail(work, false)}
                className="shadow-md hover:shadow-lg cursor-pointer"
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
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {work.description}
                  </p>
                  <div className="flex flex-row justify-between items-center text-gray-500 my-4">
                    <div className="flex flex-row">
                      <User size={20} className="text-green-600" />
                      <div className="text-sm">
                        {work.numOfFreelancers} freelancers
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <ClipboardList className="text-blue-500" size={20} />
                      <div className="text-sm">
                        {work.postPerMonth} đơn/tháng
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row justify-end">
                  <Button
                    onClick={(event) => {
                      event.stopPropagation(); // Chặn sự kiện onClick của Card
                      viewWorkDetail(work, true);
                    }}
                    className="relative bg-cyan-500 hover:bg-cyan-600 transition"
                  >
                    Yêu cầu đăng ký
                    <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {work.numOfRequests}
                    </span>
                  </Button>
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
