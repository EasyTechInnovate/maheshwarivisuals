import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Download } from "lucide-react";

import { mockAdvertisementRequests } from "./AdvertisementPlansData";

export default function AdvertisementRequests({ theme }) {
  const isDark = theme === "dark";
  const [requests, setRequests] = useState(mockAdvertisementRequests);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter by username or track
  const filteredRequests = requests.filter(
    (r) =>
      r.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.track.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onApprove = (id) =>
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved", paymentStatus: "approved" } : r))
    );

  return (
    <div
      className={`p-6 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-[#151F28]"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Advertisement Requests</h1>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage Advertisement Requests
          </p>
        </div>

        {/* Search + Actions */}
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search
              className={`absolute left-3 top-2.5 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search royalties..."
              className={`pl-10 pr-4 py-2 rounded-lg text-sm border ${
                isDark
                  ? "bg-[#151F28] text-gray-200 border-gray-700"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            />
          </div>

          <Button
            variant={isDark ? "outline" : "secondary"}
            size="sm"
            className="flex items-center gap-2 px-4"
          >
            <Filter className="w-4 h-4" /> Filter
          </Button>

          <Button size="sm" className="bg-purple-600 text-white flex items-center gap-2 px-4">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <Card
        className={`mt-6 ${
          isDark ? "bg-[#151F28] border border-gray-700" : "bg-white border border-gray-200"
        }`}
      >
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Pending Advertisement Requests</h2>
          <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Requests awaiting approval and processing
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm min-w-[900px]">
              <thead className={`${isDark ? "text-gray-400" : "text-gray-600"} text-left`}>
                <tr>
                  {[
                    "User Name",
                    "Track",
                    "Platform",
                    "Amount",
                    "Purchase Date",
                    "Status",
                    "Payment status",
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
                    <td className="px-4 py-3">{row.userName}</td>
                    <td className="px-4 py-3">{row.track}</td>
                    <td className="px-4 py-3">{row.platform}</td>
                    <td className="px-4 py-3">{row.amount}</td>
                    <td className="px-4 py-3">{row.purchaseDate}</td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-md capitalize ${
                          row.status === "approved"
                            ? "bg-purple-600 text-white"
                            : row.status === "processing"
                            ? "bg-gray-600 text-white"
                            : "bg-gray-800 text-gray-200"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>

                    {/* Payment Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-md capitalize ${
                          row.paymentStatus === "approved"
                            ? "bg-purple-600 text-white"
                            : row.paymentStatus === "processing"
                            ? "bg-gray-600 text-white"
                            : "bg-gray-800 text-gray-200"
                        }`}
                      >
                        {row.paymentStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 text-white min-w-[90px]"
                        onClick={() => onApprove(row.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="min-w-[90px]"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredRequests.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className={`text-center py-6 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      No advertisement requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
