import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search, ChevronDown, Info } from "lucide-react";

import {
  walletStats as mockStats,
  walletTransactions as mockRows,
  statusOptions as mockStatusOptions,
  licenceOptions as mockLicenceOptions,
  monthOptions as mockMonthOptions,
  accountOptions as mockAccountOptions,
} from "./WalletTransactionsData";

export default function WalletTransactions({ theme }) {
  const isDark = theme === "dark";


  const [stats, setStats] = useState(mockStats);
  const [rows, setRows] = useState(mockRows);

  const [globalSearch, setGlobalSearch] = useState("");
  const [topSearch, setTopSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All Status");
  const [licenceFilter, setLicenceFilter] = useState("All Licences");
  const [monthFilter, setMonthFilter] = useState("All Months");
  const [accountFilter, setAccountFilter] = useState("All Accounts");

  const [activeTab, setActiveTab] = useState("history");


  const [showBulk, setShowBulk] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const onClick = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) setShowBulk(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);



  const formatINR = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
  const formatINRShort = (n) => {
    if (n >= 1_000_000) return `₹${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `₹${(n / 1_000).toFixed(1)}K`;
    return formatINR(n);
  };

  const ChangePill = ({ value }) => {
    const up = value >= 0;
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${up
            ? isDark
              ? "bg-green-900/30 text-green-400"
              : "bg-green-100 text-green-700"
            : isDark
              ? "bg-red-900/30 text-red-400"
              : "bg-red-100 text-red-700"
          }`}
      >
        {up ? "↑" : "↓"} {Math.abs(value)}%
      </span>
    );
  };

  const TypeDot = ({ type }) => (
    <span className="inline-flex items-center gap-2">
      <span
        className={`inline-block h-2 w-2 rounded-full ${type === "credit" ? "bg-green-500" : "bg-red-500"
          }`}
      />
      <span className="capitalize">{type}</span>
    </span>
  );

  const StatusBadge = ({ status }) => {
    const cls =
      status === "Completed"
        ? "bg-purple-600 text-white"
        : status === "Pending"
          ? isDark
            ? "bg-gray-700 text-gray-200"
            : "bg-gray-200 text-gray-800"
          : "bg-gray-600 text-white";
    return <span className={`text-xs px-2 py-1 rounded-full ${cls}`}>{status}</span>;
  };

  // ---- Filtering ----
  const filteredRows = useMemo(() => {
    const q = (globalSearch + " " + topSearch).trim().toLowerCase();
    return rows.filter((r) => {
      const textHit =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.user.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q);
      const statusHit = statusFilter === "All Status" || r.status === statusFilter;
      const licenceHit = licenceFilter === "All Licences" || r.licence === licenceFilter;
      const monthHit = monthFilter === "All Months" || r.month === monthFilter;
      const accountHit = accountFilter === "All Accounts" || r.account === accountFilter;
      return textHit && statusHit && licenceHit && monthHit && accountHit;
    });
  }, [rows, globalSearch, topSearch, statusFilter, licenceFilter, monthFilter, accountFilter]);


  const handleBulkDelete = () => setShowBulk(false);
  const handleBulkEdit = () => setShowBulk(false);

  return (
    <div
      className={`p-4 md:p-6 space-y-6 transition-colors duration-300 ${isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-[#151F28]"
        }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <div>
          <h1 className="text-xl font-semibold">Wallet & Transactions</h1>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage user wallets, transaction history, and payment processing
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className={`relative w-64 ${isDark ? "bg-[#151F28]" : "bg-white"} rounded-md`}>
            <Search className="absolute left-2 top-2.5 h-4 w-4 opacity-70" />
            <input
              value={topSearch}
              onChange={(e) => setTopSearch(e.target.value)}
              placeholder="Search transactions..."
              className={`pl-8 pr-3 py-2 w-full text-sm rounded-md outline-none ${isDark
                  ? "bg-[#151F28] border border-gray-700 text-gray-200"
                  : "bg-white border border-gray-300"
                }`}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-2 text-sm rounded-md ${isDark
                ? "bg-[#151F28] border border-gray-700 text-gray-200"
                : "bg-white border border-gray-300"
              }`}
          >
            {mockStatusOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>

          <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Search + Filters row */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 opacity-70" />
          <Input
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search by artist, track, or account ID..."
            className={`pl-9 ${isDark ? "bg-[#151F28] border-gray-700 text-gray-200" : "bg-white"
              }`}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={licenceFilter}
            onChange={(e) => setLicenceFilter(e.target.value)}
            className={`px-3 py-2 text-sm rounded-md ${isDark
                ? "bg-[#151F28] border border-gray-700 text-gray-200"
                : "bg-white border border-gray-300"
              }`}
          >
            {mockLicenceOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>

          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className={`px-3 py-2 text-sm rounded-md ${isDark
                ? "bg-[#151F28] border border-gray-700 text-gray-200"
                : "bg-white border border-gray-300"
              }`}
          >
            {mockMonthOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>

          <select
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value)}
            className={`px-3 py-2 text-sm rounded-md ${isDark
                ? "bg-[#151F28] border border-gray-700 text-gray-200"
                : "bg-white border border-gray-300"
              }`}
          >
            {mockAccountOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>

          {/* Bulk Action dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              className="px-5 text-red-500"
              onClick={() => setShowBulk((s) => !s)}
            >
              Bulk Action
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            {showBulk && (
              <div
                className={`absolute top-11 right-0 w-36 rounded-md shadow-md border z-20 ${isDark
                    ? "bg-[#151F28] text-gray-200 border-gray-700"
                    : "bg-white text-gray-800 border-gray-200"
                  }`}
              >
                <button
                  onClick={handleBulkDelete}
                  className={`w-full text-left px-3 py-2 text-sm hover:${isDark ? "bg-gray-700" : "bg-gray-100"
                    }`}
                >
                  Bulk Delete
                </button>
                <button
                  onClick={handleBulkEdit}
                  className={`w-full text-left px-3 py-2 text-sm hover:${isDark ? "bg-gray-700" : "bg-gray-100"
                    }`}
                >
                  Bulk Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Balance", value: formatINRShort(stats.totalBalance), change: stats.changes.totalBalance },
          { label: "Total Credits", value: formatINRShort(stats.totalCredits), change: stats.changes.totalCredits },
          { label: "Total Debits", value: formatINRShort(stats.totalDebits), change: stats.changes.totalDebits },
          { label: "Pending Transactions", value: formatINRShort(stats.pendingTransactions), change: stats.changes.pendingTransactions },
        ].map((c) => (
          <div
            key={c.label}
            className={`rounded-lg p-4 shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"}`}
          >
            <div className="flex items-center justify-between">
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{c.label}</p>
              <Info className="h-4 w-4 opacity-50" />
            </div>
            <p className="text-2xl font-semibold mt-1">{c.value}</p>
            <div className="mt-2">
              <ChangePill value={c.change} />
            </div>
          </div>
        ))}
      </div>




<div className="w-full flex justify-center">
  <div
    className={`inline-flex rounded-full overflow-hidden border ${
      isDark ? "border-gray-700" : "border-gray-300"
    } w-[500px]`} 
  >
    <button
      onClick={() => setActiveTab("history")}
      className={`flex-1 py-2 text-sm font-medium text-center transition-colors duration-200 ${
        activeTab === "history"
          ? isDark
            ? "bg-[#151F28] text-white"   
            : "bg-gray-100 text-black"
          : isDark
            ? "bg-gray-800 text-gray-300" 
            : "bg-gray-200 text-gray-600"
      }`}
    >
      Transaction History
    </button>
    <button
      onClick={() => setActiveTab("request")}
      className={`flex-1 py-2 text-sm font-medium text-center transition-colors duration-200 ${
        activeTab === "request"
          ? isDark
            ? "bg-[#151F28] text-white"  
            : "bg-gray-100 text-black"
          : isDark
            ? "bg-gray-800 text-gray-300" 
            : "bg-gray-200 text-gray-600"
      }`}
    >
      Request
    </button>
  </div>
</div>







      {/* Table / Request placeholder */}
      <div className={`rounded-lg overflow-x-auto shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"}`}>
        {activeTab === "history" ? (
          <table className="w-full text-sm min-w-[900px]">
            <thead className={`${isDark ? "text-gray-400" : "text-gray-600"} text-left`}>
              <tr>
                {["Transaction ID", "User", "Type", "Amount", "Description", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((r) => (
                <tr key={r.id} className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                  <td className="px-5 py-3">{r.id}</td>
                  <td className="px-5 py-3">{r.user}</td>
                  <td className="px-5 py-3"><TypeDot type={r.type} /></td>
                  <td className="px-5 py-3">{formatINR(r.amount)}</td>
                  <td className="px-5 py-3">{r.description}</td>
                  <td className="px-5 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-5 py-3">{r.date}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant={isDark ? "outline" : "secondary"} className="rounded-full px-3">View</Button>
                      <Button size="sm" variant={isDark ? "outline" : "secondary"} className="rounded-full px-3">Edit</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-sm">
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              Request tab placeholder — connect to payout/withdraw requests API here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
