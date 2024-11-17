import { Inbox, User } from 'lucide-react';

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
    title: 'Thống kê',
    url: '/dashboard',
    icon: Inbox,
  },
  {
    title: 'Quản lý người dùng',
    url: '/users',
    icon: User,
  },
  {
    title: 'Cài đặt',
    url: '/settings',
    icon: Inbox,
  },
];

export function AppSidebar() {
  const currentPath = window.location.pathname;

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
                      currentPath.startsWith(item.url)
                        ? 'bg-teal-100 text-gray-600'
                        : 'text-gray-600'
                    }`}
                  >
                    <a
                      href={item.url}
                      className={`flex w-full items-center ${
                        currentPath.startsWith(item.url)
                          ? 'pointer-events-none'
                          : ''
                      }`}
                    >
                      <item.icon className="w-6 h-6 transition-transform duration-200" />
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
