import { useEffect, useState } from 'react';
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Img } from 'react-image';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getFilteredRowModel } from '@tanstack/react-table';
import { getUsers, updateUser } from '@/services/userService';
import { UserModel } from '@/models/User';
import { useNavigate } from 'react-router-dom';
import UserStatusBadge from '../components/UserStatusBadge';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton
import { ReturnCode, UserStatus } from '@/lib/constant';
import { useToast } from '@/hooks/use-toast';

const UserList = () => {
  const { toast } = useToast();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Modal visibility state
  const [selectedUser, setSelectedUser] = useState<UserModel>();
  const [updatedStatus, setUpdatedStatus] = useState<string>('');
  const navigate = useNavigate();

  const viewUser = (user: UserModel) => {
    navigate(`/users/${user.id}`, {
      state: { user },
    });
  };

  const openUpdateStatus = (user: UserModel, status: string) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
    setUpdatedStatus(status);
  };

  const updateStatus = async (id: string, status: string) => {
    setShowUpdateModal(false);
    setLoading(true);
    const data = await updateUser(id, { status });
    setLoading(false);
    if (data.returnCode === ReturnCode.SUCCESS) {
      const updatedUser: UserModel = data.items;
      const updatedUsers = users.map(user =>
        user.id === id ? updatedUser : user,
      );
      setUsers(updatedUsers);
      toast({
        title: 'Thành công',
        description: 'Cập nhật trạng thái người dùng thành công',
        variant: 'success',
      });
    } else {
      toast({
        title: 'Thất bại',
        description: data.message,
        variant: 'destructive',
      });
    }
  };

  const columns: ColumnDef<UserModel>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'id',
      header: 'Id',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tên <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center">
            <Img
              src={
                user.avatar
                  ? user.avatar
                  : 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png'
              }
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full mr-2"
              loader={<div>Loading...</div>}
            />

            <span>{row.getValue('name')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'role',
      header: 'Vai trò',
      cell: ({ row }) => (
        <div
          className={
            row.getValue('role') == 'CUSTOMER'
              ? 'text-cyan-600'
              : 'text-yellow-600'
          }
        >
          {row.getValue('role')}
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Số điện thoại',
      cell: ({ row }) => <div>{row.getValue('phoneNumber')}</div>,
    },
    {
      accessorKey: 'balance',
      header: 'Số dư',
      cell: ({ row }) => (
        <div className="">
          {parseFloat(row.getValue('balance')).toLocaleString()} đ
        </div>
      ),
    },
    {
      accessorKey: 'reputationPoint',
      header: 'Điểm uy tín',
      cell: ({ row }) => (
        <div className="">{row.getValue('reputationPoint')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => <UserStatusBadge status={row.getValue('status')} />,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => viewUser(user)}>
                Xem thông tin
              </DropdownMenuItem>
              {user.status === UserStatus.ACTIVE.key ? (
                <DropdownMenuItem
                  onClick={() =>
                    openUpdateStatus(user, UserStatus.PROHIBITIVE.key)
                  }
                >
                  Cấm hoạt động
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => openUpdateStatus(user, UserStatus.ACTIVE.key)}
                >
                  Bỏ cấm
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      const data = await getUsers();
      setUsers(data.items);
      setLoading(false); // End loading
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="text-xl font-medium mb-2">Quản lý người dùng</div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Tìm kiếm theo ID, tên hoặc email..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Cột hiển thị <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={value => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
                  Không có người dùng.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {selectedUser && (
        <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {updatedStatus === UserStatus.ACTIVE.key ? 'Bỏ cấm' : 'Cấm'}{' '}
                người dùng
              </DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn{' '}
                {updatedStatus === UserStatus.ACTIVE.key ? 'bỏ cấm' : 'cấm'}{' '}
                {selectedUser?.name}?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowUpdateModal(false)} // Close modal
              >
                Hủy
              </Button>
              <Button
                type="submit"
                onClick={() => updateStatus(selectedUser?.id, updatedStatus)}
              >
                Cập nhật
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserList;
