import React, { useEffect, useState, useMemo } from "react";
import { Eye, UserPlus, Edit, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/lib/GlobalApi";
import CreateMCNChannelModal from "./CreateMCNChannel";
import { toast } from "sonner";

export default function ActiveChannelTable({ theme = "dark", onRowClick }) {
  const isDark = theme === "dark";
  const textColor = isDark ? "text-gray-300" : "text-[#111A22]";
  const bgColor = isDark ? "bg-[#151F28]" : "bg-white";
  const borderColor = isDark ? "border-[#1f2d38]" : "border-gray-200";
  const inputBg = isDark
    ? "bg-[#111A22] border-[#1f2d38] text-slate-300"
    : "bg-white border-gray-300 text-[#111A22]";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8);
  const [total, setTotal] = useState(0);

  // Fetch MCN Channels
  const fetchChannels = async (page = 1) => {
    try {
      setLoading(true);

      const res = await GlobalApi.getMcnChannels(page, limit);

      const apiData = res?.data?.data?.channels || res?.data?.data || [];
      const totalCount = res?.data?.total || apiData.length;

      const formatted = apiData.map((ch) => ({
        id: ch._id,
        name: ch.channelName,
        youtubeId: ch.youtubeChannelId,
        accountId: ch.userAccountId,
        channelLink: ch.channelLink,
        revenueShare: `${ch.revenueShare}%`,
        manager: ch.channelManager || "-",
        status: ch.status === "active" ? "Active" : "Pending",
      }));

      setChannels(formatted);
      setTotal(totalCount);
    } catch (err) {
      console.error("❌ Error fetching channels:", err);
      toast.error(err.response?.data?.message || "Failed to fetch MCN channels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels(currentPage);
  }, [currentPage]);

  // Filtered results
  const filteredChannels = useMemo(() => {
    const q = search.trim().toLowerCase();
    return channels.filter((channel) => {
      const matchesSearch =
        channel.name.toLowerCase().includes(q) ||
        channel.manager.toLowerCase().includes(q) ||
        channel.accountId.toLowerCase().includes(q) ||
        channel.youtubeId.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "All Status" || channel.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [channels, search, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(total / limit);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

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

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 text-white hover:bg-purple-700"
        >
          + Create MCN Channel
        </Button>
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
        {loading ? (
          <p className="text-center py-6 text-gray-400">Loading channels...</p>
        ) : (
          <table className="min-w-[900px] w-full text-sm border-collapse">
            <thead className="text-gray-500">
              <tr>
                {["MCN Channel", "Status", "Revenue Share", "YouTube ID", "Account ID", "Actions"].map(
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
              {filteredChannels.length > 0 ? (
                filteredChannels.map((channel) => (
                  <tr
                    key={channel.id}
                    className={`border-b ${borderColor} hover:bg-gray-800/10 transition cursor-pointer`}
                    onClick={() => onRowClick && onRowClick(channel)}
                  >
                    {/* Channel Name + Manager */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className={`font-semibold ${textColor}`}>{channel.name}</p>
                      <p className="text-xs text-gray-500">
                        Manager: {channel.manager}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge
                        variant={channel.status === "Active" ? "success" : "warning"}
                      >
                        {channel.status}
                      </Badge>
                    </td>

                    {/* Revenue Share */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`${textColor}`}>{channel.revenueShare}</span>
                    </td>

                    {/* YouTube ID */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-purple-400 font-medium">{channel.youtubeId}</span>
                    </td>

                    {/* Account ID */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-green-400 font-medium">
                        {channel.accountId}
                      </span>
                    </td>

                    {/* Actions */}
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-400 italic text-sm"
                  >
                    No channels found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-between items-center mt-5">
          <Button
            disabled={!canGoPrev}
            onClick={() => setCurrentPage((p) => p - 1)}
            variant="outline"
            className={`flex items-center gap-1 ${!canGoPrev && "opacity-50"}`}
          >
            <ChevronLeft size={16} /> Prev
          </Button>

          <div className={`${textColor} text-sm`}>
            Page {currentPage} of {totalPages}
          </div>

          <Button
            disabled={!canGoNext}
            onClick={() => setCurrentPage((p) => p + 1)}
            variant="outline"
            className={`flex items-center gap-1 ${!canGoNext && "opacity-50"}`}
          >
            Next <ChevronRight size={16} />
          </Button>
        </div>
      )}

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
