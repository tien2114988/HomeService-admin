import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './components/sidebar/components/AppSidebar';
import Header from './components/header/Header';
import { Toaster } from '@/components/ui/toaster';

const MasterLayout = () => {
  return (
    <>
      <div>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <Header />
            <div className="px-4 py-2">
              <Toaster />
              <Outlet />
            </div>
          </main>
        </SidebarProvider>
      </div>
    </>
  );
};

export default MasterLayout;
