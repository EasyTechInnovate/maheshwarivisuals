import { useState, useMemo } from "react";
import { MoreHorizontal, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { labels as mockLabels } from "./TrendingLabelsData";

export default function TrendingLabelsManager({ theme }) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(mockLabels);

  const stats = useMemo(() => {
    const total = data.length;
    const active = data.filter((l) => l.status === "Active").length;
    const totalArtists = data.reduce((sum, l) => sum + l.artists, 0);
    const totalStreams = data.reduce((sum, l) => sum + l.monthlyStreams, 0);
    return {
      total,
      active,
      totalArtists,
      totalStreams: (totalStreams / 1_000_000).toFixed(1) + "M",
    };
  }, [data]);

  const filtered = data.filter(
    (l) =>
      l.label.toLowerCase().includes(search.toLowerCase()) ||
      l.designation.toLowerCase().includes(search.toLowerCase())
  );

  const cardClass =
    theme === "dark"
      ? "bg-[#151F28] text-white border-gray-700"
      : "bg-white text-black border-gray-200";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Trending Labels Manager</h1>
          <p className="text-sm text-gray-500">
            Manage trending music labels and their artist rosters
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
          + Add New Label
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className={cardClass}>
          <CardContent className="p-4">
            <p className="text-sm">Total Labels</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className={cardClass}>
          <CardContent className="p-4">
            <p className="text-sm">Active Labels</p>
            <p className="text-2xl font-bold text-green-500">{stats.active}</p>
          </CardContent>
        </Card>
        <Card className={cardClass}>
          <CardContent className="p-4">
            <p className="text-sm">Total Artists</p>
            <p className="text-2xl font-bold text-blue-500">
              {stats.totalArtists}
            </p>
          </CardContent>
        </Card>
        <Card className={cardClass}>
          <CardContent className="p-4">
            <p className="text-sm">Total Monthly Streams</p>
            <p className="text-2xl font-bold text-purple-500">
              {stats.totalStreams}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
<div
  className={`flex items-center px-3 py-2 rounded-lg ${
    theme === "dark" ? "bg-[#151F28]" : "bg-gray-200"
  }`}
>
  <Search
    className={`w-4 h-4 mr-2 ${
      theme === "dark" ? "text-gray-400" : "text-black"
    }`}
  />
  <input
    type="text"
    placeholder="Search labels by name, number, or designation..."
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
                "Label No.",
                "Label",
                "Designation",
                "Artists",
                "Releases",
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
            {filtered.map((l, index) => (
              <tr
                key={l.id}
                className={`border-b ${
                  theme === "dark"
                    ? "border-[#151F28] hover:bg-[#151F28]/50"
                    : "border-gray-200 hover:bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{l.labelNo}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold ${
                      theme === "dark" ? "bg-[#151F28]" : "bg-gray-300"
                    }`}
                  >
                    {l.label.charAt(0)}
                  </div>
                  <span>{l.label}</span>
                </td>
                <td className="px-4 py-3">{l.designation}</td>
                <td className="px-4 py-3">{l.artists}</td>
                <td className="px-4 py-3">{l.releases}</td>
                <td className="px-4 py-3">{l.monthlyStreams.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      l.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {l.status}
                  </span>
                </td>
                <td className="px-4 py-3">{l.lastUpdated}</td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="w-5 h-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}>
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
