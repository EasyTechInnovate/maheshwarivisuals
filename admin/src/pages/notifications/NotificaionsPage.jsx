import { useState } from "react";
import {
  notificationStats,
  mockNotification,
  mockUsers,
} from "./NotificationPageData";
import ComposeNotification from "../../components/ComposeNotification";
import NotificationPreview from "../../components/NotificationPreview";
import AllUsers from "../../components/NotificationAllUsers";

export default function NotificationPage({ theme }) {
  const [notification, setNotification] = useState(mockNotification);

  const cardClass = `${
    theme === "dark" ? "bg-[#151F28]" : "bg-white"
  } p-4 rounded-2xl shadow text-center`;

  // utility to render a stat box with badge
  const StatBox = ({ label, value, change, color }) => (
    <div className={cardClass}>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {change && (
        <span
          className={`mt-2 inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
            String(change).trim().startsWith("+")
              ? color // dynamic badge color per box
              : "bg-red-900/30 text-red-400"
          }`}
        >
          {change}
        </span>
      )}
    </div>
  );

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen p-6 rounded-2xl`}
    >
      <h2 className="text-xl font-bold mb-1">Notifications</h2>
      <p className="text-gray-400 text-sm mb-6">
        Manage platform notifications, announcements, and user communications
      </p>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left: Stats + Compose */}
        <div className="space-y-6">
          {/* Stats (Total Sent + Active Users) */}
          <div className="grid grid-cols-2 gap-4">
            <StatBox
              label="Total Sent"
              value={notificationStats.totalSent.value}
              change={notificationStats.totalSent.change}
              color="bg-green-900/30 text-green-400"
            />
            <StatBox
              label="Active Users"
              value={notificationStats.activeUsers.value}
              change={notificationStats.activeUsers.change}
              color="bg-blue-900/30 text-blue-400"
            />
          </div>

          {/* Compose box */}
          <ComposeNotification theme={theme} onCompose={setNotification} />
        </div>

        {/* Right: Stats + Preview */}
        <div className="space-y-6">
          {/* Stats (Open Rate + Click Rate) */}
          <div className="grid grid-cols-2 gap-4">
            <StatBox
              label="Open Rate"
              value={notificationStats.openRate.value}
              change={notificationStats.openRate.change}
              color="bg-purple-900/30 text-purple-400"
            />
            <StatBox
              label="Click Rate"
              value={notificationStats.clickRate.value}
              change={notificationStats.clickRate.change}
              color="bg-orange-900/30 text-orange-400"
            />
          </div>

          {/* Preview box */}
          <NotificationPreview theme={theme} notification={notification} />
        </div>
      </div>

      {/* All Users */}
      <AllUsers theme={theme} users={mockUsers} />
    </div>
  );
}
