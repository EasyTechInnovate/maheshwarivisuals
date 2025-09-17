import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { IndianRupee, Calendar, BarChart3 } from "lucide-react";
import { mockMonthManagementData } from "./MonthManagementData";

export default function MCNMonthManagement({ theme = "dark", onBack }) {
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");
   const [showDropdown, setShowDropdown] = useState(false);
    const handleBulkDelete = () => console.log("Bulk Delete Clicked");
    const handleBulkEdit = () => console.log("Bulk Edit Clicked");
    const dropdownRef = useRef();

  // === Use the actual months From APIs (Jan / Feb / Mar) ===
  const monthList = [
    { id: "jan", name: "January", active: false },
    { id: "feb", name: "February", active: false },
    { id: "mar", name: "March", active: false },
  ];

  // Filter months using the search input (keeps your search logic)
  const filteredMonths = monthList.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  // Keep the other stats (Total / Active derived from monthList so they reflect the table)
  const totalMonths = monthList.length;
  const activeMonths = monthList.filter((m) => m.active).length;

  const stats = [
    { label: "Total Months", value: totalMonths, icon: <Calendar className="h-5 w-5" /> },
    { label: "Active Months", value: activeMonths, icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Total Royalties", value: `₹${mockMonthManagementData.totalRoyalties.toLocaleString()}`, icon: <IndianRupee className="h-5 w-5" />, color: "text-blue-400" },
    { label: "Total Analytics Value", value: `₹${mockMonthManagementData.totalAnalyticsValue.toLocaleString()}`, icon: <IndianRupee className="h-5 w-5" />, color: "text-purple-400" },
  ];

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
  <div>
    <h1 className="text-2xl font-semibold">MCN Month Management</h1>
    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
      Organize monthly data entries for royalty and analytics management
    </p>
  </div>

  {/* Wrap buttons together */}
  <div className="flex gap-3">
    <Button
      onClick={onBack}
      className={`rounded-full px-5 ${
        isDark
          ? "bg-gray-600 hover:bg-gray-700 text-white"
          : "bg-gray-200 hover:bg-gray-300 text-gray-900"
      }`}
    >
      ← Back
    </Button>

    <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5">
      + Add New Month
    </Button>
  </div>
</div>

      

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-lg p-4 shadow-md flex items-center justify-between ${
              isDark ? "bg-[#151F28]" : "bg-white"
            }`}
          >
            <div>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {stat.label}
              </p>
              <p className={`text-2xl font-semibold ${stat.color || ""}`}>
                {stat.value}
              </p>
            </div>
            <div className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Search & Filters (keeps your selects) */}
      <div
        className={`flex flex-wrap gap-3 mt-6 items-center p-4 rounded-xl border ${
          isDark ? "bg-[#151F28] border-gray-700" : "bg-white border-gray-300 shadow-sm"
        }`}
      >
        <Input
          placeholder="Search by month..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`flex-1 md:w-96 border ${
            isDark ? "bg-[#0F172A] text-gray-200 border-gray-700" : "bg-white text-gray-900 border-gray-300"
          }`}
        />

        {/* Licence */}
        <Select>
          <SelectTrigger className={`w-48 border ${isDark ? "bg-[#151F28] text-gray-200 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}>
            <SelectValue placeholder="All Licenses" />
          </SelectTrigger>
          <SelectContent className={`w-48 ${isDark ? "bg-[#151F28] text-gray-200 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}>
            <SelectItem value="Licence A">Licence A</SelectItem>
            <SelectItem value="Licence B">Licence B</SelectItem>
          </SelectContent>
        </Select>

        {/* Month filter (keeps your actual months as select options too) */}
        <Select>
          <SelectTrigger className={`w-48 border ${isDark ? "bg-[#151F28] text-gray-200 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}>
            <SelectValue placeholder="All Months" />
          </SelectTrigger>
          <SelectContent className={`w-48 ${isDark ? "bg-[#151F28] text-gray-200 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}>
            <SelectItem value="Jan">Jan</SelectItem>
            <SelectItem value="Feb">Feb</SelectItem>
            <SelectItem value="Mar">Mar</SelectItem>
          </SelectContent>
        </Select>

        {/* Accounts */}
        <Select>
          <SelectTrigger className={`w-48 border ${isDark ? "bg-[#151F28] text-gray-200 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}>
            <SelectValue placeholder="All Accounts" />
          </SelectTrigger>
          <SelectContent className={`w-48 ${isDark ? "bg-[#151F28] text-gray-200 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}>
            <SelectItem value="Account 1">Account 1</SelectItem>
            <SelectItem value="Account 2">Account 2</SelectItem>
          </SelectContent>
        </Select>

         <div className="relative" ref={dropdownRef}>
                    <Button
                      variant="outline"
                      className=" px-5 text-red-500"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      Bulk Action
                    </Button>
                    {showDropdown && (
                      <div
                        className={`absolute top-12 right-0 w-36 rounded-md shadow-md border z-20 ${isDark ? "bg-[#151F28] text-gray-200 border-gray-700" : "bg-white text-gray-800 border-gray-200"
                          }`}
                      >
                        <p
                          className={`px-3 py-2 cursor-pointer hover:${isDark ? "bg-gray-700" : "bg-gray-200"}`}
                          onClick={handleBulkDelete}
                        >
                          Bulk Delete
                        </p>
                        <p
                          className={`px-3 py-2 cursor-pointer hover:${isDark ? "bg-gray-700" : "bg-gray-200"}`}
                          onClick={handleBulkEdit}
                        >
                          Bulk Edit
                        </p>
                      </div>
                    )}
                  </div>
      </div>

      {/* Table: shows EXACT months Jan / Feb / Mar (search filters this list) */}
      <div
        className={`mt-6 rounded-xl shadow-md overflow-x-auto border max-w-xl ${
          isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        <table className="min-w-full text-sm">
          <thead className={`${isDark ? "bg-[#0F172A] text-gray-400" : "bg-gray-100 text-gray-700"}`}>
            <tr>
              <th className="text-left px-6 py-3 font-medium">SR No.</th>
              <th className="text-left px-6 py-3 font-medium">Month</th>
              <th className="text-left px-6 py-3 font-medium">Display Status</th>
              <th className="text-left px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-300"}`}>
            {filteredMonths.map((month, idx) => (
              <tr key={month.id} className={`transition-colors ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}>
                <td className="px-6 py-3">{idx + 1}</td>
                <td className="px-6 py-3">{month.name}</td>
                <td className="px-6 py-3">
                  <Switch defaultChecked={month.active} />
                </td>
                <td className="px-6 py-3">
                  <Button variant="outline" className={`px-3 py-1 rounded-full ${isDark ? "border-gray-600" : "border-gray-300"}`}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}

            {filteredMonths.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                  No months found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
