import React, { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";

export default function RoyaltyManagementTable({
  theme = "dark",
  data = [],
  onBack = () => {},
  onImportClick = () => {},
  updateData = () => {},
}) {
  const isDark = theme === "dark";

  // UI state
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("All Users");
  const [monthFilter, setMonthFilter] = useState("All Months");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [accountFilter, setAccountFilter] = useState("All Accounts");
  const dropdownRef = useRef();

  // Normalizer (same approach as your working Analytics main page)
  function normalizeRow(raw = {}, defaultMonth = "") {
    const pick = (...names) => {
      for (const n of names) {
        if (raw[n] != null && String(raw[n]).trim() !== "") return String(raw[n]).trim();
      }
      return "";
    };
    const parseIntSafe = (v) => {
      if (v == null || v === "") return 0;
      const s = String(v).replace(/[\,\s₹$]/g, "");
      const n = parseInt(s, 10);
      return Number.isFinite(n) ? n : 0;
    };
    const parseFloatSafe = (v) => {
      if (v == null || v === "") return 0;
      const s = String(v).replace(/[\,\s₹$]/g, "");
      const n = parseFloat(s);
      return Number.isFinite(n) ? n : 0;
    };

    return {
      licence: pick("Licence", "Licence Type", "license", "licence"),
      licensor: pick("Licensor", "Licensor Name", "licensor"),
      musicService: pick("Music Service", "Service", "musicService"),
      month: pick("Month", "month") || defaultMonth || "",
      accountId: pick("Account ID", "accountId", "Account"),
      label: pick("Label", "label"),
      artist: pick("Artist", "artist"),
      trackTitle: pick("Track Title", "Track", "Title", "trackTitle"),
      album: pick("Album", "album"),
      upc: pick("UPC", "upc"),
      isrc: pick("ISRC", "isrc"),
      totalUnits: parseIntSafe(raw["Total Units"] ?? raw["Units"] ?? raw.units ?? raw.totalUnits),
      sr: parseFloatSafe(raw["SR (₹)"] ?? raw["SR"] ?? raw.sr ?? raw.rate),
      country: pick("Country", "country"),
      usageType: pick("Usage Type", "usageType", "usage"),
      status: pick("Status", "status") || "Active",
      id:
        (pick("Account ID", "accountId", "Account") ||
          pick("Track", "Track Title", "Title", "trackTitle") ||
          Math.random().toString(36).slice(2, 8)) +
        "-" +
        Math.random().toString(36).slice(2, 6),
    };
  }

  // Accept `data` prop — if already normalized (has `licence` or `trackTitle`) keep it,
  // otherwise normalize each row. Also support reading from sessionStorage fallback keys.
  const analyticsData = useMemo(() => {
    let src = Array.isArray(data) ? data : [];

    // fallback to session storage (support both keys used previously)
    if ((!src || src.length === 0) && typeof window !== "undefined") {
      const s1 = sessionStorage.getItem("royaltyCsvData");
      const s2 = sessionStorage.getItem("analyticsCsvData");
      if (s1) src = JSON.parse(s1);
      else if (s2) src = JSON.parse(s2);
    }

    // If rows already contain normalized keys — detect by existence of 'licence' or 'trackTitle'
    if (src.length > 0 && (src[0].licence || src[0].trackTitle || src[0].artist)) {
      return src;
    }

    // else normalize rows
    return src.map((r) => normalizeRow(r));
  }, [data]);

  // Stats
  const totalRecords = analyticsData.length;
  const totalUnits = analyticsData.reduce((sum, r) => sum + (Number(r.totalUnits) || 0), 0);
  const totalRevenue = analyticsData.reduce((sum, r) => sum + (Number(r.sr) || 0), 0);
  const activeRecords = analyticsData.filter((r) => (r.status || "Active").toLowerCase() === "active").length;

  // Unique dropdown options
  const uniqueUsers = useMemo(() => ["All Users", ...new Set(analyticsData.map((i) => i.accountId || ""))], [analyticsData]);
  const uniqueMonths = useMemo(() => ["All Months", ...new Set(analyticsData.map((i) => i.month || ""))], [analyticsData]);
  const uniqueTypes = useMemo(() => ["All Types", ...new Set(analyticsData.map((i) => i.usageType || ""))], [analyticsData]);
  const uniqueAccounts = useMemo(() => ["All Accounts", ...new Set(analyticsData.map((i) => i.accountId || ""))], [analyticsData]);

  // Filtering logic (search + dropdowns)
  const filteredData = useMemo(() => {
    return analyticsData.filter((item) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        (item.trackTitle && item.trackTitle.toLowerCase().includes(q)) ||
        (item.artist && item.artist.toLowerCase().includes(q)) ||
        (item.label && item.label.toLowerCase().includes(q)) ||
        (item.album && item.album.toLowerCase().includes(q)) ||
        (item.licensor && item.licensor.toLowerCase().includes(q)) ||
        (item.licence && item.licence.toLowerCase().includes(q)) ||
        (item.accountId && item.accountId.toLowerCase().includes(q));

      const matchesUser = userFilter === "All Users" || (item.user === userFilter);
      const matchesMonth = monthFilter === "All Months" || (item.month === monthFilter);
      const matchesType = typeFilter === "All Types" || (item.usageType === typeFilter);
      const matchesAccount = accountFilter === "All Accounts" || (item.accountId === accountFilter);

      return matchesSearch && matchesUser && matchesMonth && matchesType && matchesAccount;
    });
  }, [analyticsData, search, userFilter, monthFilter, typeFilter, accountFilter]);

  const handleExport = () => {
    // Export filteredData as CSV
    const headers = [
      "Licence","Licensor","Music Service","Month","Account ID","Label",
      "Artist","Track Title","Album","UPC","ISRC","Total Units","SR (₹)",
      "Country","Usage Type","Status"
    ];
    const rows = filteredData.map((r) => headers.map(h => {
      // map header label to normalized object keys
      switch (h) {
        case "Licence": return r.licence ?? "";
        case "Licensor": return r.licensor ?? "";
        case "Music Service": return r.musicService ?? "";
        case "Month": return r.month ?? "";
        case "Account ID": return r.accountId ?? "";
        case "Label": return r.label ?? "";
        case "Artist": return r.artist ?? "";
        case "Track Title": return r.trackTitle ?? "";
        case "Album": return r.album ?? "";
        case "UPC": return r.upc ?? "";
        case "ISRC": return r.isrc ?? "";
        case "Total Units": return r.totalUnits ?? 0;
        case "SR (₹)": return r.sr ?? 0;
        case "Country": return r.country ?? "";
        case "Usage Type": return r.usageType ?? "";
        case "Status": return r.status ?? "";
        default: return "";
      }
    }));
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "royalty-uploaded.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = (id) => {
    const newData = analyticsData.filter((r) => r.id !== id);
    // update parent if provided
    try {
      updateData(newData);
    } catch (err) {
      // fallback: update sessionStorage only
      sessionStorage.setItem("royaltyCsvData", JSON.stringify(newData));
    }
  };

  // click outside handler (placeholder for future dropdowns)
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        // any dropdown close logic
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      className={`p-4 md:p-6 space-y-6 min-h-[80vh] rounded-2xl shadow-lg transition-colors duration-300 ${isDark ? "bg-[#111A22] text-gray-200" : "bg-white text-[#151F28]"}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${isDark ? "border border-gray-700 text-gray-200" : "bg-gray-100 text-gray-800"}`}
        >
          ← Back
        </button>
        <div>
          <h1 className="text-xl font-semibold">Royalty Management</h1>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>View and manage imported royalty rows</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Records", value: totalRecords },
          { label: "Total Units", value: totalUnits },
          { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, color: "text-green-500" },
          { label: "Active Records", value: activeRecords },
        ].map((stat, i) => (
          <div key={i} className={`rounded-lg p-4 shadow-md ${isDark ? "bg-[#151F28]" : "bg-gray-50"}`}>
            <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
            <p className={`text-xl font-semibold ${stat.color || ""}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters + Search + Export */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="flex items-center gap-3 w-full md:w-[40%]">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by artist, track, label, account ID..."
            className={`h-9 text-sm w-full ${isDark ? "bg-[#151F28] border-gray-700 text-gray-200" : "bg-white"}`}
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-end w-full md:w-[60%]">
          <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)} className={`rounded-md px-3 py-1 text-sm ${isDark ? "bg-[#151F28] border-gray-700" : "bg-white border border-gray-300"}`}>
            {uniqueUsers.map((u, idx) => (<option key={idx}>{u}</option>))}
          </select>

          <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} className={`rounded-md px-3 py-1 text-sm ${isDark ? "bg-[#151F28] border-gray-700" : "bg-white border border-gray-300"}`}>
            {uniqueMonths.map((m, idx) => (<option key={idx}>{m}</option>))}
          </select>

          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={`rounded-md px-3 py-1 text-sm ${isDark ? "bg-[#151F28] border-gray-700" : "bg-white border border-gray-300"}`}>
            {uniqueTypes.map((t, idx) => (<option key={idx}>{t}</option>))}
          </select>

          <select value={accountFilter} onChange={(e) => setAccountFilter(e.target.value)} className={`rounded-md px-3 py-1 text-sm ${isDark ? "bg-[#151F28] border-gray-700" : "bg-white border border-gray-300"}`}>
            {uniqueAccounts.map((a, idx) => (<option key={idx}>{a}</option>))}
          </select>

          <Button onClick={handleExport} variant="outline" className="h-9 px-4 flex items-center gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>

          <Button onClick={onImportClick} className="h-9 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full">
            Import Another
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-lg shadow-md p-4 ${isDark ? "bg-[#151F28]" : "bg-gray-50"}`}>
        <h2 className="text-lg font-semibold mb-1">Pending Royalty Payments</h2>
        <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Royalties awaiting approval and processing</p>

        <div className="overflow-x-auto custom-scroll">
          <table className="w-full text-sm min-w-[1400px]">
            <thead className={`${isDark ? "text-gray-400" : "text-gray-600"} text-left`}>
              <tr>
                {[
                  "Licence",
                  "Licensor",
                  "Music Service",
                  "Month",
                  "Account ID",
                  "Label",
                  "Artist",
                  "Track Title",
                  "Album",
                  "UPC",
                  "ISRC",
                  "Total Units",
                  "SR (₹)",
                  "Country",
                  "Usage Type",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={17} className="text-center py-12 text-gray-500">
                    No data available. Import a CSV/Excel to populate this table.
                  </td>
                </tr>
              ) : (
                filteredData.map((r) => (
                  <tr key={r.id} className={`border-t hover:bg-gray-800/30 transition ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                    <td className="px-4 py-3">{r.licence}</td>
                    <td className="px-4 py-3">{r.licensor}</td>
                    <td className="px-4 py-3">{r.musicService}</td>
                    <td className="px-4 py-3">{r.month}</td>
                    <td className="px-4 py-3">{r.accountId}</td>
                    <td className="px-4 py-3">{r.label}</td>
                    <td className="px-4 py-3">{r.artist}</td>
                    <td className="px-4 py-3">{r.trackTitle}</td>
                    <td className="px-4 py-3">{r.album}</td>
                    <td className="px-4 py-3">{r.upc}</td>
                    <td className="px-4 py-3">{r.isrc}</td>
                    <td className="px-4 py-3">{Number(r.totalUnits || 0).toLocaleString()}</td>
                    <td className="px-4 py-3">{Number(r.sr || 0).toLocaleString()}</td>
                    <td className="px-4 py-3">{r.country}</td>
                    <td className="px-4 py-3">{r.usageType}</td>
                    <td className="px-4 py-3">
                      <span className="px-3 py-1 rounded-full text-xs bg-green-900/30">{r.status || "Active"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-blue-500 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
