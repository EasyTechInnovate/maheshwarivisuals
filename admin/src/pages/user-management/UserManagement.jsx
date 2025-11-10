import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, MoreHorizontal, Music, Lock, Upload } from "lucide-react";
import ManageLabelsModal from "@/components/user-management/ManageLabelsModal";
import UserInfoPage from "../../components/user-management/UserModal";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserManagement({ theme }) {
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [isManageLabelsOpen, setIsManageLabelsOpen] = useState(false);
  const [selectedLabelData, setSelectedLabelData] = useState([]);
  const [activePage, setActivePage] = useState("list"); // list | userInfo
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await GlobalApi.getUsers(1, 10);
      setUsers(res.data.data.users || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewUser = () => {
    setSelectedUser({});
    setActivePage("userInfo");
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setActivePage("userInfo");
  };

  const handleBack = () => setActivePage("list");

  const handleSave = (formData) => {
    console.log("Saving user data:", formData);
    setActivePage("list");
  };

  const handleManageLabels = (user) => {
    setSelectedUser(user);
    setSelectedLabelData([]); // will be fetched later
    setIsManageLabelsOpen(true);
  };

  const filteredUsers = users.filter((u) =>
    u.emailAddress?.toLowerCase().includes(search.toLowerCase())
  );

  // Compute stats
  const totalUsers = users.length;
  const aggregators = users.filter((u) => u.userType === "aggregator").length;
  const artists = users.filter((u) => u.userType === "artist").length;
  const labels = users.filter((u) => u.userType === "label").length;

  const stats = [
    { label: "Total Users", value: totalUsers },
    { label: "Aggregators", value: aggregators },
    { label: "Artists", value: artists },
    { label: "Labels", value: labels },
  ];

  if (activePage === "userInfo") {
    return (
      <UserInfoPage
        theme={theme}
        defaultData={selectedUser}
        onBack={handleBack}
        onSave={handleSave}
      />
    );
  }

  return (
    <div
      className={`p-4 md:p-6 space-y-6 transition-colors duration-300 ${
        isDark
          ? "bg-[#111A22] text-gray-200"
          : "bg-gray-50 text-[#151F28]"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p
            className={`${
              isDark ? "text-gray-400" : "text-gray-600"
            } text-sm`}
          >
            Manage artists, labels, and aggregators in Maheshwari Visuals
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={isDark ? "outline" : "secondary"}
            className="flex items-center gap-2 px-4"
          >
            <Download className="h-4 w-4" /> Import CSV/Excel
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4"
            onClick={handleAddNewUser}
          >
            Add New User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`rounded-lg p-4 shadow-md flex flex-col justify-center ${
              isDark ? "bg-[#151F28]" : "bg-white"
            }`}
          >
            <p className="text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search + Filters + Export */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <Input
          placeholder="Search users by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full md:w-1/3 ${
            isDark
              ? "bg-[#151F28] border-gray-700 text-gray-200"
              : "bg-white"
          }`}
        />
        <div className="flex flex-wrap gap-2 items-center">
          <Button
            variant={isDark ? "outline" : "secondary"}
            className="flex items-center gap-2 px-4"
          >
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* User Table */}
      <div
        className={`rounded-lg overflow-x-auto shadow-md ${
          isDark ? "bg-[#151F28]" : "bg-white"
        }`}
      >
        {loading ? (
          <div className="p-6 text-center text-gray-400">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-6 text-center text-gray-400">No users found</div>
        ) : (
          <table className="w-full text-sm min-w-[1000px]">
            <thead
              className={`${
                isDark ? "text-gray-400" : "text-gray-600"
              } text-left`}
            >
              <tr>
                {[
                  "User ID",
                  "Email",
                  "Role",
                  "Type",
                  "Status",
                  "Join Date",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-medium whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className={`border-t ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <td className="px-4 py-3">{user._id}</td>
                  <td className="px-4 py-3">{user.emailAddress}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                    {user.userType ? user.userType : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.isActive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-2 min-w-max">
                      <Button
                        size="sm"
                        className="bg-purple-600 text-white rounded-full px-3"
                        onClick={() => handleManageLabels(user)}
                      >
                        Manage Label
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className={`${
                            isDark
                              ? "bg-[#151F28] border border-gray-700 text-gray-200"
                              : "bg-white border border-gray-200 text-gray-800"
                          } rounded-lg shadow-md`}
                        >
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ManageLabelsModal
        isOpen={isManageLabelsOpen}
        onClose={() => setIsManageLabelsOpen(false)}
        data={selectedLabelData}
        theme={theme}
        userId={selectedUser?._id}
        userName={selectedUser?.emailAddress}
      />
    </div>
  );
}
