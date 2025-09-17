import { useState, useMemo } from "react";
import { Eye, UserPlus, Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockActiveChannels } from "./MCNManagementData";
import CreateMCNChannelModal from "./CreateMCNChannel";

export default function ActiveChannelTable({ theme = "dark", onRowClick }) {
  const isDark = theme === "dark";
  const textColor = isDark ? "text-gray-300" : "text-gray-900";
  const bgColor = isDark ? "bg-[#151F28]" : "bg-white";
  const borderColor = isDark ? "border-[#1f2d38]" : "border-gray-200";
  const inputBg = isDark
    ? "bg-gray-900 border-[#1f2d38] text-slate-300"
    : "bg-white border-gray-300 text-gray-900";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredChannels = useMemo(() => {
    const q = search.trim().toLowerCase();
    return mockActiveChannels.filter((channel) => {
      const matchesSearch =
        channel.name.toLowerCase().includes(q) ||
        channel.platforms.toLowerCase().includes(q) ||
        channel.manager.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All Status" || channel.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className={`rounded-2xl p-5 ${bgColor} border ${borderColor} shadow-lg`}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className={`text-xl font-semibold ${textColor}`}>MCN Channels</h3>
          <p className={`text-sm opacity-75 ${textColor}`}>
            Manage Multi-Channel Networks and their associated data
          </p>
        </div>

        <button
          className="px-4 py-2 rounded-lg text-sm bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
          onClick={() => setIsModalOpen(true)} // Open modal
        >
          + Create MCN Channel
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search MCN channels..."
          className={`flex-1 px-3 py-2 rounded-lg text-sm border focus:ring-2 focus:ring-purple-500 focus:outline-none transition ${inputBg}`}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`px-3 py-2 rounded-lg text-sm border focus:ring-2 focus:ring-purple-500 focus:outline-none transition ${inputBg}`}
        >
          {["All Status", "Active", "Pending"].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm border-collapse">
          <thead className="text-gray-500">
            <tr>
              {["MCN Channel", "Status", "Revenue Share", "Growth", "Actions"].map(
                (th, idx) => (
                  <th
                    key={idx}
                    className="text-left px-4 py-3 font-medium uppercase tracking-wide text-xs border-b"
                  >
                    {th}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {filteredChannels.map((channel) => (
              <tr
                key={channel.id}
                className={`border-b ${borderColor} hover:bg-gray-800/10 transition cursor-pointer`}
                onClick={() => onRowClick && onRowClick(channel)}
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div>
                    <p className={`font-semibold ${textColor}`}>{channel.name}</p>
                    <p className="text-xs text-gray-400">{channel.platforms}</p>
                    <p className="text-xs text-gray-500">
                      Manager: {channel.manager}
                    </p>
                  </div>
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge
                    variant={channel.status === "Active" ? "success" : "warning"}
                  >
                    {channel.status}
                  </Badge>
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`${textColor}`}>{channel.revenueShare}</span>
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-green-500 font-medium">
                    {channel.growth}
                  </span>
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {[Eye, UserPlus, Edit].map((Icon, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(`Clicked ${Icon.name} for`, channel);
                        }}
                        className={`p-2 rounded-lg ${
                          isDark
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : "bg-gray-200 text-black hover:bg-gray-300"
                        } transition`}
                      >
                        <Icon size={16} />
                      </button>
                    ))}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Delete clicked for", channel);
                      }}
                      className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredChannels.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-400 italic text-sm"
                >
                  No channels found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create MCN Channel Modal */}
      <CreateMCNChannelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        theme={theme}
        channelTypes={[
          { id: 1, name: "Entertainment" },
          { id: 2, name: "Education" },
          { id: 3, name: "Music" },
        ]}
      />
    </div>
  );
}
