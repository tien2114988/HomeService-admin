import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostModel } from '@/models/Post';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Img } from 'react-image';
import { normalizeCreatedAt } from '@/lib/utils';
import moment from 'moment';
import { WorkType } from '@/lib/constant';
import PostStatusBadge from './PostStatusBadge';

interface PostTableProps {
  posts: PostModel[];
  loading: boolean;
}

const PostTable: React.FC<PostTableProps> = ({ posts, loading }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const navigate = useNavigate();

  const viewPost = (post: PostModel) => {
    navigate(`/posts/${post.id}`, {
      state: { post },
    });
  };

  const columns: ColumnDef<PostModel>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'work',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Loại công việc <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const post = row.original;
        return (
          <div className="flex items-center">
            <Img
              src={
                post.work.image
                  ? post.work.image
                  : 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png'
              }
              alt="Thumbnail"
              width={32}
              height={32}
              className="rounded-full mr-2"
              loader={<div>Loading...</div>}
            />

            <span>
              {WorkType[post.work.name as keyof typeof WorkType].value}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'customerName',
      header: 'Khách hàng',
      cell: ({ row }) => {
        const post = row.original;
        return <div>{post.customer.name}</div>;
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ngày tạo <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">
          {moment(normalizeCreatedAt(row.getValue('createdAt')))?.format(
            'DD/MM/YYYY HH:mm:ss',
          )}
        </div>
      ),
    },
    {
      accessorKey: 'freelancers',
      header: 'Số freelancers nhận',
      cell: ({ row }) => {
        const post = row.original;
        return (
          <div className="text-center">
            {post.numOfFreelancer} / {post.totalFreelancer}
          </div>
        );
      },
    },
    {
      accessorKey: 'days',
      header: 'Số ngày đã làm',
      cell: ({ row }) => {
        const post = row.original;
        return (
          <div className="text-center">
            {post.numOfWorkedDay} / {post.totalWorkDay}
          </div>
        );
      },
    },
    {
      accessorKey: 'price',
      header: 'Giá dịch vụ',
      cell: ({ row }) => (
        <div>{parseFloat(row.getValue('price')).toLocaleString()} đ</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => <PostStatusBadge status={row.getValue('status')} />,
    },
    {
      id: 'actions',
      header: 'Xem',
      cell: ({ row }) => {
        const user = row.original;

        return (
          <Button
            className="bg-teal-500 hover:bg-teal-600"
            onClick={() => viewPost(user)}
          >
            Chi tiết
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: posts,
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
          onChange={e => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-teal-50">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead className="text-gray-900" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: columns.length }).map(
                    (__, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ),
                  )}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Không có công việc.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PostTable;
