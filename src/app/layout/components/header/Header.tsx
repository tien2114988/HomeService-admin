import { SidebarTrigger } from '@/components/ui/sidebar';
import { LogOut } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Header = () => {
  return (
    <nav className="sticky z-50 top-0 bg-teal-600 border-b border-gray-200 shadow-sm w-full flex justify-between items-center px-4 py-2">
      <div className="flex items-center justify-between">
        <SidebarTrigger />
        <h1 className="ml-4 text-xl font-semibold text-white">
          Dịch vụ tại nhà
        </h1>
      </div>
      <div className="flex items-center justify-between space-x-4">
        <div className="text-white font-medium">Admin</div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end">
            Đăng xuất
          </TooltipContent>
        </Tooltip>
      </div>
    </nav>
  );
};

export default Header;
