import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockTeamData } from "./TeamManagementData";

export default function TeamManagement({ theme }) {
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");
  const [data] = useState(mockTeamData);

  const stats = [
    { label: "Total Team Members", value: data.totalMembers, sub: "+3 this month" },
    { label: "Active Members", value: data.activeMembers, sub: "+2 this week" },
    { label: "Pending Invitations", value: data.pendingInvites, sub: "2 sent today" },
    { label: "Avg. Response Time", value: data.avgResponseTime, sub: data.avgResponseChange },
  ];

  const filteredMembers = data.members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`p-4 md:p-6 space-y-6 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-[#151F28]"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Team Management</h1>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>
            Manage team members, roles, permissions, and departments
          </p>
        </div>

        {/* Search + Filters + Button */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Input
            placeholder="Search team members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full md:w-64 ${
              isDark ? "bg-[#151F28] border-gray-700 text-gray-200" : "bg-white"
            }`}
          />
          <select
            className={`rounded-md px-3 py-2 text-sm ${
              isDark
                ? "bg-[#151F28] border border-gray-700 text-gray-200"
                : "bg-white border border-gray-300"
            }`}
          >
            <option>All Roles</option>
          </select>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Add Member
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className={`rounded-lg p-4 shadow-md flex flex-col justify-center ${
              isDark ? "bg-[#151F28]" : "bg-white"
            }`}
          >
            <p className="text-sm">{s.label}</p>
            <p className="text-2xl font-semibold">{s.value}</p>
            <p className="text-xs text-gray-500">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Team Members Table */}
      <div
        className={`rounded-lg overflow-x-auto shadow-md ${
          isDark ? "bg-[#151F28]" : "bg-white"
        }`}
      >
        <table className="w-full text-sm min-w-[800px]">
          <thead
            className={`${isDark ? "text-gray-400" : "text-gray-600"} text-left`}
          >
            <tr>
              <th className="px-4 py-3 font-medium">Member</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Join Date</th>
              <th className="px-4 py-3 font-medium">Last Active</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((m, idx) => (
              <tr
                key={idx}
                className={`border-t ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {m.role}
                  </span>
                </td>
                <td className="px-4 py-3">{m.department}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      m.status === "Active"
                        ? "bg-purple-600 text-white"
                        : m.status === "Away"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3">{m.joinDate}</td>
                <td className="px-4 py-3">{m.lastActive}</td>
                <td className="px-4 py-3 flex gap-2">
                  <Button size="sm" variant={isDark ? "outline" : "secondary"}>
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-500">
                    Remove
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
