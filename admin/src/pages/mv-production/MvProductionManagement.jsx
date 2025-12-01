"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Music, MoreHorizontal, Upload } from "lucide-react";
import { toast } from "sonner";
import GlobalApi from "@/lib/GlobalApi"; // your API wrapper
import MVProductionUserPage from "@/components/mv-production/MVProductionUserPage"; // <-- create this modal like ReleaseModal

export default function MVProductionManagement({ theme = "dark" }) {
  const isDark = theme === "dark";

  // visual classes
  const containerBg = isDark ? "bg-[#111A22] text-gray-200" : "bg-gray-50 text-[#151F28]";
  const cardBg = isDark ? "bg-[#151F28]" : "bg-white";
  const inputCls = isDark ? "bg-[#151F28] border border-gray-700 text-gray-200" : "bg-white border border-gray-300 text-black";
  const tableBorder = isDark ? "border-gray-700" : "border-gray-200";

  // data + UI state
  const [search, setSearch] = useState("");
  const [productions, setProductions] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);

  // view state (list or modal like ReleaseManagement)
  const [activePage, setActivePage] = useState("list");
  const [selectedProduction, setSelectedProduction] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // fetch list
  const fetchProductions = async (pageNo = 1) => {
    try {
      setLoading(true);
      const res = await GlobalApi.getAllMVProductions(pageNo, pagination.itemsPerPage || 10);
      const data = res?.data?.data || {};
      setProductions(data.productions || []);
      if (data.pagination) setPagination(data.pagination);
      else
        setPagination((prev) => ({
          ...prev,
          currentPage: pageNo,
          totalPages: Math.ceil((data?.totalCount || data.productions?.length || productions.length) / (prev.itemsPerPage || 10)),
        }));
    } catch (err) {
      console.error("API ERROR →", err);
      toast.error(err?.response?.data?.message || "Failed to load productions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductions(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // client-side filtering (search + status)
  const filteredProductions = useMemo(() => {
    const q = search.trim().toLowerCase();
    return productions.filter((p) => {
      if (statusFilter !== "all" && (p.status || "").toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
      if (!q) return true;
      const accountId = (p.accountId || "").toLowerCase();
      const projectTitle = (p.projectOverview?.projectTitle || "").toLowerCase();
      const first = (p.userId?.firstName || "").toLowerCase();
      const last = (p.userId?.lastName || "").toLowerCase();
      const accountName = `${first} ${last}`.trim();
      const email = (p.userId?.emailAddress || "").toLowerCase();

      return (
        accountId.includes(q) ||
        projectTitle.includes(q) ||
        accountName.includes(q) ||
        email.includes(q)
      );
    });
  }, [productions, search, statusFilter]);

  // stats (client-side)
  const stats = [
    { label: "Total Productions", value: pagination?.totalCount ?? productions.length },
    { label: "Pending", value: productions.filter((p) => p.status === "pending").length },
    { label: "Accepted", value: productions.filter((p) => p.status === "accept").length },
    { label: "Rejected", value: productions.filter((p) => p.status === "reject").length },
  ];

  // handlers
  const handleViewDetails = (prod) => {
    setSelectedProduction(prod);
    setActivePage("modal");
  };

  const handleBack = () => {
    setActivePage("list");
    setSelectedProduction(null);
  };

  // If modal view, render modal component (pattern same as ReleaseManagement)
  if (activePage === "modal") {
    return (
      <MVProductionUserPage
        theme={theme}
        defaultData={selectedProduction} // you can pass the whole object or just _id
        onBack={handleBack}
      />
    );
  }

  // list view
  return (
    <div className={`p-4 md:p-6 space-y-6 transition-colors duration-300 ${containerBg}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <div>
          <h1 className="text-2xl font-semibold">MV Production Management</h1>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage music & video production proposals
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant={isDark ? "outline" : "secondary"} className="flex items-center gap-2 rounded-full px-5">
            <Upload className="h-4 w-4" /> Import CSV/Excel
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5">
            + Add New Production
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`rounded-lg p-4 shadow-md ${cardBg}`}>
            <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{s.label}</p>
            <p className="text-2xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
        <Input
          placeholder="Search by account id, account name, project title, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full md:w-1/3 ${isDark ? "bg-[#151F28] border-gray-700 text-gray-200" : "bg-white"}`}
        />

        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`rounded-md px-3 py-2 text-sm ${isDark ? "bg-[#151F28] border border-gray-700 text-gray-200" : "bg-white border border-gray-300"}`}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accept">Accepted</option>
            <option value="reject">Rejected</option>
          </select>

          <Button variant={isDark ? "outline" : "secondary"} className="flex items-center gap-2 px-5">
            <Upload className="h-4 w-4" /> Bulk Action
          </Button>
        </div>
      </div>

      {/* Table */}
      {/* Table */}
<div className={`rounded-lg shadow-md w-full overflow-x-auto ${cardBg}`}>
  <table className={`w-full min-w-full text-sm`}>
    <thead className={`${isDark ? "text-gray-400" : "text-gray-600"} text-left`}>
      <tr>
        {[
          "Account",
          "Project Title",
          "Budget",
          "Email",
          "Status",
          "Submitted",
          "Actions",
        ].map((h) => (
          <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">
            {h}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {loading ? (
        <tr>
          <td colSpan={7} className="text-center py-6 text-gray-400">
            Loading...
          </td>
        </tr>
      ) : filteredProductions.length === 0 ? (
        <tr>
          <td colSpan={7} className="text-center py-6 text-gray-400 italic">
            No records found
          </td>
        </tr>
      ) : (
        filteredProductions.map((p) => {
          const accountName = `${p.userId?.firstName || ""} ${p.userId?.lastName || ""}`.trim();
          const projectTitle = p.projectOverview?.projectTitle || "-";
          const budget = p.budgetRequestAndOwnershipProposal?.totalBudgetRequested ?? "-";
          const email = p.userId?.emailAddress || "-";
          const status = p.status || "pending";

          return (
            <tr
              key={p._id}
              className={`border-t ${tableBorder} ${
                isDark ? "hover:bg-gray-800/10" : "hover:bg-gray-100"
              }`}
            >
              <td className="px-4 py-3">
                <div className="font-medium">{p.accountId || "-"}</div>
                <div className="text-xs text-gray-400">{accountName || "-"}</div>
              </td>

              <td className="px-4 py-3">{projectTitle}</td>

              <td className="px-4 py-3">
                {"₹" +
                  (typeof budget === "number"
                    ? budget.toLocaleString("en-IN")
                    : budget)}
              </td>

              <td className="px-4 py-3">{email}</td>

              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    status === "accept"
                      ? "bg-green-600/20 text-green-400"
                      : status === "reject"
                      ? "bg-red-600/20 text-red-400"
                      : "bg-yellow-600/20 text-yellow-400"
                  }`}
                >
                  {status}
                </span>
              </td>

              <td className="px-4 py-3">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>

              <td className="px-4 py-3 whitespace-nowrap">
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 rounded-full px-5"
                  onClick={() => handleViewDetails(p)}
                >
                  <Music className="h-4 w-4" />
                  MV Production
                </Button>
              </td>
            </tr>
          );
        })
      )}
    </tbody>
  </table>
</div>


      {/* Pagination (right aligned) */}
      <div className="flex justify-end items-center gap-3 pt-4 pr-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </Button>

        <span className="px-3 py-2">
          Page {pagination?.currentPage ?? page} of {pagination?.totalPages ?? 1}
        </span>

        <Button
          variant="outline"
          disabled={page === (pagination?.totalPages ?? 1)}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
