import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar  from './AppSidebar';
import  AppHeader  from './AppHeader';

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader />
          <main className="flex-1 p-2 md:p-4 w-full  max-w-full min-h-screen overflow-x-hidden ">{children}</main>
        </div>
      </div>
    </SidebarProvider>)
}
