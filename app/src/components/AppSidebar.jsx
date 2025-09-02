import React from 'react'
import {  Music,  Home,  User,  Calendar,  Upload,  Grid3x3,  Users,  BarChart3,  DollarSign,  Wallet, Megaphone, Video, Wrench, Store, Bot, HelpCircle, Settings, Sun, Moon, Bell, ChevronUp} from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,} from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from '@/components/ui/dropdown-menu';

const AppSidebar = () => {
    const sidebarSections = [
    {
      title: "MAIN",
      items: [
        { icon: Home, label: "Dashboard", url: "#", active: true },
        { icon: User, label: "Profile", url: "#" },
        { icon: Calendar, label: "My Plan", url: "#" },
        { icon: Upload, label: "Upload Release", url: "#" },
        { icon: Grid3x3, label: "Catalog", url: "#" }
      ]
    },
    {
      title: "BUSINESS", 
      items: [
        { icon: Users, label: "Join MCN", url: "#" },
        { icon: BarChart3, label: "Analytics", url: "#" },
        { icon: DollarSign, label: "Royalties", url: "#" },
        { icon: Wallet, label: "Finance & Wallet", url: "#" }
      ]
    },
    {
      title: "MARKETING",
      items: [
        { icon: Megaphone, label: "MV Marketing", url: "#" },
        { icon: Megaphone, label: "Advertisement", url: "#" },
        { icon: Video, label: "MV Production", url: "#" },
        { icon: Wrench, label: "Fan Links Builder", url: "#" },
        { icon: Store, label: "Merch Store", url: "#" }
      ]
    },
    {
      title: "TOOLS",
      items: [
        { icon: Bot, label: "AI Mastering", url: "#" },
        { icon: HelpCircle, label: "Help & Support", url: "#" },
        { icon: Settings, label: "Settings", url: "#" }
      ]
    }
  ];
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Maheshwari</h1>
            <span className="text-sm text-muted-foreground">Visuals</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2" style={{
    scrollbars: "none", // for IE
  }}>
        {sidebarSections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={item.active}
                        className="w-full"
                      >
                        <a href={item.url} className="flex items-center gap-3 px-3 py-2">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

     
    </Sidebar>
  )
}

export default AppSidebar
