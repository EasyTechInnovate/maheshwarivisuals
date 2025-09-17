import React, { useMemo, useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";

export default function BonusManagementModal({ data = [], theme = "dark", onBack, onImportClick, updateData }) {
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("All Users");
  const [monthFilter, setMonthFilter] = useState("All Months");
  const [typeFilter, setTypeFilter] = useState("All Types");

  // Data source: prefer provided data; fallback to sessionStorage (survives refresh)
  const sourceData = useMemo(() => {
    if (Array.isArray(data) && data.length) return data;
    try {
      const raw = sessionStorage.getItem("bonusCsvData");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, [data]);

  // Filtering logic
  const filtered = useMemo(() => {
    const q = (search || "").toLowerCase().trim();
    return sourceData.filter((r) => {
      // search across many columns
      const hay = [
        r.accountId,
        r.artist,
        r.trackTitle,
        r.label,
        r.month,
        r.upc,
        r.isrc,
        r.licensor,
        r.licence,
      ]
        .map((v) => String(v || "").toLowerCase())
        .join(" ");
      if (q && !hay.includes(q)) return false;
      if (userFilter !== "All Users" && String(r.accountId || "").toLowerCase() !== String(userFilter || "").toLowerCase()) return false;
      if (monthFilter !== "All Months" && String(r.month || "").toLowerCase() !== String(monthFilter || "").toLowerCase()) return false;
      if (typeFilter !== "All Types" && String(r.usageType || "").toLowerCase() !== String(typeFilter || "").toLowerCase()) return false;
      return true;
    });
  }, [sourceData, search, userFilter, monthFilter, typeFilter]);

  // Stats calculation
  const stats = useMemo(() => {
    let totalBonuses = 0;
    let paid = 0;
    let pending = 0;
    let thisMonthCount = 0;
    const nowYear = new Date().getFullYear();

    sourceData.forEach((r) => {
      const units = Number(r.totalUnits || 0);
      const sr = Number(r.sr || 0);
      totalBonuses += units * sr;
      const status = String(r.status || "").toLowerCase();
      if (status === "paid") paid++;
      if (status.includes("pend") || status.includes("await")) pending++;
      if (r.month && String(r.month).includes(String(nowYear))) thisMonthCount++;
    });

    return { totalBonuses, paid, pending, thisMonthCount };
  }, [sourceData]);

  const formatCurrency = (n) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(n);

  // Export currently filtered rows
  const handleExport = () => {
    const toExport = filtered.length ? filtered : sourceData;
    if (!toExport.length) {
      alert("No rows to export.");
      return;
    }
    const csv = Papa.unparse(
      toExport.map((r) => ({
        Licence: r.licence,
        Licensor: r.licensor,
        "Music Service": r.musicService,
        Month: r.month,
        "Account ID": r.accountId,
        Label: r.label,
        Artist: r.artist,
        "Track Title": r.trackTitle,
        Album: r.album,
        UPC: r.upc,
        ISRC: r.isrc,
        "Total Units": r.totalUnits,
        "SR (₹)": r.sr,
        Country: r.country,
        "Usage Type": r.usageType,
        Status: r.status,
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bonus-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import handler inside modal (uses dynamic import of Papa to avoid duplicate bundle code if desired)
  const handleImportInModal = (file) => {
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (ext === "csv" || ext === "txt") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (res) => {
          
          const parsed = (res.data || []).map((r) => ({
            licence: r.Licence ?? r["Licence Type"] ?? r.licence ?? "",
            licensor: r.Licensor ?? r.licensor ?? "",
            musicService: r["Music Service"] ?? r.music_service ?? r.musicService ?? "",
            month: r.Month ?? r.month ?? "",
            accountId: r["Account ID"] ?? r.accountId ?? "",
            label: r.Label ?? r.label ?? "",
            artist: r.Artist ?? r.artist ?? "",
            trackTitle: r["Track Title"] ?? r.track ?? r.Title ?? "",
            album: r.Album ?? r.album ?? "",
            upc: r.UPC ?? r.upc ?? "",
            isrc: r.ISRC ?? r.isrc ?? "",
            totalUnits: Number(r["Total Units"] ?? r.units ?? 0),
            sr: Number(r["SR (₹)"] ?? r.sr ?? 0),
            country: r.Country ?? r.country ?? "",
            usageType: r["Usage Type"] ?? r.usage ?? "",
            status: r.Status ?? r.status ?? "Active",
            id: Math.random().toString(36).slice(2, 9),
          }));
          sessionStorage.setItem("bonusCsvData", JSON.stringify(parsed));
          updateData?.(parsed);
        },
      });
    } else {
      alert("Upload CSV here (or use Excel support via parent).");
    }
  };

  return (
    <div className={`p-6 space-y-6 min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-[#151F28]"}`}>
      {/* Header */}
<div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
  <div className="flex items-center gap-3">
    {/* Back Button */}
    {onBack && (
      <button
        onClick={onBack}
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          isDark ? "border border-gray-700 text-gray-200" : "bg-gray-100 text-gray-800"
        }`}
      >
        ← Back
      </button>
    )}

    <div>
      <h1 className="text-2xl font-semibold">Bonus Management</h1>
      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Manage and track user bonuses across different categories
      </p>
    </div>
  </div>

  <div className="flex gap-3">
    {/* import re-uses parent file input (invoked by onImportClick) */}
    <button
      onClick={() => onImportClick && onImportClick()}
      className={`flex items-center gap-2 px-4 py-2 rounded-full ${
        isDark ? "border border-gray-700" : "bg-gray-100"
      }`}
    >
      <Download className="h-4 w-4" /> Import CSV/Excel
    </button>

    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-5 rounded-full">
      + Add Bonus
    </Button>
  </div>
</div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`rounded-lg p-4 shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"}`}>
          <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Total Bonuses</p>
          <p className="text-2xl font-semibold">{formatCurrency(stats.totalBonuses)}</p>
        </div>
        <div className={`rounded-lg p-4 shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"}`}>
          <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Paid Bonuses</p>
          <p className="text-2xl font-semibold">{stats.paid}</p>
          <p className="text-sm text-gray-400">₹{(stats.paid * 5000).toLocaleString()}</p>
        </div>
        <div className={`rounded-lg p-4 shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"}`}>
          <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Pending Approval</p>
          <p className="text-2xl font-semibold">{stats.pending}</p>
          <p className="text-sm text-gray-400">₹{(stats.pending * 10000).toLocaleString()}</p>
        </div>
        <div className={`rounded-lg p-4 shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"}`}>
          <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>This Month</p>
          <p className="text-2xl font-semibold">{stats.thisMonthCount}</p>
        </div>
      </div>

    {/* Search + Filters + Export */}
<div className="flex flex-col md:flex-row gap-3 justify-between items-center">
  {/* Shrunk search bar width */}
  <div className="flex items-center gap-3 w-full md:w-1/2">
    <Input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search by user name, ID, or description..."
      className={`w-full md:w-[60%] ${isDark ? "bg-[#151F28] border-gray-700 text-gray-200" : "bg-white"}`}
    />
  </div>

  {/* Filters + Export aligned right */}
  <div className="flex items-center gap-2 w-full md:w-1/2 justify-end">
    <select
      value={userFilter}
      onChange={(e) => setUserFilter(e.target.value)}
      className={`rounded-md px-3 py-2 text-sm ${isDark ? "bg-[#151F28] border border-gray-700 text-gray-200" : "bg-white border border-gray-300"}`}
    >
      <option>All Users</option>
    </select>

    <select
      value={monthFilter}
      onChange={(e) => setMonthFilter(e.target.value)}
      className={`rounded-md px-3 py-2 text-sm ${isDark ? "bg-[#151F28] border border-gray-700 text-gray-200" : "bg-white border border-gray-300"}`}
    >
      <option>All Months</option>
    </select>

    <select
      value={typeFilter}
      onChange={(e) => setTypeFilter(e.target.value)}
      className={`rounded-md px-3 py-2 text-sm ${isDark ? "bg-[#151F28] border border-gray-700 text-gray-200" : "bg-white border border-gray-300"}`}
    >
      <option>All Types</option>
    </select>

    <button
      onClick={handleExport}
      className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? "border border-gray-700" : "bg-gray-100"}`}
    >
      <Download className="h-4 w-4" /> Export
    </button>
  </div>
</div>


      {/* Table Section */}
      <div className={`rounded-lg shadow-md p-4 ${isDark ? "bg-[#151F28]" : "bg-white"}`}>
        <h2 className="text-lg font-semibold mb-1">Pending Bonus Payments</h2>
        <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Royalties awaiting approval and processing</p>

        <div className="overflow-x-auto -mx-4 px-4 table-scrollbar">
          <table className="w-full text-sm min-w-[1500px]">
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={17} className="text-center py-12 text-gray-500">No data available. Import a CSV/Excel to populate this table.</td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
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
                    <td className="px-4 py-3"><span className="px-3 py-1 rounded-full text-xs bg-green-900/30">{r.status || "Active"}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="bg-transparent border border-gray-700 px-3 py-1 rounded">...</button>
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

// small helper (local here to avoid extra export)
function formatCurrency(n) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(n);
}
