import { useEffect, useState } from "react";
import { fetchDashboardData } from "../components/DashboardData";
import {
  Users,
  Music,
  IndianRupee,
  FileWarning,
  Database,
  Activity,
  CheckCircle, AlertTriangle, Clock
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Icon mapping
const cardIcons = {
  totalUsers: Users,
  activeReleases: Music,
  monthlyRoyalty: IndianRupee,
  pendingKYC: FileWarning,
  totalCatalog: Database,
  platformUsage: Activity,
};

// Format numbers with commas (e.g. 12847 -> 12,847)
const formatNumber = (num) =>
  typeof num === "number" ? num.toLocaleString("en-IN") : num;

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [showAllActivities, setShowAllActivities] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchDashboardData();
      setData(res);
    };
    loadData();
  }, []);

  if (!data)
    return (
      <div className="text-center p-10 text-gray-400">Loading Dashboard...</div>
    );

  // Reusable card component
  const StatCard = ({ title, value, change, breakdown, icon: Icon }) => (
    <div className="bg-gray-900 p-5 rounded-2xl shadow-lg relative">
      {/* Icon in top-right */}
      <Icon className="absolute top-4 right-4 text-gray-400" size={20} />
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <p className="text-2xl font-bold text-white mt-1">{formatNumber(value)}</p>
      <p
        className={`text-sm mt-1 ${change.startsWith("-") ? "text-red-400" : "text-green-400"
          }`}
      >
        {change} vs last period
      </p>


      {/* Breakdown */}
      {breakdown && (
        <div className="text-xs text-gray-400 mt-2">
          {Object.entries(breakdown)
            .map(
              ([k, v]) =>
                `${k.charAt(0).toUpperCase() + k.slice(1)}: ${formatNumber(v)}`
            )
            .join(" | ")}
        </div>
      )}

    </div>
  );

  return (
   <div className="min-h-screen p-4 sm:p-6">
  {/* Stats Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    <StatCard
      title="Total Users"
      value={data.totalUsers.count}
      change={data.totalUsers.change}
      breakdown={data.totalUsers.breakdown}
      icon={cardIcons.totalUsers}
    />
    <StatCard
      title="Active Releases"
      value={data.activeReleases.count}
      change={data.activeReleases.change}
      breakdown={data.activeReleases.breakdown}
      icon={cardIcons.activeReleases}
    />
    <StatCard
      title="Monthly Royalty"
      value={data.monthlyRoyalty.amount}
      change={data.monthlyRoyalty.change}
      breakdown={data.monthlyRoyalty.breakdown}
      icon={cardIcons.monthlyRoyalty}
    />
    <StatCard
      title="Pending KYC"
      value={data.pendingKYC.count}
      change={data.pendingKYC.change}
      breakdown={data.pendingKYC.breakdown}
      icon={cardIcons.pendingKYC}
    />
    <StatCard
      title="Total Catalog"
      value={data.totalCatalog.count}
      change={data.totalCatalog.change}
      breakdown={data.totalCatalog.breakdown}
      icon={cardIcons.totalCatalog}
    />
    <StatCard
      title="Platform Usage"
      value={data.platformUsage.percentage}
      change={data.platformUsage.change}
      breakdown={data.platformUsage.breakdown}
      icon={cardIcons.platformUsage}
    />

    {/* Charts */}
    <div className="bg-gray-900 p-4 sm:p-5 rounded-2xl shadow-lg col-span-1 sm:col-span-2">
      <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-2 sm:mb-3">
        Platform Usage (24h)
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data.platformUsage24h}>
          <XAxis dataKey="time" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-gray-900 p-4 sm:p-5 rounded-2xl shadow-lg">
      <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-2 sm:mb-3">
        Revenue & User Growth
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data.revenueGrowth}>
          <XAxis dataKey="month" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Bar dataKey="value" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Row 1: Two side-by-side cards */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 w-full">
    {/* User Type Distribution */}
    <div className="bg-gray-900 p-4 sm:p-5 rounded-2xl shadow-lg">
      <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-1">User Type Distribution</h3>
      <p className="text-[10px] sm:text-xs text-gray-500 mb-4">
        Breakdown of registered users by category
      </p>
      <div className="space-y-2 text-xs sm:text-sm">
        {data.userTypeDistribution.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  idx === 0 ? "bg-blue-500" : idx === 1 ? "bg-green-500" : "bg-yellow-500"
                }`}
              />
              <span>{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-200">{item.value.toLocaleString()}</span>
              <span className="text-[10px] sm:text-xs text-gray-500">({item.percentage})</span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 mt-3 pt-2 text-right text-xs sm:text-sm text-gray-300">
        Total Users: {data.totalUsers.count.toLocaleString()}
      </div>
    </div>

    {/* Recent Activities */}
    <div className="bg-gray-900 p-4 sm:p-5 rounded-2xl shadow-lg">
      <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-1">Recent System Activities</h3>
      <p className="text-[10px] sm:text-xs text-gray-500 mb-4">
        Latest platform activities and notifications
      </p>
      <ul className="space-y-3 text-xs sm:text-sm max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {(showAllActivities ? data.recentActivities : data.recentActivities.slice(0, 5)).map(
          (act, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span
                className={`w-2 h-2 mt-1 rounded-full ${
                  act.type === "success"
                    ? "bg-green-500"
                    : act.type === "warning"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
              />
              <div>
                <p className="text-gray-200">{act.message}</p>
                <p className="text-[10px] sm:text-xs text-gray-400">{act.time}</p>
              </div>
            </li>
          )
        )}
      </ul>
      <button
        onClick={() => setShowAllActivities(!showAllActivities)}
        className="mt-4 w-full py-1 text-xs sm:text-sm text-gray-400 border border-gray-700 rounded-lg hover:bg-gray-800"
      >
        {showAllActivities ? "Show Less" : "View All Activities"}
      </button>
    </div>
  </div>

  {/* System Health & Status */}
  <div className="bg-gray-900 p-4 sm:p-5 rounded-2xl shadow-lg w-full mt-6">
    <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-1">System Health & Status</h3>
    <p className="text-[10px] sm:text-xs text-gray-500 mb-4">
      Real-time monitoring of critical system components
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {data.systemHealth.map((sys, idx) => (
        <div key={idx} className="bg-gray-800 rounded-lg p-3 sm:p-4 text-center text-xs sm:text-sm">
          <span
            className={`px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full ${
              sys.status === "Operational"
                ? "bg-green-900/30 text-green-400"
                : sys.status === "Degraded"
                ? "bg-yellow-900/30 text-yellow-400"
                : "bg-red-900/30 text-red-400"
            }`}
          >
            {sys.status}
          </span>
          <p className="mt-2 text-gray-200">{sys.name}</p>
          <p className="text-[10px] sm:text-xs text-gray-400">{sys.detail}</p>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
