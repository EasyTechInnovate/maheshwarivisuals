import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Download, Upload, MoreVertical } from "lucide-react";
import BonusManagementModal from "./BonusManagementModal";

export default function BonusManagement({ theme = "dark" }) {
  const isDark = theme === "dark";
  const fileInputRef = useRef(null);
  const [uploadingFromMonth, setUploadingFromMonth] = useState("");
  const [uploadedData, setUploadedData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleBulkDelete = () => console.log("Bulk Delete Clicked");
  const handleBulkEdit = () => console.log("Bulk Edit Clicked");
  const dropdownRef = useRef();

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
      licence: pick("Licence", "Licence Type", "license"),
      licensor: pick("Licensor", "Licensor Name"),
      musicService: pick("Music Service", "Service"),
      month: pick("Month", "month") || defaultMonth || "",
      accountId: pick("Account ID", "accountId", "Account"),
      label: pick("Label"),
      artist: pick("Artist"),
      trackTitle: pick("Track Title", "Track", "Title"),
      album: pick("Album"),
      upc: pick("UPC"),
      isrc: pick("ISRC"),
      totalUnits: parseIntSafe(raw["Total Units"] ?? raw["Units"] ?? raw.units),
      sr: parseFloatSafe(raw["SR (₹)"] ?? raw["SR"] ?? raw.sr ?? raw.rate),
      country: pick("Country"),
      usageType: pick("Usage Type", "usage"),
      status: pick("Status") || "Active",
      id:
        (pick("Account ID", "accountId", "Account") || Math.random().toString(36).slice(2, 8)) +
        "-" +
        Math.random().toString(36).slice(2, 6),
    };
  }

  const handleUploadClick = (month) => {
    setUploadingFromMonth(month);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();

    try {
      if (ext === "csv" || ext === "txt") {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          worker: true,
          complete: (res) => {
            const parsed = (res.data || []).map((r) => normalizeRow(r, uploadingFromMonth));
            sessionStorage.setItem("bonusCsvData", JSON.stringify(parsed));
            setUploadedData(parsed);
          },
          error: (err) => {
            console.error("CSV parse error:", err);
            alert("Failed to parse CSV. Check the file format.");
          },
        });
      } else if (ext === "xls" || ext === "xlsx") {
        try {
          const XLSX = await import("xlsx");
          const data = await file.arrayBuffer();
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });
          const parsed = json.map((r) => normalizeRow(r, uploadingFromMonth));
          sessionStorage.setItem("bonusCsvData", JSON.stringify(parsed));
          setUploadedData(parsed);
        } catch (err) {
          console.error(err);
          alert("Install 'xlsx' to import Excel files, or upload CSV.");
        }
      } else {
        alert("Unsupported file type. Use CSV or XLSX.");
      }
    } finally {
      e.target.value = "";
      setUploadingFromMonth("");
    }
  };

  if (uploadedData) {
    return (
      <BonusManagementModal
        data={uploadedData}
        theme={theme}
        onBack={() => {
          setUploadedData(null);
          sessionStorage.removeItem("bonusCsvData");
        }}
        onImportClick={() => fileInputRef.current?.click()}
        updateData={(newData) => {
          setUploadedData(newData);
          sessionStorage.setItem("bonusCsvData", JSON.stringify(newData));
        }}
      />
    );
  }

  return (
    <div className={`p-6 min-h-screen ${isDark ? "bg-[#111A22] text-gray-200" : "bg-gray-50 text-[#151F28]"}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Bonus Management</h1>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage and analyze music distribution analytics data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={isDark ? "outline" : "secondary"} className="flex items-center gap-2 rounded-full px-5" onClick={() => fileInputRef.current?.click()}>
            <Download className="h-4 w-4" /> Import CSV/Excel
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-5 rounded-full">Export Analytics</Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {["Total Records", "Total Units", "Total Revenue", "Active Records"].map((title, idx) => (
          <div key={idx} className={`rounded-xl p-4 shadow ${isDark ? "bg-[#151F28]" : "bg-white"}`}>
            <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{title}</p>
            <p className={`text-2xl font-semibold ${title === "Total Revenue" ? "text-green-500" : ""}`}>
              {idx === 0 ? "2" : idx === 1 ? "23,500" : idx === 2 ? "₹64,700" : "2"}
            </p>
          </div>
        ))}
      </div>

      {/* Search + Filters + Bulk Action */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
        <input type="text" placeholder="Search by artist, track, or account ID..." className={`w-full md:w-1/2 px-3 py-2 rounded-md border ${isDark ? "bg-[#151F28] border-gray-700 text-gray-200" : "bg-white border-gray-300"}`} />
        <div className="flex items-center gap-2">
          <select className={`rounded-md px-3 py-2 text-sm ${isDark ? "bg-[#151F28] border border-gray-700 text-gray-200" : "bg-white border border-gray-300"}`}>
            <option>All Licences</option>
          </select>
          <select className={`rounded-md px-3 py-2 text-sm ${isDark ? "bg-[#151F28] border border-gray-700 text-gray-200" : "bg-white border border-gray-300"}`}>
            <option>All Months</option>
          </select>
          <select className={`rounded-md px-3 py-2 text-sm ${isDark ? "bg-[#151F28] border border-gray-700 text-gray-200" : "bg-white border border-gray-300"}`}>
            <option>All Accounts</option>
          </select>
          {/* Bulk Action Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              className=" px-5 text-red-500"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Bulk Action
            </Button>
            {showDropdown && (
              <div
                className={`absolute top-12 right-0 w-36 rounded-md shadow-md border z-20 ${isDark ? "bg-[#151F28] text-gray-200 border-gray-700" : "bg-white text-gray-800 border-gray-200"
                  }`}
              >
                <p
                  className={`px-3 py-2 cursor-pointer hover:${isDark ? "bg-gray-700" : "bg-gray-200"}`}
                  onClick={handleBulkDelete}
                >
                  Bulk Delete
                </p>
                <p
                  className={`px-3 py-2 cursor-pointer hover:${isDark ? "bg-gray-700" : "bg-gray-200"}`}
                  onClick={handleBulkEdit}
                >
                  Bulk Edit
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Months Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="min-w-full text-sm">
          <thead className={`${isDark ? "bg-[#151F28] text-gray-400" : "bg-gray-100"}`}>
            <tr>
              <th className="text-left px-4 py-3">Months</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {["Jan 25", "Feb 25",].map((month) => (
              <tr
                key={month}
                className={`${isDark
                  ? "border-t border-gray-700 hover:bg-gray-800"
                  : "border-t border-gray-300 hover:bg-gray-100"
                  }`}
              >

                <td className="px-4 py-3">{month}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleUploadClick(month)} className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full">
                      <Upload className="h-4 w-4" /> Upload Sheet
                    </button>
                    <button className="bg-transparent border border-gray-700 px-4 py-1 rounded-2xl text-sm">Edit</button>
                    <button className="bg-transparent border border-red-700 px-3 py-1 rounded-2xl text-sm text-red-500">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <input type="file" accept=".csv,.txt,.xls,.xlsx" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
    </div>
  );
}
