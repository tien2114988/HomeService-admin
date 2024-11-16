import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/sidebar/components/AppSidebar";
import Header from "./components/header/Header";



const MasterLayout = () => {
  return (
    <>
      <div>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <Header />
            <Outlet />
          </main>
        </SidebarProvider>
      </div>
    </>
  );
};

export default MasterLayout;
