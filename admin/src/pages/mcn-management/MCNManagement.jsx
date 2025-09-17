// components/MCNManagement.jsx
import React, { useMemo, useState } from "react";
import { Upload, Download, Search, Info, Edit, Check, X } from "lucide-react";
import ActiveChannelTable from "./MCNActiveChannel";
import { stats, initialRows, mockActiveChannels } from "./MCNManagementData";
import { motion, AnimatePresence } from "framer-motion";
import MCNInfoForm from "./MCNUserForm";

export default function MCNManagement({ theme = "dark" }) {
  const isDark = theme === "dark";
  const [rows, setRows] = useState(initialRows);
  const [search, setSearch] = useState("");
  const [licenceFilter, setLicenceFilter] = useState("All Licences");
  const [monthFilter, setMonthFilter] = useState("All Months");
  const [accountFilter, setAccountFilter] = useState("All Accounts");
  const [activeTab, setActiveTab] = useState("request");
  const [selectedUser, setSelectedUser] = useState(null); // when set → full form page shown

  const handleApprove = (row) => {
    console.log("Approved:", row);
  };

  const handleReject = (row) => {
    console.log("Rejected:", row);
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

  const bgMain = isDark
    ? "bg-gray-900 text-slate-300"
    : "bg-gray-50 text-[#151F28]";
  const cardBg = isDark ? "bg-[#151F28]" : "bg-white";
  const borderColor = isDark ? "border-[#12212a]" : "border-gray-300";
  const textColor = isDark ? "text-gray-300" : "text-[#151F28]";
  const textMuted = isDark ? "text-gray-400" : "text-gray-600";
  const inputBg = isDark
    ? "bg-gray-900 border-[#12212a] text-slate-300"
    : "bg-white border-gray-300 text-gray-900";
  const tabActive = isDark
    ? "bg-gray-800 text-white"
    : "bg-gray-100 text-black";
  const tabInactive = isDark
    ? "bg-[#151F28] text-gray-300"
    : "bg-gray-200 text-gray-600";
  const rowHover = isDark ? "hover:bg-gray-800" : "hover:bg-gray-100";

  // ✅ FULL-PAGE SWITCHING
  if (selectedUser) {
    return (
      <MCNInfoForm
        user={selectedUser}
        theme={theme}
        onBack={() => setSelectedUser(null)}
      />
    );
  }

  return (
    <div className={`${bgMain} min-h-screen p-4 md:p-6`}>
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold ">MCN Management</h1>
            <p className={`text-sm ${textMuted}`}>
              Manage and analyze music distribution analytics data
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("Import CSV/Excel (mock)")}
              className={`px-3 py-2 rounded-md border ${borderColor} ${isDark ? "bg-transparent" : "bg-white"} text-sm inline-flex items-center gap-2`}
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

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: "Total Records", value: stats.totalRecords },
          { label: "Total Units", value: stats.totalUnits.toLocaleString("en-IN") },
          { label: "Total Revenue", value: formatINR(stats.totalRevenue), highlight: true },
          { label: "Active Records", value: stats.activeRecords }].map((item, idx) => (
            <div key={idx} className={`rounded-lg p-4 ${cardBg} border ${borderColor} shadow-sm`}>
              <div className="flex items-center justify-between">
                <p className={`text-sm ${textMuted}`}>{item.label}</p>
                {item.label === "Total Revenue" && (<Info className="w-4 h-4 opacity-60" />)}
              </div>
              <p className={`text-2xl font-semibold mt-2 ${item.highlight ? "text-emerald-400" : textColor}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className={`rounded-md p-4 ${cardBg} border ${borderColor}`}>
          <div className="flex flex-col md:flex-row md:items-center md:gap-3 gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 opacity-60" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by artist, track, or account ID..."
                className={`pl-10 pr-3 py-2 w-full rounded-md text-sm border ${inputBg}`}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[["All Licences", setLicenceFilter], ["All Months", setMonthFilter], ["All Accounts", setAccountFilter]].map(([placeholder, setter], idx) => (
                <select key={idx} onChange={(e) => setter(e.target.value)} className={`px-3 py-2 text-sm rounded-md border ${inputBg}`}>
                  <option>{placeholder}</option>
                </select>
              ))}
              <button
                onClick={() => alert("Bulk Action (mock)")}
                className="px-3 py-2 rounded-md border border-red-600 text-red-400 bg-transparent text-sm"
              >
                Bulk Action
              </button>
            </div>
          </div>
        </div>

        {/* Tab pill */}
        <div className="w-full flex justify-center">
          <div className={`inline-flex rounded-full overflow-hidden border ${borderColor} w-[500px]`}>
            <button onClick={() => setActiveTab("request")} className={`flex-1 py-2 text-sm font-medium ${activeTab === "request" ? tabActive : tabInactive}`}>Request</button>
            <button onClick={() => setActiveTab("active")} className={`flex-1 py-2 text-sm font-medium ${activeTab === "active" ? tabActive : tabInactive}`}>Active Channel</button>
          </div>
        </div>

        {/* Conditional Tab Rendering */}
        <AnimatePresence mode="wait">
          {activeTab === "active" && (
            selectedUser ? (
              // Show MCNInfoForm instead of table when a user is selected
              <motion.div
                key="user-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`rounded-xl p-6 ${cardBg} border ${borderColor} shadow-md`}
              >

            

              </motion.div>
            ) : (
              // Show table if no user is selected
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`rounded-xl p-6 ${cardBg} border ${borderColor} shadow-md`}
              >
                <ActiveChannelTable
                  theme={theme}
                  onRowClick={(user) => setSelectedUser(user)}
                  data={mockActiveChannels}
                />



              </motion.div>
            )
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

              <div className="mb-6">
                <h3 className={`text-lg font-semibold ${textColor}`}>MCN Management</h3>
                <p className={`text-sm ${textMuted}`}>Royalties awaiting approval and processing</p>
              </div>

              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
                <table className="min-w-[1000px] w-full text-sm table-auto border-collapse">
                  <thead className={`text-gray-500`}>
                    <tr>
                      {["YouTube Channel Name", "Subscribers Count", "Month", "Total Views in past 28 days", "Is AdSense Enabled?", "Copyright Strikes?", "100% Original", "Another MCN?", "Last Month Revenue", "Monetization Eligibility", "Actions"].map((th, idx) => (
                        <th key={idx} className="text-left px-4 py-3 whitespace-nowrap">{th}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((r) => (
                      <tr key={r.id} className={`border-t ${borderColor} ${rowHover}`}>
                        <td className="px-4 py-3 whitespace-nowrap">{r.channelName}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{r.subscribers.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{r.month}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{r.totalViews28d.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{r.adSenseEnabled}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{r.copyrightStrikes}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{r.hundredPercentOriginal}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{r.anotherMCN}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{r.lastMonthRevenue.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-3 whitespace-nowrap"><span className="inline-block px-3 py-1 rounded-full text-xs bg-emerald-700/20 text-emerald-800">{r.monetizationEligibility}</span></td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(r)}
                              className={`p-2 rounded-md border ${borderColor} bg-transparent`}
                            >
                              <Edit className={`w-4 h-4 ${textColor}`} />
                            </button>
                            <button
                              onClick={() => handleApprove(r)}
                              className="px-3 py-1 rounded-md bg-emerald-500 text-white inline-flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" /> Approve
                            </button>
                            <button
                              onClick={() => handleReject(r)}
                              className="px-3 py-1 rounded-md bg-red-500 text-white inline-flex items-center gap-2"
                            >
                              <X className="w-4 h-4" /> Reject
                            </button>

                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
