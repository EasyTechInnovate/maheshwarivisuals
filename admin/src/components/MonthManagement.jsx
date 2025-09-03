import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, BarChart3, IndianRupee } from "lucide-react";
import { mockMonthManagementData } from "./MonthManagementData";

export default function MonthManagement({ theme }) {
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");
  const [monthData] = useState(mockMonthManagementData);

  const stats = [
    { label: "Total Months", value: monthData.totalMonths, icon: <Calendar className="h-5 w-5" /> },
    { label: "Active Months", value: monthData.activeMonths, icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Total Royalties", value: `₹${monthData.totalRoyalties.toLocaleString()}`, icon: <IndianRupee className="h-5 w-5" />, color: "text-blue-400" },
    { label: "Total Analytics Value", value: `₹${monthData.totalAnalyticsValue.toLocaleString()}`, icon: <IndianRupee className="h-5 w-5" />, color: "text-purple-400" },
  ];

  // Filtered month list
  const filteredMonths = monthData.monthList.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`p-4 md:p-6 space-y-6 transition-colors duration-300 ${isDark ? "bg-[#151F28] text-gray-200" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <div>
          <h1 className="text-xl font-semibold">Month Management</h1>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Organize monthly data entries for royalty and analytics management
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5">
          + Add New Month
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`rounded-lg p-4 shadow-md flex items-center justify-between ${isDark ? "bg-[#111A22]" : "bg-white"}`}>
            <div>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
              <p className={`text-2xl font-semibold ${stat.color || ""}`}>{stat.value}</p>
            </div>
            <div className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <Input
        placeholder="Search months and years..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`w-full ${isDark ? "bg-[#111A22] border-gray-700 text-gray-200" : "bg-white"}`}
      />

      {/* Month List */}
      <div className={`rounded-lg shadow-md p-4 ${isDark ? "bg-[#111A22]" : "bg-white"}`}>
        <h2 className="text-sm font-semibold mb-3">Month Management</h2>
        <ul className="space-y-2">
          {filteredMonths.map((month) => (
            <li key={month.id} className={`p-3 rounded-md text-sm cursor-pointer hover:${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
              {month.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
