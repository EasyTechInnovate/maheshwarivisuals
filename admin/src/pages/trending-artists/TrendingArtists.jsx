import { useState, useMemo } from "react";
import { trendingArtists as mockArtists } from "./TrendingArtistsData";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TrendingArtistsManager({ theme }) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(mockArtists);

  const stats = useMemo(() => {
    const total = data.length;
    const active = data.filter((a) => a.displayStatus === "Active").length;
    const totalReleases = data.reduce((sum, a) => sum + a.totalReleases, 0);
    const totalStreams = data
      .reduce((sum, a) => sum + parseInt(a.monthlyStreams.replace(/,/g, "")), 0)
      .toLocaleString();
    return { total, active, totalReleases, totalStreams };
  }, [data]);

  const filtered = data.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.artistNo.toLowerCase().includes(search.toLowerCase()) ||
      a.designation.toLowerCase().includes(search.toLowerCase())
  );

const cardClass =
  theme === "dark"
    ? "bg-[#151F28] text-white border border-gray-700 rounded-lg"
    : "bg-white text-black border border-gray-200 shadow-sm rounded-lg";


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Trending Artists Manager</h1>
          <p className="text-sm text-gray-500">
            Manage trending artists and their release catalogs
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
          + Add New Artist
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={cardClass + " p-4"}>
          <p className="text-sm">Total Artists</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className={cardClass + " p-4"}>
          <p className="text-sm">Active Artists</p>
          <p className="text-2xl font-bold text-green-500">{stats.active}</p>
        </div>
        <div className={cardClass + " p-4"}>
          <p className="text-sm">Total Releases</p>
          <p className="text-2xl font-bold text-blue-500">{stats.totalReleases}</p>
        </div>
        <div className={cardClass + " p-4"}>
          <p className="text-sm">Total Monthly Streams</p>
          <p className="text-2xl font-bold text-purple-500">{stats.totalStreams}</p>
        </div>
      </div>

      {/* Search */}
      <div
  className={`flex items-center px-3 py-2 rounded-lg ${
    theme === "dark" ? "bg-[#151F28]" : "bg-gray-200"
  }`}
>
  <input
    type="text"
    placeholder="Search artists by name, number, or designation..."
    className={`bg-transparent w-full text-sm focus:outline-none placeholder-gray-500 ${
      theme === "dark" ? "text-white" : "text-black"
    }`}
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>


      {/* Table */}
      <div
        className={`overflow-x-auto rounded-xl border ${
          theme === "dark" ? "bg-[#151F28] border-gray-700" : "border-gray-200"
        }`}
      >
        <table className="w-full text-sm">
          <thead
            className={`text-left ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <tr>
              {[
                "SR.NO.",
                "Artist No.",
                "Artist",
                "Designation",
                "Total Releases",
                "Monthly Streams",
                "Display Status",
                "Last Updated",
                "Actions",
              ].map((header) => (
                <th key={header} className="px-4 py-3 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr
                key={a.id}
                className={`border-b ${
                  theme === "dark"
                    ? "border-[#151F28] hover:bg-[#151F28]/50"
                    : "border-gray-200 hover:bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">{a.artistNo}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold ${
                      theme === "dark" ? "bg-gray-800" : "bg-gray-300"
                    }`}
                  >
                    {a.name.charAt(0)}
                  </div>
                  <span>{a.name}</span>
                </td>
                <td className="px-4 py-3">{a.designation}</td>
                <td className="px-4 py-3">{a.totalReleases}</td>
                <td className="px-4 py-3">{a.monthlyStreams}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      a.displayStatus === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {a.displayStatus}
                  </span>
                </td>
                <td className="px-4 py-3">{a.lastUpdated}</td>
                <td className="px-4 py-3">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
                    Update Catalog
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="w-5 h-5 ml-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className={`${
                        theme === "dark"
                          ? "bg-[#1F2A37] text-white border border-gray-700"
                          : "bg-white text-black border border-gray-200"
                      }`}
                    >
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
