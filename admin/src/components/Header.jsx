import { useState } from "react";
import { Bell, Settings, Menu } from "lucide-react";

export default function Header({ onToggleSidebar }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onToggleSidebar?.(); // call parent handler if provided
  };

  return (
    <header className="flex items-center justify-between bg-[#151F28] border-b border-gray-800 px-4 h-14">
      {/* Left side - toggle + logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          className="p-2 rounded-lg hover:bg-gray-800"
        >
          <Menu className="w-5 h-5 text-gray-300" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold">
            M
          </div>
          <div>
            <p className="text-sm font-medium text-white">Maheshwari Visuals</p>
            <span className="text-xs text-gray-400">Admin</span>
          </div>
        </div>
      </div>

      {/* Right side - icons */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-gray-800">
          <Bell className="w-5 h-5 text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-800">
          <Settings className="w-5 h-5 text-gray-300" />
        </button>
      </div>
    </header>
  );
}
