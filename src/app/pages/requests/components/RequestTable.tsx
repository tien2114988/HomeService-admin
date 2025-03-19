import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  SortingState,
  VisibilityState,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Img } from "react-image";
import { normalizeCreatedAt } from "@/lib/utils";
import moment from "moment";
import { FreelancerWorkModel } from "@/models/Work";
import FreelancerWorkStatusBadge from "./FreelancerWorkStatusBadge";
import { WorkType } from "@/lib/constant";
import { useGetRequestsQuery } from "@/app/api/workApi";
import { toast } from "@/hooks/use-toast";

interface PostTableProps {
  workId?: string;
}

const RequestTable: React.FC<PostTableProps> = ({ workId }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const navigate = useNavigate();
  const { data, isFetching, isError } = useGetRequestsQuery(workId);

  const requests = data?.items || [];

  if (isError) {
    toast({
      title: "Thất bại",
      description: data?.message,
      variant: "destructive",
    });
  }

  const viewRequest = (request: FreelancerWorkModel) => {
    navigate(`/requests/${request.id}`, {
      state: { request },
    });
  };

  const columns: ColumnDef<FreelancerWorkModel>[] = [
    {
      accessorKey: "id",
      header: "Mã freelancer",
      cell: ({ row }) => {
        const request = row.original;
        return <div>{request.freelancer.id}</div>;
      },
    },
    {
      accessorKey: "freelancerName",
      header: "Tên freelancer",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="flex items-center">
            <Img
              src={
                request.freelancer.avatar
                  ? request.freelancer.avatar
                  : "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
              }
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full mr-2"
              loader={<div>Loading...</div>}
            />
            <span>{request.freelancer.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "workId",
      header: "Mã dịch vụ",
      cell: ({ row }) => {
        const request = row.original;
        return <div>{request.work.id}</div>;
      },
    },
    {
      accessorKey: "workName",
      header: "Tên dịch vụ",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="flex items-center">
            <Img
              src={
                request.work.image
                  ? request.work.image
                  : "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
              }
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full mr-2"
              loader={<div>Loading...</div>}
            />
            <span>
              {WorkType[request.work.name as keyof typeof WorkType].value}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày tạo <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">
          {row.getValue("createdAt")
            ? moment(normalizeCreatedAt(row.getValue("createdAt")))?.format(
                "DD/MM/YYYY HH:mm:ss"
              )
            : ""}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Trạng thái đăng ký",
      cell: ({ row }) => (
        <FreelancerWorkStatusBadge status={row.getValue("status")} />
      ),
    },
    {
      id: "actions",
      header: "Xem",
      cell: ({ row }) => {
        const request = row.original;

        return (
          <Button
            className="bg-teal-500 hover:bg-teal-600"
            onClick={() => viewRequest(request)}
          >
            Chi tiết
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: requests,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    state: { sorting, columnVisibility, globalFilter },
    globalFilterFn: (row, columnId, value) => {
      return String(row.getValue(columnId))
        .toLowerCase()
        .includes(String(value).toLowerCase());
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Tìm kiếm theo ID"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-teal-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="text-gray-900" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isFetching ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: columns.length }).map(
                    (__, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Không có yêu cầu đăng ký.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RequestTable;
