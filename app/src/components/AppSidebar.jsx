import React from 'react'
import {  
  Music, Home, User, Calendar, Upload, Grid3x3, Users, BarChart3, DollarSign, 
  Wallet, Megaphone, Video, Wrench, Store, Bot, HelpCircle, Settings
} from 'lucide-react';
import { 
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, 
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from '@/components/ui/sidebar';
import { useLocation, Link } from 'react-router-dom';

const AppSidebar = () => {
  const sidebarSections = [
    {
      title: "MAIN",
      items: [
        { icon: Home, label: "Dashboard", url: "/user" },
        { icon: User, label: "Profile", url: "/user/profile" },
        { icon: Calendar, label: "My Plan", url: "/user/plan" },
        { icon: Upload, label: "Upload Release", url: "/user/upload-release" },
        { icon: Grid3x3, label: "Catalog", url: "/user/catalog" }
      ]
    },
    {
      title: "BUSINESS", 
      items: [
        { icon: Users, label: "Join MCN", url: "/user/youtube-mcn" },
        { icon: BarChart3, label: "Analytics", url: "/user/analytics" },
        { icon: DollarSign, label: "Royalties", url: "/user/royalties" },
        { icon: Wallet, label: "Finance & Wallet", url: "/user/finance-and-wallet" }
      ]
    },
    {
      title: "MARKETING",
      items: [
        { icon: Megaphone, label: "MV Marketing", url: "/user/mv-marketing" },
        { icon: Megaphone, label: "Advertisement", url: "/user/advertisement" },
        { icon: Video, label: "MV Production", url: "/user/mv-production" },
        { icon: Wrench, label: "Fan Links Builder", url: "/user/fan-links" },
        { icon: Store, label: "Merch Store", url: "/user/merch" }
      ]
    },
    {
      title: "TOOLS",
      items: [
        { icon: Bot, label: "AI Mastering", url: "/user/ai-mastering" },
        { icon: HelpCircle, label: "Help & Support", url: "/user/help" },
        { icon: Settings, label: "Settings", url: "/user/settings" }
      ]
    }
  ];

  const location = useLocation();

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

      <SidebarContent className="px-2">
        {sidebarSections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton 
                        asChild 
                        className={`w-full ${isActive ? "bg-muted/90" : ""}`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </Link>
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

export default AppSidebar;
