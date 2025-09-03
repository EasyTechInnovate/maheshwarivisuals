import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Upload, Edit, Trash2 } from "lucide-react";
import { mockAnalyticsData } from "./AnalyticsManagementData";

export default function AnalyticsManagement({ theme }) {
  const isDark = theme === "dark";
  const [analyticsData] = useState(mockAnalyticsData);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Stats
  const totalRecords = analyticsData.length;
  const totalUnits = analyticsData.reduce((sum, r) => sum + r.totalUnits, 0);
  const totalRevenue = analyticsData.reduce((sum, r) => sum + r.revenue, 0);
  const activeRecords = analyticsData.filter(r => r.active).length;

  // Filter data
  const filteredData = analyticsData.filter((item) =>
    item.month.toLowerCase().includes(search.toLowerCase())
  );

  // Bulk actions
  const handleBulkDelete = () => console.log("Bulk Delete Clicked");
  const handleBulkEdit = () => console.log("Bulk Edit Clicked");

  
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={`p-4 md:p-6 space-y-6 transition-colors duration-300 ${isDark ? "bg-[#151F28] text-gray-200" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <div>
          <h1 className="text-xl font-semibold">Analytics Management</h1>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage and analyze music distribution analytics data
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant={isDark ? "outline" : "secondary"} className="flex items-center gap-2 rounded-full px-5">
            <Download className="h-4 w-4" /> Import CSV/Excel
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5">
            Export Analytics
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Records", value: totalRecords },
          { label: "Total Units", value: totalUnits },
          { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, color: "text-green-500" },
          { label: "Active Records", value: activeRecords },
        ].map((stat, i) => (
          <div key={i} className={`rounded-lg p-4 shadow-md ${isDark ? "bg-[#111A22]" : "bg-white"}`}>
            <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
            <p className={`text-2xl font-semibold ${stat.color || ""}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
        <Input
          placeholder="Search by artist, track, or account ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full md:w-1/3 ${isDark ? "bg-[#111A22] border-gray-700 text-gray-200" : "bg-white"}`}
        />
        <div className="flex flex-wrap gap-2 items-center">
          <select className={`rounded-md px-3 py-2 text-sm ${isDark ? "bg-[#111A22] border border-gray-700 text-gray-200" : "bg-white border border-gray-300"}`}>
            <option>All Licences</option>
          </select>
          <select className={`rounded-md px-3 py-2 text-sm ${isDark ? "bg-[#111A22] border border-gray-700 text-gray-200" : "bg-white border border-gray-300"}`}>
            <option>All Months</option>
          </select>
          <select className={`rounded-md px-3 py-2 text-sm ${isDark ? "bg-[#111A22] border border-gray-700 text-gray-200" : "bg-white border border-gray-300"}`}>
            <option>All Accounts</option>
          </select>

          {/* Bulk Action Dropdown */}
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
                className={`absolute top-12 right-0 w-36 rounded-md shadow-md border z-20 ${
                  isDark ? "bg-[#111A22] text-gray-200 border-gray-700" : "bg-white text-gray-800 border-gray-200"
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
      </div>

      {/* Table */}
      <div className={`rounded-lg overflow-x-auto shadow-md ${isDark ? "bg-[#111A22]" : "bg-white"}`}>
        <table className="w-full text-sm min-w-[600px]">
          <thead className={`${isDark ? "text-gray-400" : "text-gray-600"} text-left`}>
            <tr>
              <th className="px-4 py-3 font-medium">Months</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={idx} className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                <td className="px-4 py-3">{row.month}</td>
                <td className="px-4 py-3 flex flex-wrap gap-2">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center gap-1">
                    <Upload className="h-4 w-4" /> Upload Sheet
                  </Button>
                  <Button size="sm" variant={isDark ? "outline" : "secondary"} className="rounded-full flex items-center gap-1">
                    <Edit className="h-4 w-4" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full flex items-center gap-1 text-red-500">
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
