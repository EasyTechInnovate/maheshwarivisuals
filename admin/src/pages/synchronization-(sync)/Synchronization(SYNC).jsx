import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Download,
  Eye,
  Check,
  X,
  Music2,
  Clock3,
  CheckCircle2,
  DollarSign,
  ChevronDown,
} from "lucide-react";

import { mockSyncStats, mockSyncRequests } from "./SynchronizationData";

const iconMap = {
  total: Music2,
  pending: Clock3,
  approved: CheckCircle2,
  licenseValue: DollarSign,
};

export default function SyncManagement({ theme }) {
  const isDark = theme === "dark";
  const [requests, setRequests] = useState(mockSyncRequests);
  const [searchQuery, setSearchQuery] = useState(""); 
  const dropdownRef = useRef(null);
  const [showBulk, setShowBulk] = useState(false);

  const handleBulkDelete = () => setShowBulk(false);
  const handleBulkEdit = () => setShowBulk(false);

  const onApprove = (id) =>
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
    );

  const onReject = (id) =>
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
    );

 
  const filteredRequests = requests.filter((row) => {
    const q = searchQuery.toLowerCase();
    return (
      row.trackName.toLowerCase().includes(q) ||
      row.artistName.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className={`p-6 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-[#151F28]"
      }`}
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Synchronization (SYNC)</h1>
        <p
          className={`text-sm ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Manage sync license requests for film, TV, commercials, and digital content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {mockSyncStats.map((s) => {
          const Icon = iconMap[s.key];
          return (
            <Card
              key={s.key}
              className={`relative ${
                isDark
                  ? "bg-[#151F28] border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <CardContent className="p-4">
                <div
                  className={`absolute top-3 right-3 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <Icon size={18} />
                </div>

                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {s.label}
                </p>
                <p
                  className={`text-2xl font-bold ${
                    s.key === "pending"
                      ? "text-yellow-400"
                      : s.key === "approved"
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {s.value}
                </p>
                {s.key === "licenseValue" && (
                  <p
                    className={`text-xs ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Approved licenses
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-6">
        <div className="relative flex-1">
          <Search
            className={`absolute left-3 top-2.5 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // 🔍 update state
            placeholder="Search by track name or artist..."
            className={`w-full text-sm pl-10 pr-4 py-2 rounded-lg border ${
              isDark
                ? "bg-[#151F28] text-gray-200 border-gray-700"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          />
        </div>
        <div className="flex gap-2">
          {["All Status", "All Genres", "All Types"].map((label) => (
            <select
              key={label}
              className={`text-sm rounded-lg px-3 py-2 border ${
                isDark
                  ? "bg-[#151F28] text-gray-200 border-gray-700"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              <option>{label}</option>
            </select>
          ))}

          <Button
            variant={isDark ? "outline" : "secondary"}
            size="sm"
            className="flex items-center gap-2 px-4"
          >
            <Download className="w-4 h-4" /> Export
          </Button>

          {/* Bulk Actions */}
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
                className={`absolute top-11 right-0 w-36 rounded-md shadow-md border z-20 ${
                  isDark
                    ? "bg-[#151F28] text-gray-200 border-gray-700"
                    : "bg-white text-gray-800 border-gray-200"
                }`}
              >
                <button
                  onClick={handleBulkDelete}
                  className={`w-full text-left px-3 py-2 text-sm ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  Bulk Delete
                </button>
                <button
                  onClick={handleBulkEdit}
                  className={`w-full text-left px-3 py-2 text-sm ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  Bulk Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className={`mt-6 overflow-x-auto rounded-lg shadow-md ${
          isDark ? "bg-[#151F28]" : "bg-white"
        }`}
      >
        <table className="w-full border-collapse text-sm min-w-[1100px]">
          <thead
            className={`text-left ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <tr>
              {[
                "Track Name",
                "Artist Name",
                "Label Name",
                "ISRC of Track",
                "Genre",
                "Mood",
                "Theme",
                "Language",
                "Tempo/BPM",
                "Master Rights",
                "PRO Affiliation",
                "Project Suitability",
                "Submit Date",
                "Actions",
              ].map((header) => (
                <th key={header} className="px-4 py-3 font-medium whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((row) => (
              <tr
                key={row.id}
                className={`border-t ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } ${isDark ? "hover:bg-gray-800/40" : "hover:bg-gray-100/60"}`}
              >
                <td className="px-4 py-3 font-medium">{row.trackName}</td>
                <td className="px-4 py-3">{row.artistName}</td>
                <td className="px-4 py-3">{row.labelName}</td>
                <td className="px-4 py-3">{row.isrc}</td>
                <td className="px-4 py-3">{row.genre}</td>
                <td className="px-4 py-3">{row.mood}</td>
                <td className="px-4 py-3">{row.theme}</td>
                <td className="px-4 py-3">{row.language}</td>
                <td className="px-4 py-3">{row.tempo}</td>
                <td className="px-4 py-3">{row.masterRights}</td>
                <td className="px-4 py-3">{row.proAffiliation}</td>
                <td className="px-4 py-3">{row.projectSuitability}</td>
                <td className="px-4 py-3">{row.submitDate}</td>
                <td className="px-4 py-3 flex gap-2">
                  <Button
                    size="sm"
                    className={`min-w-[90px] ${
                      isDark ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
                    }`}
                  >
                    <Eye className="w-4 h-4 mr-1" /> Review
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 text-white min-w-[90px]"
                    onClick={() => onApprove(row.id)}
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-600 text-white min-w-[90px]"
                    onClick={() => onReject(row.id)}
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td
                  colSpan={14}
                  className={`text-center py-6 ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  No sync requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
