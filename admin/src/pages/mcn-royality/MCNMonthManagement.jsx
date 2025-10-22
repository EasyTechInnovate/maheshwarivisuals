import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, BarChart, Calendar, FileText, DollarSign, Edit2, ChevronDown, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

import { mockMCNStats, mockMonths } from "./MCNMonthManagementData";

const iconMap = {
  months: Calendar,
  active: BarChart,
  royalties: FileText,
  analytics: DollarSign,
};

export default function MCNMonthManagement({ theme }) {
  const isDark = theme === "dark";
  const [months, setMonths] = useState(mockMonths);
  const [showBulk, setShowBulk] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMonth = (id) =>
    setMonths((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isActive: !m.isActive } : m))
    );

  return (
    <div
      className={`p-6 transition-colors duration-300 ${
        isDark ? "bg-[#111A22] text-gray-200" : "bg-gray-50 text-[#111A22]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">MCN Month Management</h1>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Organize monthly data entries for royalty and analytics management
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          + Add New Month
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {mockMCNStats.map((s) => {
          const Icon = iconMap[s.key];
          return (
            <Card
              key={s.key}
              className={`relative ${
                isDark
                  ? "bg-[#151F28] border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <CardContent className="p-4">
                <div
                  className={`absolute top-3 right-3 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {s.label}
                </p>
                <p
                  className={`text-2xl font-bold ${
                    s.key === "active"
                      ? "text-green-500"
                      : s.key === "royalties"
                      ? "text-blue-500"
                      : s.key === "analytics"
                      ? "text-purple-500"
                      : ""
                  }`}
                >
                  {s.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-6">
        <div className="relative flex-1">
          <Search
            className={`absolute left-3 top-2.5 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
            size={18}
          />
          <input
            type="text"
            placeholder="Search by artist, track, or account ID..."
            className={`w-full text-sm pl-10 pr-4 py-2 rounded-lg border ${
              isDark
                ? "bg-[#151F28] text-gray-200 border-gray-700"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          />
        </div>

        <div className="flex gap-2">
          {["All Licences", "All Months", "All Accounts"].map((label) => (
            <select
              key={label}
              className={`text-sm rounded-lg px-3 py-2 border ${
                isDark
                  ? "bg-[#151F28] text-gray-200 border-gray-700"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              <option>{label}</option>
            </select>
          ))}

          {/* Bulk Actions */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              className="px-5 text-red-500 border-red-500"
              onClick={() => setShowBulk((s) => !s)}
            >
              <Trash2 className="mr-2 w-4 h-4" /> Bulk Action
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            {showBulk && (
              <div
                className={`absolute top-11 right-0 w-36 rounded-md shadow-md border z-20 ${
                  isDark
                    ? "bg-[#151F28] text-gray-200 border-gray-700"
                    : "bg-white text-gray-800 border-gray-200"
                }`}
              >
                <button
                  className={`w-full text-left px-3 py-2 text-sm ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  Bulk Delete
                </button>
                <button
                  className={`w-full text-left px-3 py-2 text-sm ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  Bulk Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className={`mt-6 overflow-x-auto rounded-lg shadow-md ${
          isDark ? "bg-[#151F28]" : "bg-white"
        }`}
      >
        <table className="w-full border-collapse text-sm">
          <thead
            className={`text-left ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <tr>
              {["SR No.", "Month", "Display Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {months.map((m, idx) => (
              <tr
                key={m.id}
                className={`border-t ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } ${isDark ? "hover:bg-gray-800/40" : "hover:bg-gray-100/60"}`}
              >
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3 font-medium">{m.month}</td>
                <td className="px-4 py-3">
                  <Switch
                    checked={m.isActive}
                    onCheckedChange={() => toggleMonth(m.id)}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </td>
                <td className="px-4 py-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" /> Edit
                  </Button>
                </td>
              </tr>
            ))}
            {months.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className={`text-center py-6 ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
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
