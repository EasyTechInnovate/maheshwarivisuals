import React, { useMemo, useState, useEffect } from "react";
import { Upload, Download, Search, Info } from "lucide-react";
import ActiveChannelTable from "../../components/mcn-management/MCNActiveChannel";
import { motion, AnimatePresence } from "framer-motion";
import MCNInfoForm from "../../components/mcn-management/MCNUserForm";
import GlobalApi from "@/lib/GlobalApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MCNRequestViewModal from "../../components/mcn-management/MCNReviewModal";

export default function MCNManagement({ theme = "dark" }) {
  const isDark = theme === "dark";
  const [rows, setRows] = useState([]);
  const [statsData, setStatsData] = useState({
    totalRecords: 0,
    totalUnits: 0,
    totalRevenue: 0,
    activeRecords: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("request");
  const [selectedUser, setSelectedUser] = useState(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [processing, setProcessing] = useState(false);


  const [stats, setStats] = useState(null);
  const fetchStats = async () => {
    try {
      const res = await GlobalApi.getMcnStats();
      const data = res?.data?.data || null;
      setStats(data);
    } catch (err) {
      console.error("❌ Error fetching MCN stats:", err);

      toast.error(err?.response?.data?.message || err?.message || "Failed to fetch stats");
      setStats(null);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await GlobalApi.getMcnRequests(1, 10);
      const apiData = res?.data?.data?.requests || [];

      const formatted = apiData.map((r) => ({
        id: r._id,
        channelName: r.youtubeChannelName,
        subscribers: r.subscriberCount,
        submittedAt: new Date(r.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        accountId: r.userAccountId || "-",
        totalViews28d: r.totalViewsCountsIn28Days,
        adSenseEnabled: r.isAdSenseEnabled ? "Yes" : "No",
        copyrightStrikes: r.hasCopyrightStrikes ? "Yes" : "No",
        hundredPercentOriginal: r.isContentOriginal ? "Yes" : "No",
        anotherMCN: r.isPartOfAnotherMCN ? "Yes" : "No",
        lastMonthRevenue: r.channelRevenueLastMonth,
        monetizationEligibility: r.monetizationEligibility ? "Eligible" : "Not Eligible",
        status: r.status || "pending",
        adminNotes: r.adminNotes,
        rejectionReason: r.rejectionReason,
        raw: r,
      }));

      setRows(formatted);

      const totalRecords = apiData.length;
      const totalUnits = apiData.reduce((sum, r) => sum + (r.subscriberCount || 0), 0);
      const totalRevenue = apiData.reduce((sum, r) => sum + (r.channelRevenueLastMonth || 0), 0);
      const activeRecords = apiData.filter((r) => r.isActive).length;

      setStatsData({ totalRecords, totalUnits, totalRevenue, activeRecords });
    } catch (err) {
      console.error("❌ Error fetching MCN requests:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
      setProcessing(false);
    }
  };

  useEffect(() => {

    fetchRequests();
    fetchStats();

  }, []);


  useEffect(() => {
    fetchStats();

  }, [activeTab]);

  const handleApprove = async (id, adminNotes) => {
    try {
      setProcessing(true);
      await GlobalApi.reviewMcnRequest(id, { action: "approve", adminNotes });
      toast.success("Request approved");
      await fetchRequests();
      setIsViewOpen(false);
    } catch (err) {
      console.error("❌ Approve error:", err);
      toast.error(err.response?.data?.message || "Failed to approve request");
      setProcessing(false);
    }
  };

  const handleReject = async (id, adminNotes, rejectionReason) => {
    if (!rejectionReason?.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    try {
      setProcessing(true);
      await GlobalApi.reviewMcnRequest(id, { action: "reject", adminNotes, rejectionReason });
      toast.success("Request rejected");
      await fetchRequests();
      setIsViewOpen(false);
    } catch (err) {
      console.error("❌ Reject error:", err);
      toast.error(err.response?.data?.message || "Failed to reject request");
      setProcessing(false);
    }
  };

  const formatINR = (n) =>
    typeof n === "number" ? `₹${n.toLocaleString("en-IN")}` : String(n || "-");

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        (r.channelName || "").toLowerCase().includes(q) ||
        (String(r.subscribers) || "").includes(q) ||
        (String(r.lastMonthRevenue) || "").includes(q)
    );
  }, [rows, search]);


  const getTopStats = () => {

    const s = stats || {};
    const revenueFromRequests = s.revenue?.totalRevenue ?? 0;
    const requestsObj = s.requests || {};
    const channelsActive = s.channels?.active || {};
    const revenueChannelsActive = channelsActive.totalRevenue ?? 0;
    const countChannelsActive = channelsActive.count ?? 0;
    const avgRevenueShare = channelsActive.avgRevenueShare ?? 0;
    const totalChannels = s.revenue?.totalChannels ?? 0;

    if (activeTab === "active") {
      return [
        { label: "Active Channels", value: countChannelsActive },
        { label: "Total Revenue", value: revenueChannelsActive, highlight: true },
        { label: "Avg Revenue Share", value: `${avgRevenueShare !== null ? String(avgRevenueShare) : "-"}%` },
        { label: "Total Channels", value: totalChannels },
      ];
    }


    return [
      { label: "Approved", value: requestsObj.approved ?? 0 },
      { label: "Pending", value: requestsObj.pending ?? 0 },
      { label: "Rejected", value: requestsObj.rejected ?? 0 },
      { label: "Total Revenue", value: revenueFromRequests, highlight: true },
    ];
  };

  const topStats = getTopStats();

  const bgMain = isDark ? "bg-[#111A22] text-slate-300" : "bg-gray-50 text-[#151F28]";
  const cardBg = isDark ? "bg-[#151F28]" : "bg-white";
  const borderColor = isDark ? "border-[#12212a]" : "border-gray-300";
  const textColor = isDark ? "text-gray-300" : "text-[#151F28]";
  const textMuted = isDark ? "text-gray-400" : "text-gray-600";
  const inputBg = isDark
    ? "bg-[#111A22] border-[#12212a] text-slate-300"
    : "bg-white border-gray-300 text-[#111A22]";
  const tabActive = isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-black";
  const tabInactive = isDark ? "bg-[#151F28] text-gray-300" : "bg-gray-200 text-gray-600";
  const rowHover = isDark ? "hover:bg-gray-800" : "hover:bg-gray-100";

  if (selectedUser) {
    return (
      <MCNInfoForm user={selectedUser} theme={theme} onBack={() => setSelectedUser(null)} />
    );
  }

  return (
    <div className={`${bgMain} min-h-screen p-4 md:p-6`}>
      <div className="max-w-[1200px] mx-auto space-y-6">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">MCN Management</h1>
            <p className={`text-sm ${textMuted}`}>
              Manage and analyze MCN requests and active channels
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("Import CSV/Excel (mock)")}
              className={`px-3 py-2 rounded-md border ${borderColor} ${isDark ? "bg-transparent" : "bg-white"
                } text-sm inline-flex items-center gap-2`}
            >
              <Upload className="w-4 h-4" /> Import CSV/Excel
            </button>
            <button
              onClick={() => alert("Export Analytics (mock)")}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white text-sm inline-flex items-center gap-2 shadow"
            >
              <Download className="w-4 h-4" /> Export Analytics
            </button>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {topStats.map((item, idx) => {

            const isRevenueLabel = item.label.toLowerCase().includes("revenue");
            let displayValue = item.value;
            if (isRevenueLabel) {
              displayValue =
                typeof item.value === "number" ? formatINR(item.value) : String(item.value || "-");
            } else {

              if (typeof item.value === "number") {
                displayValue = item.value.toLocaleString("en-IN");
              } else {
                displayValue = String(item.value ?? "-");
              }
            }

            return (
              <div
                key={idx}
                className={`rounded-lg p-4 ${cardBg} border ${borderColor} shadow-sm`}
              >
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${textMuted}`}>{item.label}</p>
                  {item.label === "Total Revenue" && (
                    <Info className="w-4 h-4 opacity-60" />
                  )}
                </div>
                <p
                  className={`text-2xl font-semibold mt-2 ${item.highlight ? "text-emerald-400" : textColor
                    }`}
                >
                  {displayValue}
                </p>
              </div>
            );
          })}
        </div>

        <div className={`rounded-md p-4 ${cardBg} border ${borderColor}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 opacity-60" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by artist, track, or account ID..."
                className={`pl-10 pr-3 py-2 w-full rounded-md text-sm border ${inputBg}`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select className={`text-sm px-3 py-2 rounded-md border ${inputBg}`} defaultValue="all">
                <option value="all">All Licenses</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>

              <select className={`text-sm px-3 py-2 rounded-md border ${inputBg}`} defaultValue="all">
                <option value="all">All Months</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
              </select>

              <select className={`text-sm px-3 py-2 rounded-md border ${inputBg}`} defaultValue="all">
                <option value="all">All Accounts</option>
                <option value="youtube">YouTube</option>
                <option value="spotify">Spotify</option>
                <option value="apple">Apple Music</option>
              </select>

              <select className={`text-sm px-3 py-2 rounded-md border ${inputBg}`} defaultValue="">
                <option value="">Bulk Action</option>
                <option value="approve">Approve Selected</option>
                <option value="reject">Reject Selected</option>
                <option value="export">Export Selected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div
            className={`inline-flex rounded-full overflow-hidden border ${borderColor} w-[500px]`}
          >
            <button
              onClick={() => setActiveTab("request")}
              className={`flex-1 py-2 text-sm font-medium ${activeTab === "request" ? tabActive : tabInactive
                }`}
            >
              Request
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`flex-1 py-2 text-sm font-medium ${activeTab === "active" ? tabActive : tabInactive
                }`}
            >
              Active Channel
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "active" && (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`rounded-xl p-6 ${cardBg} border ${borderColor} shadow-md`}
            >
              <ActiveChannelTable theme={theme} onRowClick={(user) => setSelectedUser(user)} />
            </motion.div>
          )}

          {activeTab === "request" && (
            <motion.div
              key="request"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`rounded-xl p-6 ${cardBg} border ${borderColor} shadow-md`}
            >
              {loading ? (
                <p className="text-center py-6 text-gray-400">Loading...</p>
              ) : (
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
                  <table className="min-w-[1000px] w-full text-sm table-auto border-collapse">
                    <thead className="text-gray-500">
                      <tr>
                        {[
                          "YouTube Channel Name",
                          "Account ID",
                          "Subscribers",
                          "Submitted On",
                          "Total Views (28d)",
                          "AdSense Enabled?",
                          "Copyright Strikes?",
                          "100% Original",
                          "Another MCN?",
                          "Last Month Revenue",
                          "Monetization Eligibility",
                          "Actions",
                        ].map((th, idx) => (
                          <th key={idx} className="text-left px-4 py-3 whitespace-nowrap">
                            {th}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.map((r) => (
                        <tr key={r.id} className={`border-t ${borderColor} ${rowHover}`}>
                          <td className="px-4 py-3">{r.channelName}</td>
                          <td className="px-4 py-3">{r.accountId}</td>
                          <td className="px-4 py-3">{r.subscribers?.toLocaleString("en-IN")}</td>
                          <td className="px-4 py-3">{r.submittedAt}</td>
                          <td className="px-4 py-3 text-center">{r.totalViews28d?.toLocaleString("en-IN")}</td>
                          <td className="px-4 py-3 text-center">{r.adSenseEnabled}</td>
                          <td className="px-4 py-3 text-center">{r.copyrightStrikes}</td>
                          <td className="px-4 py-3 text-center">{r.hundredPercentOriginal}</td>
                          <td className="px-4 py-3 text-center">{r.anotherMCN}</td>
                          <td className="px-4 py-3 text-center">{r.lastMonthRevenue?.toLocaleString("en-IN")}</td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs ${r.monetizationEligibility === "Eligible"
                                ? "bg-emerald-700/20 text-emerald-400"
                                : "bg-gray-300 text-gray-700"
                                }`}
                            >
                              {r.monetizationEligibility}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {r.status === "pending" ? (
                                <>
                                  <Button
                                    size="sm"
                                    className="bg-emerald-700 text-white"
                                    onClick={() => {
                                      setViewData({ ...r.raw, mode: "approve" });
                                      setIsViewOpen(true);
                                    }}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-red-700 text-white"
                                    onClick={() => {
                                      setViewData({ ...r.raw, mode: "reject" });
                                      setIsViewOpen(true);
                                    }}
                                  >
                                    Reject
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setViewData({ ...r.raw });
                                    setIsViewOpen(true);
                                  }}
                                >
                                  View
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MCNRequestViewModal
        open={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        data={viewData}
        theme={theme}
        onApprove={handleApprove}
        onReject={handleReject}
        processing={processing}
      />
    </div>
  );
}
