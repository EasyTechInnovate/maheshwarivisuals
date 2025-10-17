import { useState, useEffect, useMemo } from "react";
import GlobalApi from "@/lib/GlobalApi";
import { MoreHorizontal, Search, Trash2, Pencil, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger

} from "@/components/ui/accordion";
import FaqStatsModal from "@/components/faq-section/FaqModal";

const CATEGORY_OPTIONS = [
  "All",
  "Upload Process",
  "Distribution",
  "Royalties",
  "Release Management",
  "Technical Support",
];

export default function FaqManager({ theme }) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [deleting, setDeleting] = useState(null);


  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");


  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const res = await GlobalApi.getFaqs(1, 10);
        const apiData = res.data?.data?.faqs || [];


        const sortedFaqs = [...apiData].sort((a, b) => a.displayOrder - b.displayOrder);

        setData(sortedFaqs);
      } catch (err) {
        console.error("❌ Error fetching FAQs:", err);
        setError("Failed to load FAQs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);


  const handleDelete = async (faqId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this FAQ?");
    if (!confirmDelete) return;

    try {
      setDeleting(faqId);
      await GlobalApi.deleteFaq(faqId);
      setData((prev) => prev.filter((f) => f._id !== faqId));
    } catch (err) {
      console.error("❌ Error deleting FAQ:", err);
      alert(err?.response?.data?.message || "Failed to delete FAQ. Please try again.");
    } finally {
      setDeleting(null);
    }
  };


  const handleEdit = async (faqId) => {
    try {
      const res = await GlobalApi.getFaqById(faqId);
      const faq = res.data?.data;
      if (!faq) return alert("Failed to load FAQ details.");
      setEditingFaq(faq);
      setOpenModal(true);
    } catch (err) {
      console.error("❌ Error fetching FAQ for edit:", err);
      alert("Failed to fetch FAQ details. Please try again.");
    }
  };


  const stats = useMemo(() => {
    const total = data.length;
    const published = data.filter((f) => f.status === true).length;
    const draft = data.filter((f) => f.status === false).length;
    const validCategories = new Set(
      data
        .map((f) => f.category)
        .filter((c) =>
          [
            "Upload Process",
            "Distribution",
            "Royalties",
            "Release Management",
            "Technical Support",
          ].includes(c)
        )
    );

    return {
      total,
      published,
      draft,
      categories: validCategories.size,
    };
  }, [data]);


  const filtered = useMemo(() => {
    return data.filter((f) => {
      const matchesSearch =
        f.question.toLowerCase().includes(search.toLowerCase()) ||
        f.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || f.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Published" && f.status) ||
        (statusFilter === "Draft" && !f.status);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, data, categoryFilter, statusFilter]);

  const cardClass =
    theme === "dark"
      ? "bg-[#151F28] text-white border-gray-700 rounded-lg"
      : "bg-white text-black border border-gray-200 shadow-sm rounded-lg";

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">FAQ Manager</h1>
          <p className="text-sm text-gray-500">
            Manage frequently asked questions for Maheshwari Visuals platform
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingFaq(null);
            setOpenModal(true);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
        >
          + Add New FAQ
        </Button>
      </div>


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
            <p className="text-2xl font-bold text-yellow-500">{stats.draft}</p>
          </CardContent>
        </Card>
      </div>


      <div className="flex flex-col sm:flex-row items-center gap-3">

        <div
          className={`flex items-center flex-1 px-3 py-2 rounded-lg ${theme === "dark" ? "bg-[#151F28]" : "bg-gray-200"
            }`}
        >
          <Search
            className={`w-4 h-4 mr-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
          />
          <input
            type="text"
            placeholder="Search FAQs by question or category..."
            className={`w-full text-sm focus:outline-none ${theme === "dark"
              ? "bg-[#151F28] text-white placeholder-gray-400"
              : "bg-gray-200 text-black placeholder-gray-500"
              }`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger
            className={`w-40 ${theme === "dark"
              ? "bg-[#151F28] text-white border-gray-700"
              : "bg-white border-gray-200"
              }`}
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent
            className={
              theme === "dark"
                ? "bg-[#151F28] text-white border-gray-700"
                : "bg-white border-gray-200"
            }
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>


        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger
            className={`w-40 ${theme === "dark"
              ? "bg-[#151F28] text-white border-gray-700"
              : "bg-white border-gray-200"
              }`}
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent
            className={
              theme === "dark"
                ? "bg-[#151F28] text-white border-gray-700"
                : "bg-white border-gray-200"
            }
          >
            {["All", "Published", "Draft"].map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      <div
        className={`rounded-xl border mt-8 ${theme === "dark"
            ? "bg-[#151F28] border-gray-800 text-white"
            : "bg-white border-gray-200 text-black"
          }`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold">FAQ Preview</h2>
          <p className="text-sm text-gray-500">{filtered.length} total</p>
        </div>

        <div className="p-4">
          {filtered.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filtered.map((f, index) => (
                <div key={f._id}>
                  <AccordionItem value={f._id} className="border-none">
                    <AccordionTrigger
                      className={`px-2 py-3 text-sm font-medium rounded-md ${theme === "dark"
                          ? "text-white hover:bg-[#1C2630]"
                          : "text-black hover:bg-gray-100"
                        }`}
                      style={{
                        backgroundColor: theme === "dark" ? "#151F28" : "white",
                      }}
                    >
                      {f.question}
                    </AccordionTrigger>

                    <AccordionContent
                      className={`px-2 pb-4 text-sm leading-relaxed rounded-b-md ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      style={{
                        backgroundColor: theme === "dark" ? "#151F28" : "#F9FAFB",
                      }}
                    >
                      {f.answer || "No answer provided."}
                    </AccordionContent>
                  </AccordionItem>


                  {index !== filtered.length - 1 && (
                    <div
                      className={`my-2 border-t ${theme === "dark" ? "border-[#1E2A33]" : "border-gray-200"
                        }`}
                    ></div>
                  )}
                </div>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-6 text-sm text-gray-400">
              No FAQs to preview.
            </div>
          )}
        </div>
      </div>



      {!loading && !error && (
        <div
          className={`overflow-x-auto rounded-xl border ${theme === "dark"
            ? "bg-[#151F28] border-gray-700"
            : "border-gray-200"
            }`}
        >
          <table className="w-full text-sm">
            <thead
              className={`text-left ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"
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
                  key={f._id}
                  className={`border-b ${theme === "dark"
                    ? "border-[#151F28] hover:bg-[#151F28]/50"
                    : "border-gray-200 hover:bg-gray-100"
                    }`}
                >
                  <td className="px-4 py-3">{f.displayOrder}</td>
                  <td className="px-4 py-3">{f.question}</td>
                  <td className="px-4 py-3">{f.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${f.status
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                        }`}
                    >
                      {f.status ? "On" : "Off"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{f.status ? "Published" : "Draft"}</td>
                  <td className="px-4 py-3">
                    {new Date(f.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(f.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal className="w-5 h-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className={`${theme === "dark"
                          ? "bg-[#1F2A37] text-white border border-gray-700"
                          : "bg-white text-black border border-gray-200"
                          }`}
                      >
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => handleEdit(f._id)}
                        >
                          <Pencil className="w-4 h-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500 flex items-center gap-2"
                          onClick={() => handleDelete(f._id)}
                          disabled={deleting === f._id}
                        >
                          <Trash2 className="w-4 h-4" />
                          {deleting === f._id ? "Deleting..." : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      <FaqStatsModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingFaq(null);
        }}
        theme={theme}
        initialFaq={editingFaq}
        isEdit={!!editingFaq}
        onCreated={(newFaq) => setData((prev) => [newFaq, ...prev])}
        onUpdated={(updatedFaq) =>
          setData((prev) =>
            prev.map((faq) => (faq._id === updatedFaq._id ? updatedFaq : faq))
          )
        }
      />
    </div>
  );
}
