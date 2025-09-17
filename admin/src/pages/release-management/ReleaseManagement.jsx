import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Eye } from "lucide-react";
import { mockReleases } from "./ReleaseManagementData"; // Import mock data
import ReleaseModal from "./ReleaseModal"; // Import your modal component

export default function ReleaseManagement({ theme }) {
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");
  const [releases] = useState(mockReleases);

  const [activePage, setActivePage] = useState("list"); // "list" | "modal"
  const [selectedRelease, setSelectedRelease] = useState(null);

  const filteredReleases = releases.filter(
    (r) =>
      r.releaseName.toLowerCase().includes(search.toLowerCase()) ||
      r.artist.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: "Total Releases", value: releases.length },
    { label: "Published", value: releases.filter((r) => r.status === "Published").length },
    { label: "Under Review", value: releases.filter((r) => r.status === "Under Review").length },
    { label: "Total Tracks", value: releases.reduce((sum, r) => sum + r.tracks, 0) },
  ];

  const statusColors = {
    Published: "bg-green-500/20 text-green-400",
    "Under Review": "bg-yellow-500/20 text-yellow-400",
    Draft: "bg-gray-500/20 text-gray-400",
  };

  const handleViewDetails = (release) => {
    setSelectedRelease(release);
    setActivePage("modal");
  };

  const handleBack = () => {
    setActivePage("list");
    setSelectedRelease(null);
  };

  // Render the modal page
  if (activePage === "modal") {
    return (
      <ReleaseModal
        theme={theme}
        defaultData={selectedRelease}
        onBack={handleBack}
      />
    );
  }

  // Render the normal list page
  return (
    <div className={`p-4 md:p-6 space-y-6 transition-colors duration-300 ${isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-[#151F28]"}`}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Release Management</h1>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage music releases and track distribution across platforms
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant={isDark ? "outline" : "secondary"} className="flex items-center gap-2 rounded-full px-5">
            <Download className="h-4 w-4" /> Import CSV/Excel
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5">
            + Add New Release
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`rounded-lg p-4 shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"}`}>
            <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
        <Input
          placeholder="Search by name, ID, or artist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full md:w-1/3 ${isDark ? "bg-[#151F28] border-gray-700 text-gray-200" : "bg-white"}`}
        />
        <div className="flex flex-wrap gap-2">
          <select className={`rounded-md px-3 py-2 text-sm ${isDark ? "bg-[#151F28] border border-gray-700 text-gray-200" : "bg-white border border-gray-300"}`}>
            <option>All Status</option>
            <option>Published</option>
            <option>Under Review</option>
            <option>Draft</option>
          </select>
          <select className={`rounded-md px-3 py-2 text-sm ${isDark ? "bg-[#151F28] border border-gray-700 text-gray-200" : "bg-white border border-gray-300"}`}>
            <option>All Artists</option>
            <option>DJ Arjun</option>
            <option>Anjali Verma</option>
            <option>Rohit Sharma</option>
          </select>
          <Button variant={isDark ? "outline" : "secondary"} className="flex items-center gap-2 px-5">
            <Download className="h-4 w-4" /> Bulk Download
          </Button>
          <Button variant="outline" className="px-5 text-red-500">Bulk Delete</Button>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-lg overflow-x-auto shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"}`}>
        <table className="w-full text-sm min-w-[700px]">
          <thead className={`${isDark ? "text-gray-400" : "text-gray-600"} text-left`}>
            <tr>
              {["Release ID", "Release Name", "Artist", "Status", "Request Status", "Tracks", "Account Name", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredReleases.map((rel) => (
              <tr key={rel.id} className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                <td className="px-4 py-3">{rel.id}</td>
                <td className="px-4 py-3">{rel.releaseName}</td>
                <td className="px-4 py-3">{rel.artist}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[rel.status]}`}>{rel.status}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[rel.requestStatus]}`}>{rel.requestStatus}</span>
                </td>
                <td className="px-4 py-3">{rel.tracks} tracks</td>
                <td className="px-4 py-3">{rel.accountName}</td>
                <td className="px-4 py-3 flex flex-wrap gap-2">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1 rounded-full px-4" onClick={() => handleViewDetails(rel)}>
                    <Eye className="h-4 w-4" /> View Details
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4">
                    <Download className="h-4 w-4" /> Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
