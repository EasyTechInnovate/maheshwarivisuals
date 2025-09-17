import React, { useRef, useState, useEffect } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";

export default function AnalyticsManagement({ theme = "dark" }) {
  const isDark = theme === "dark";
  const fileInputRef = useRef(null);

  const [uploadedData, setUploadedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Restore session data
  useEffect(() => {
    const saved = sessionStorage.getItem("analyticsCsvData");
    if (saved) setUploadedData(JSON.parse(saved));
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();

    try {
      if (ext === "csv" || ext === "txt") {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (res) => {
            const parsed = res.data || [];
            sessionStorage.setItem("analyticsCsvData", JSON.stringify(parsed));
            setUploadedData(parsed);
          },
        });
      } else if (ext === "xls" || ext === "xlsx") {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        sessionStorage.setItem("analyticsCsvData", JSON.stringify(json));
        setUploadedData(json);
      } else {
        alert("Unsupported file type. Use CSV or XLSX.");
      }
    } finally {
      e.target.value = "";
    }
  };

  const filteredData = uploadedData.filter((row) => {
    return Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  // Header stats (example calculations)
  const totalRecords = uploadedData.length;
  const totalUnits = uploadedData.reduce((sum, row) => sum + (parseInt(row["Total Units"]) || 0), 0);
  const totalRevenue = uploadedData.reduce((sum, row) => sum + (parseFloat(row["SR (₹)"]) || 0), 0);

  return (
    <div className={`p-6 min-h-screen space-y-6 ${isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-[#151F28]"}`}>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Analytics Management</h1>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage and analyze music distribution analytics data
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant={isDark ? "outline" : "secondary"}
            className="flex items-center gap-2 rounded-full px-5"
            onClick={() => fileInputRef.current?.click()}
          >
            <Download className="h-4 w-4" /> Import CSV/Excel
          </Button>
        </div>
      </div>

      {/* Stats Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`rounded-lg p-4 shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"}`}>
          <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Total Records</p>
          <p className="text-2xl font-semibold">{totalRecords}</p>
        </div>
        <div className={`rounded-lg p-4 shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"}`}>
          <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Total Units</p>
          <p className="text-2xl font-semibold">{totalUnits}</p>
        </div>
        <div className={`rounded-lg p-4 shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"}`}>
          <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Total Revenue</p>
          <p className="text-2xl font-semibold text-green-500">₹{totalRevenue}</p>
        </div>
        <div className={`rounded-lg p-4 shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"}`}>
          <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Active Records</p>
          <p className="text-2xl font-semibold">
            {uploadedData.filter((row) => row.Status?.toLowerCase() === "active").length}
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <input
          type="text"
          placeholder="Search by any field..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`px-4 py-2 rounded-lg border w-full md:w-1/3 ${
            isDark ? "bg-[#151F28] border-gray-700" : "bg-white border-gray-300"
          }`}
        />
      </div>

      {/* Table */}
      <div className={`overflow-x-auto rounded-xl shadow-md ${isDark ? "border border-gray-700" : "border border-gray-300"}`}>
        <table className="min-w-full text-sm">
          <thead className={`${isDark ? "bg-[#151F28] text-gray-400" : "bg-gray-100 text-gray-700"}`}>
            <tr>
              {uploadedData.length > 0 &&
                Object.keys(uploadedData[0]).map((header) => (
                  <th key={header} className="text-left px-4 py-3">
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, i) => (
                <tr
                  key={i}
                  className={`${isDark ? "border-t border-gray-700 hover:bg-gray-800" : "border-t border-gray-300 hover:bg-gray-100"}`}
                >
                  {Object.values(row).map((value, idx) => (
                    <td key={idx} className="px-4 py-3">
                      {value}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={uploadedData[0] ? Object.keys(uploadedData[0]).length : 1} className="text-center py-6">
                  No data available. Import a file to see records.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <input
        type="file"
        accept=".csv,.txt,.xls,.xlsx"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
