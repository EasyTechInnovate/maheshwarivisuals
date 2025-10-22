import { useState } from "react";
import {
  notificationStats,
  mockNotification,
  mockUsers,
} from "./NotificationPageData";
import ComposeNotification from "../../components/ComposeNotification";
import NotificationPreview from "../../components/NotificationPreview";
import AllUsers from "../../components/NotificationAllUsers";
import { Bell, Users, Eye, MousePointer } from "lucide-react";

export default function NotificationPage({ theme = "dark" }) {
  const [notification, setNotification] = useState(mockNotification);

  const cardClass = `${
    theme === "dark" ? "bg-[#151F28]" : "bg-white"
  } p-5 rounded-2xl shadow flex flex-col justify-between`;

  const StatBox = ({ label, value, change, icon, color }) => (
    <div className={cardClass}>
      <div className="flex items-center justify-between">
        <p
          className={`${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          } text-sm`}
        >
          {label}
        </p>
        <span
          className={`p-2 rounded-lg ${
            theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-[#111A22]"
          }`}
        >
          {icon}
        </span>
      </div>
      <div className="mt-3">
        <p
          className={`${
            theme === "dark" ? "text-white" : "text-[#111A22]"
          } text-2xl font-bold`}
        >
          {value}
        </p>
        {change && (
          <span
            className={`mt-2 inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
              change > 0
                ? color
                : "bg-red-900/30 text-red-400"
            }`}
          >
            {change > 0 ? `+${change}%` : `${change}%`}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`${
        theme === "dark" ? "bg-[#111A22] text-white" : "bg-gray-100 text-black"
      } min-h-screen p-6 rounded-2xl`}
    >
      <h1 className="text-2xl font-bold mb-1">Notifications</h1>
      <p className="text-gray-400 text-sm mb-6">
        Manage platform notifications, announcements, and user communications
      </p>

      {/* Stats - All 4 in one place */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatBox
          label="Total Sent"
          value={notificationStats.totalSent.value}
          change={notificationStats.totalSent.change}
          icon={<Bell className="w-5 h-5" />}
          color="bg-green-900/30 text-green-400"
        />
        <StatBox
          label="Active Users"
          value={notificationStats.activeUsers.value}
          change={notificationStats.activeUsers.change}
          icon={<Users className="w-5 h-5" />}
          color="bg-blue-900/30 text-blue-400"
        />
        <StatBox
          label="Open Rate"
          value={`${notificationStats.openRate.value}%`}
          change={notificationStats.openRate.change}
          icon={<Eye className="w-5 h-5" />}
          color="bg-purple-900/30 text-purple-400"
        />
        <StatBox
          label="Click Rate"
          value={`${notificationStats.clickRate.value}%`}
          change={notificationStats.clickRate.change}
          icon={<MousePointer className="w-5 h-5" />}
          color="bg-orange-900/30 text-orange-400"
        />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
       
        <ComposeNotification theme={theme} onCompose={setNotification} />

        {/* Right: Preview */}
        <NotificationPreview theme={theme} notification={notification} />
      </div>

      {/* All Users */}
      <AllUsers theme={theme} users={mockUsers} />
    </div>
  );
}
