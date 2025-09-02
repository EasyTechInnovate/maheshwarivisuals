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

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [users] = useState(mockUsers); 

  const filteredUsers = users.filter(
    (u) =>
      u.stageName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">User Management</h1>
          <p className="text-sm text-gray-400">
            Manage artists, labels, and aggregators in Maheshwari Visuals
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Import CSV/Excel
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Add New User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#111A22] rounded-lg p-4">
          <p className="text-sm text-gray-400">Total Users</p>
          <p className="text-2xl font-semibold">{users.length}</p>
        </div>
        <div className="bg-[#111A22] rounded-lg p-4">
          <p className="text-sm text-gray-400">Active Users</p>
          <p className="text-2xl font-semibold text-green-500">
            {users.filter((u) => u.status === "Active").length}
          </p>
        </div>
        <div className="bg-[#111A22] rounded-lg p-4">
          <p className="text-sm text-gray-400">Artists</p>
          <p className="text-2xl font-semibold">
            {users.filter((u) => u.accountType === "Artist").length}
          </p>
        </div>
        <div className="bg-[#111A22] rounded-lg p-4">
          <p className="text-sm text-gray-400">Labels</p>
          <p className="text-2xl font-semibold">
            {users.filter((u) => u.accountType === "Label").length}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
        <Input
          placeholder="Search users by name, ID, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/3"
        />
        <div className="flex gap-2">
          <select className="bg-[#111A22] border border-gray-700 rounded-md px-3 py-2 text-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="bg-[#111A22] border border-gray-700 rounded-md px-3 py-2 text-sm">
            <option>All Types</option>
            <option>Artist</option>
            <option>Label</option>
            <option>Aggregator</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111A22] rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400 text-left">
            <tr>
              <th className="px-4 py-3">User ID</th>
              <th className="px-4 py-3">Stage Name</th>
              <th className="px-4 py-3">Account Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Membership Status</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Join Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t border-gray-700">
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.stageName}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.accountType === "Artist"
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
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.membership === "Active"
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
                <td className="px-4 py-3 flex gap-2 flex-wrap">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 flex items-center gap-1">
                    <Music className="h-4 w-4" /> Manage Release
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Manage Label
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Lock className="h-4 w-4" /> Reset Password
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Upload className="h-4 w-4" /> Upload Catalog
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
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
