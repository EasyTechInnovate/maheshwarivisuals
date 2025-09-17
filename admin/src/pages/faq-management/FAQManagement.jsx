import { useState, useMemo } from "react";
import { faqs as mockFaqs } from "./FAQManagementData";
import { MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

export default function FaqManager({ theme }) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(mockFaqs);

  const stats = useMemo(() => {
    const total = data.length;
    const published = data.filter((f) => f.status === "Published").length;
    const categories = new Set(data.map((f) => f.category)).size;
    const draft = data.filter((f) => f.status === "Draft").length;
    return { total, published, categories, draft };
  }, [data]);

  const filtered = data.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  const cardClass =
    theme === "dark"
      ? "bg-[#151F28] text-white border-gray-700 rounded-lg"
      : "bg-white text-black border border-gray-200 shadow-sm rounded-lg";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">FAQ Manager</h1>
          <p className="text-sm text-gray-500">
            Manage frequently asked questions for Maheshwari Visuals platform
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
          + Add New FAQ
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className={cardClass}>
          <CardContent className="p-4">
            <p className="text-sm">Total FAQs</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className={cardClass}>
          <CardContent className="p-4">
            <p className="text-sm">Published</p>
            <p className="text-2xl font-bold text-green-500">{stats.published}</p>
          </CardContent>
        </Card>
        <Card className={cardClass}>
          <CardContent className="p-4">
            <p className="text-sm">Categories</p>
            <p className="text-2xl font-bold">{stats.categories}</p>
          </CardContent>
        </Card>
        <Card className={cardClass}>
          <CardContent className="p-4">
            <p className="text-sm">Draft FAQs</p>
            <p className="text-2xl font-bold">{stats.draft}</p>
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
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        />
        <input
          type="text"
          placeholder="Search FAQs by question or category..."
          className={`w-full text-sm focus:outline-none ${
            theme === "dark"
              ? "bg-[#151F28] text-white placeholder-gray-400"
              : "bg-gray-200 text-black placeholder-gray-500"
          }`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FAQ Preview */}
<div className="space-y-2">
  {filtered.slice(0, 3).map((f) => {
    const [open, setOpen] = useState(false);
    return (
      <div
        key={f.id}
        className={`p-3 rounded-lg cursor-pointer ${theme === "dark" ? "bg-[#151F28] text-white" : "bg-gray-100 text-black"}`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex justify-between items-center">
          <span>{f.question}</span>
          <span>{open ? "▲" : "▼"}</span>
        </div>
        {open && (
          <div className="mt-2 text-sm text-gray-400">
            {f.answer}
          </div>
        )}
      </div>
    );
  })}
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
                "Order",
                "Question",
                "Category",
                "Display Status",
                "Status",
                "Created At",
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
            {filtered.map((f) => (
              <tr
                key={f.id}
                className={`border-b ${
                  theme === "dark"
                    ? "border-[#151F28] hover:bg-[#151F28]/50"
                    : "border-gray-200 hover:bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{f.order}</td>
                <td className="px-4 py-3">{f.question}</td>
                <td className="px-4 py-3">{f.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      f.displayStatus === "On"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {f.displayStatus}
                  </span>
                </td>
                <td className="px-4 py-3">{f.status}</td>
                <td className="px-4 py-3">{f.createdAt}</td>
                <td className="px-4 py-3">{f.lastUpdated}</td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="w-5 h-5" />
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
                      <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
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
