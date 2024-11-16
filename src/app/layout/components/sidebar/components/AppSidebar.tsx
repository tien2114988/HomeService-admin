import { Inbox, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible } from "@radix-ui/react-collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Menu items.
const items = [
  {
    title: "Quản lý người dùng 11",
    url: "/users",
    icon: User,
    submenu: [
      {
        title: "Thông tin tài khoản",
        url: "/users",
      },
      {
        title: "Thông tin người dùng",
        url: "/users",
      },
      {
        title: "Dịch vụ cung cấp",
        url: "/users",
      },
      {
        title: "Đơn dịch vụ",
        url: "/users",
      },
    ],
  },
  {
    title: "Dịch vụ",
    url: "/dashboard",
    icon: Inbox,
    submenu: [
      {
        title: "Thông tin tài khoản",
        url: "/dashboard",
      },
      {
        title: "Thông tin người dùng",
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Dịch vụ",
    url: "/dashboard",
    icon: Inbox,
    submenu: [
      {
        title: "Thông tin tài khoản",
        url: "/dashboard",
      },
      {
        title: "Thông tin người dùng",
        url: "/dashboard",
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {/* Label */}
          <SidebarGroupLabel>Home Service</SidebarGroupLabel>
          {/* Content */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenu>
                    <SidebarMenuItem key={item.title}>
                      {/* Title */}
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span className="w-full">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {/* Content */}
                      <CollapsibleContent>
                        {item.submenu.map((i) => (
                          <SidebarMenuSub key={i.title}>
                            <SidebarMenuSubItem>
                              <SidebarMenuButton asChild>
                                <a href={i.url}>
                                  <span>{i.title}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        ))}
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
