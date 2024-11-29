import {
  User,
  Gauge,
  LayoutGrid,
  Landmark,
  ClipboardList,
  UserPlus,
} from 'lucide-react';
import { useLocation } from 'react-router-dom'; // Import useLocation

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

// Menu items.
const items = [
  {
    title: 'Bảng điều khiển',
    url: '/dashboard',
    icon: Gauge,
  },
  {
    title: 'Quản lý người dùng',
    url: '/users',
    icon: User,
  },
  {
    title: 'Các đơn công việc',
    url: '/posts',
    icon: ClipboardList,
  },
  {
    title: 'Loại dịch vụ',
    url: '/works',
    icon: LayoutGrid,
  },
  {
    title: 'Yêu cầu đăng ký',
    url: '/requests',
    icon: UserPlus,
  },
  {
    title: 'Tài khoản ngân hàng',
    url: '/accounts',
    icon: Landmark,
  },
];

export function AppSidebar() {
  const location = useLocation(); // Sử dụng useLocation để lấy đường dẫn hiện tại

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className="bg-white shadow-xl h-screen"
    >
      <SidebarContent>
        <SidebarGroup>
          {/* Label */}
          <SidebarGroupLabel className="px-4 text-lg font-bold text-gray-600">
            Quản trị viên
          </SidebarGroupLabel>
          {/* Content */}
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`py-6 transition-colors duration-200 ${
                      location.pathname.startsWith(item.url) // Sử dụng location.pathname
                        ? 'bg-teal-100 text-gray-600'
                        : 'text-gray-600'
                    }`}
                  >
                    <a
                      href={item.url}
                      className={`flex w-full items-center ${
                        location.pathname.startsWith(item.url)
                          ? 'pointer-events-none'
                          : ''
                      }`}
                    >
                      <item.icon className="w-8 h-8 transition-transform duration-200 mr-2" />
                      <span className="w-full text-base font-medium">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
