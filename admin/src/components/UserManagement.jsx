import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, MoreHorizontal, Music, Lock, Upload } from "lucide-react";

import { users as mockUsers } from "./UserData";

export default function UserManagement({ theme }) {
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");
  const [users] = useState(mockUsers);

  const filteredUsers = users.filter(
    (u) =>
      u.stageName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`p-4 md:p-6 space-y-6 transition-colors duration-300 ${isDark ? "bg-[#151F28] text-gray-200" : "bg-gray-50 text-gray-900"
        }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <div>
          <h1 className="text-xl font-semibold">User Management</h1>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage artists, labels, and aggregators in Maheshwari Visuals
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={isDark ? "outline" : "secondary"}
            className="flex items-center gap-2 rounded-full px-5"
          >
            <Download className="h-4 w-4" /> Import CSV/Excel
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5">
            Add New User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length },
          {
            label: "Active Users",
            value: users.filter((u) => u.status === "Active").length,
            color: "text-green-500",
          },
          {
            label: "Artists",
            value: users.filter((u) => u.accountType === "Artist").length,
          },
          {
            label: "Labels",
            value: users.filter((u) => u.accountType === "Label").length,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`rounded-lg p-4 shadow-md ${isDark ? "bg-[#111A22]" : "bg-white"
              }`}
          >
            <p
              className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"
                }`}
            >
              {stat.label}
            </p>
            <p
              className={`text-2xl font-semibold ${stat.color ? stat.color : ""
                }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
        <Input
          placeholder="Search users by name, ID, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full md:w-1/3 ${isDark ? "bg-[#111A22] border-gray-700 text-gray-200" : "bg-white"
            }`}
        />
        <div className="flex flex-wrap gap-2">
          <select
            className={`rounded-md px-3 py-2 text-sm ${isDark
                ? "bg-[#111A22] border border-gray-700 text-gray-200"
                : "bg-white border border-gray-300"
              }`}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select
            className={`rounded-md px-3 py-2 text-sm ${isDark
                ? "bg-[#111A22] border border-gray-700 text-gray-200"
                : "bg-white border border-gray-300"
              }`}
          >
            <option>All Types</option>
            <option>Artist</option>
            <option>Label</option>
            <option>Aggregator</option>
          </select>
          <Button
            variant={isDark ? "outline" : "secondary"}
            className="flex items-center gap-2 rounded-full px-5"
          >
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div
        className={`rounded-lg overflow-x-auto shadow-md ${isDark ? "bg-[#111A22]" : "bg-white"
          }`}
      >
        <table className="w-full text-sm min-w-[700px]">
          <thead
            className={`${isDark ? "text-gray-400" : "text-gray-600"} text-left`}
          >
            <tr>
              {[
                "User ID",
                "Stage Name",
                "Account Type",
                "Status",
                "Membership Status",
                "Email",
                "Join Date",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"
                  }`}
              >
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.stageName}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${user.accountType === "Artist"
                        ? "bg-purple-500/20 text-purple-400"
                        : user.accountType === "Label"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-orange-500/20 text-orange-400"
                      }`}
                  >
                    {user.accountType}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${user.membership === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : user.membership === "Not Applicable"
                          ? "bg-gray-500/20 text-gray-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                  >
                    {user.membership}
                  </span>
                </td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.joinDate}</td>
                <td className="px-4 py-3 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1 rounded-full px-5"
                  >
                    <Music className="h-4 w-4" /> Manage Release
                  </Button>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5"
                  >
                    Manage Label
                  </Button>
                  <Button
                    size="sm"

                    className="bg-purple-600 hover:bg-purple-700 flex items-center gap-1 rounded-full px-5 text-white"
                  >
                    <Lock className="h-4 w-4" /> Reset Password
                  </Button>
                  <Button
                    size="sm"

                    className="bg-purple-600 hover:bg-purple-700 flex items-center gap-1 rounded-full px-5 text-white"
                  >
                    <Upload className="h-4 w-4" /> Upload Catalog
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className={`${isDark
                          ? "bg-[#111A22] border border-gray-700 text-gray-200"
                          : "bg-white border border-gray-200 text-gray-800"
                        } rounded-lg shadow-md`}
                    >
                      <DropdownMenuItem>KYC Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>

                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
