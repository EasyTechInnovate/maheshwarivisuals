import { useState } from "react";
import { Bell, Settings, Menu, Sun, Moon } from "lucide-react";

export default function Header({ onToggleSidebar, onToggleTheme, theme }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isDark = theme === "dark";

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onToggleSidebar?.();
  };

  return (
    <header
      className={`flex items-center justify-between border-b px-4 h-14 transition-colors duration-300 ${
        isDark
          ? "bg-[#111A22] border-gray-800 text-white"
          : "bg-gray-200 border-gray-300 text-black"
      }`}
    >
      {/* Left side - toggle + logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          className={`p-2 rounded-lg transition ${
            isDark ? "hover:bg-gray-800" : "hover:bg-gray-300"
          }`}
        >
          <Menu className={`w-5 h-5 ${isDark ? "text-gray-300" : "text-gray-700"}`} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold">
            M
          </div>
          <div>
            <p
              className={`text-sm font-medium ${
                isDark ? "text-white" : "text-[#111A22]"
              }`}
            >
              Maheshwari Visuals
            </p>
            <span
              className={`text-xs ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Admin
            </span>
          </div>
        </div>
      </div>

      {/* Right side - icons */}
      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-lg transition ${
            isDark ? "hover:bg-gray-800" : "hover:bg-gray-300"
          }`}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>

        {/* Notifications */}
        <button
          className={`relative p-2 rounded-lg transition ${
            isDark ? "hover:bg-gray-800" : "hover:bg-gray-300"
          }`}
        >
          <Bell className={`w-5 h-5 ${isDark ? "text-gray-300" : "text-gray-700"}`} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings */}
        <button
          className={`p-2 rounded-lg transition ${
            isDark ? "hover:bg-gray-800" : "hover:bg-gray-300"
          }`}
        >
          <Settings className={`w-5 h-5 ${isDark ? "text-gray-300" : "text-gray-700"}`} />
        </button>
      </div>
    </header>
  );
}
