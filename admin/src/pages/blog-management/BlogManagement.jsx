import { useMemo, useState } from "react";
import { blogStats, blogs as mockBlogs } from "./BlogManagementData";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Eye,
  Edit,
  TrendingUp,
  Search as SearchIcon,
  ChevronDown,
  User,
  Calendar,
  Eye as ViewIcon,
  Pencil,
  Trash2,
} from "lucide-react";

const icons = { FileText, Eye, Edit, TrendingUp };

export default function BlogManagement({ theme = "dark" }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const cardClass =
    theme === "dark"
      ? "bg-[#151F28] text-white border border-gray-700 rounded-lg"
      : "bg-white text-black border border-gray-200 shadow-sm rounded-lg";

  const rows = useMemo(() => {
    return mockBlogs.filter((b) => {
      const matchesQuery =
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase()) ||
        b.category.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All" ? true : b.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const statusPill = (s) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    if (s === "Published") return `${base} bg-green-500/15 text-green-400`;
    if (s === "Draft") return `${base} bg-gray-500/20 text-gray-300`;
    return `${base} bg-blue-500/15 text-blue-400`; 
  };

  const catPill =
    "px-2 py-0.5 rounded-full text-xs bg-gray-600/30 text-gray-200 whitespace-nowrap";

  const smallIconBtn =
    "w-4 h-4 cursor-pointer text-gray-400 hover:text-white transition";

  const fmt = (n) =>
    typeof n === "number" ? n.toLocaleString(undefined) : n ?? "-";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <p className="text-sm text-gray-500">
            Create, edit, and manage your blog content
          </p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 whitespace-nowrap">
          + New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(blogStats).map(([key, stat]) => {
          const Icon = icons[stat.icon];
          return (
            <Card key={key} className={cardClass}>
              <CardContent className="p-4 relative">
                <Icon className="w-5 h-5 absolute top-4 right-4 text-gray-400" />
                <p className="text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-purple-600 text-white">
                  {stat.change}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Blog Posts card */}
      <div
        className={`rounded-xl border ${
          theme === "dark"
            ? "bg-[#151F28]/60 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Title + subtext */}
        <div className="px-4 pt-4">
          <h2 className="text-lg font-semibold">Blog Posts</h2>
          <p className="text-sm text-gray-500">
            Manage your blog content and publications
          </p>
        </div>

        {/* Search + filter row (under heading) */}
        <div className="px-4 pt-4 pb-2 flex items-center gap-4">
          {/* search left */}
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg flex-1 border ${
              theme === "dark"
                ? "bg-transparent border-gray-700 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          >
            <SearchIcon className="w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className={`w-full text-sm outline-none ${
                theme === "dark"
                  ? "bg-transparent placeholder-gray-500"
                  : "bg-white placeholder-gray-500"
              }`}
            />
          </div>

          {/* status filter right */}
          <div className="relative min-w-[150px]">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`w-full px-3 py-2 text-sm rounded-lg appearance-none outline-none cursor-pointer border ${
                theme === "dark"
                  ? "bg-[#151F28] text-white border-gray-700"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              <option
                value="All"
                className={theme === "dark" ? "bg-[#151F28] text-white" : ""}
              >
                All Status
              </option>
              <option
                value="Published"
                className={theme === "dark" ? "bg-[#151F28] text-white" : ""}
              >
                Published
              </option>
              <option
                value="Draft"
                className={theme === "dark" ? "bg-[#151F28] text-white" : ""}
              >
                Draft
              </option>
              <option
                value="Scheduled"
                className={theme === "dark" ? "bg-[#151F28] text-white" : ""}
              >
                Scheduled
              </option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead
              className={
                theme === "dark"
                  ? "bg-[#121B24] text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }
            >
              <tr>
                {[
                  "Title",
                  "Author",
                  "Category",
                  "Status",
                  "Publish Date",
                  "Views",
                  "Comments",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((b, idx) => (
                <tr
                  key={b.id ?? idx}
                  className={`border-t ${
                    theme === "dark"
                      ? "border-gray-800 hover:bg-white/5"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {/* Title + Featured */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="truncate">{b.title}</span>
                      {b.featured && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-gray-600/30 text-gray-200">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Author */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{b.author}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-4">
                    <span className={catPill}>{b.category}</span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <span className={statusPill(b.status)}>{b.status}</span>
                  </td>

                  {/* Publish Date */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{b.createdAt ?? "-"}</span>
                    </div>
                  </td>

                  {/* Views */}
                  <td className="px-4 py-4">{fmt(b.views)}</td>

                  {/* Comments */}
                  <td className="px-4 py-4">{fmt(b.comments)}</td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <ViewIcon className={smallIconBtn} />
                      <Pencil className={smallIconBtn} />
                      <Trash2 className="w-4 h-4 cursor-pointer text-red-500 hover:text-red-600 transition" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="h-3" />
      </div>
    </div>
  );
}
