import { useEffect, useState, useMemo } from "react";
import {
    MoreHorizontal,
    Star,
    Search,
    Plus,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import GlobalApi from "@/lib/GlobalApi";
import TestimonialModal from "@/components/testimonials/TestimonialModal";
import ConfirmDialog from "@/components/common/ConfirmDialog";

export default function TestimonialManager({ theme }) {
    const [testimonials, setTestimonials] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);


    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const res = await GlobalApi.getAllTestimonials();
            const fetched = res.data?.data?.testimonials || res.data?.data || [];
            setTestimonials(fetched);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch testimonials");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);


    const stats = useMemo(() => {
        const total = testimonials.length;
        const published = testimonials.filter((t) => t.status === "published").length;
        const pending = testimonials.filter((t) => t.status === "pending").length;
        const avgRating =
            total > 0
                ? (
                    testimonials.reduce((a, b) => a + (b.rating || 0), 0) / total
                ).toFixed(1)
                : "0";
        return { total, published, pending, avgRating };
    }, [testimonials]);


    const filtered = testimonials.filter(
        (t) =>
            t.customerName?.toLowerCase().includes(search.toLowerCase()) ||
            t.company?.toLowerCase().includes(search.toLowerCase()) ||
            t.testimonialContent?.toLowerCase().includes(search.toLowerCase())
    );

    const cardClass =
        theme === "dark"
            ? "bg-[#151F28] text-white border-gray-700"
            : "bg-white text-black border-gray-200";


    const handleDelete = async (id) => {
        try {
            await GlobalApi.deleteTestimonial(id);
            toast.success("Testimonial deleted successfully");
            setConfirmDelete(null);
            fetchTestimonials();
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete testimonial");
        }
    };

    return (
        <div className="space-y-6">
            <Toaster richColors position="top-center" />


            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Testimonial Manager</h1>
                    <p className="text-sm text-gray-500">
                        Manage customer testimonials and reviews for Maheshwari Visuals
                    </p>
                </div>
                <Button
                    onClick={() => {
                        setSelectedTestimonial(null);
                        setShowModal(true);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center gap-2"
                >
                    <Plus size={16} /> Add Testimonial
                </Button>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total", value: stats.total },
                    { label: "Published", value: stats.published, color: "text-green-500" },
                    { label: "Average Rating", value: stats.avgRating, color: "text-yellow-500" },
                    { label: "Pending", value: stats.pending },
                ].map((s) => (
                    <Card key={s.label} className={cardClass}>
                        <CardContent className="p-4">
                            <p className="text-sm">{s.label}</p>
                            <p className={`text-2xl font-bold ${s.color || ""}`}>{s.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>


            <div
                className={`flex items-center px-3 py-2 rounded-lg ${theme === "dark" ? "bg-[#151F28]" : "bg-gray-200"
                    }`}
            >
                <Search
                    className={`w-4 h-4 mr-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                />
                <input
                    type="text"
                    placeholder="Search by name, company, or testimonial..."
                    className={`w-full text-sm focus:outline-none ${theme === "dark"
                            ? "bg-[#151F28] text-white placeholder-gray-400"
                            : "bg-gray-200 text-black placeholder-gray-500"
                        }`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>


            <div
                className={`overflow-x-auto rounded-xl border ${theme === "dark"
                        ? "bg-[#151F28] border-[#151F28]"
                        : "bg-white border-gray-200"
                    }`}
            >
                {filtered.length === 0 ? (
                    <div className="text-center py-10 text-sm text-gray-500">
                        No testimonial data
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead
                            className={`text-left ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                                }`}
                        >
                            <tr>
                                {[
                                    "Customer",
                                    "Designation",
                                    "Company",
                                    "Rating",
                                    "Content",
                                    "Status",
                                    "Actions",
                                ].map((header) => (
                                    <th key={header} className="px-4 py-3 font-medium">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((t) => (
                                <tr
                                    key={t._id}
                                    className={`border-b ${theme === "dark"
                                            ? "border-[#151F28] hover:bg-[#151F28]/50"
                                            : "border-gray-200 hover:bg-gray-100"
                                        }`}
                                >
                                    <td className="px-4 py-3 flex items-center gap-2">
                                        <img
                                            src={t.profileImageUrl || "/placeholder-user.png"}
                                            alt=""
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span>{t.customerName}</span>
                                    </td>
                                    <td className="px-4 py-3">{t.designation}</td>
                                    <td className="px-4 py-3">{t.company}</td>
                                    <td className="px-4 py-3 flex">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i <= t.rating
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-400"
                                                    }`}
                                            />
                                        ))}
                                    </td>
                                    <td className="px-4 py-3 truncate max-w-xs">
                                        {t.testimonialContent}
                                    </td>
                                    <td className="px-4 py-3 capitalize">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${t.status === "published"
                                                    ? "bg-green-100 text-green-700"
                                                    : t.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-gray-200 text-gray-700"
                                                }`}
                                        >
                                            {t.status}
                                        </span>
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
                                                    onClick={async () => {
                                                        const res = await GlobalApi.getTestimonialById(t._id);
                                                        setSelectedTestimonial(res.data.data);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => setConfirmDelete(t._id)}
                                                    className="text-red-500"
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>


            {showModal && (
                <TestimonialModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    testimonialId={selectedTestimonial?._id || null}
                    onSaved={fetchTestimonials}
                    theme={theme}
                />
            )}

            {confirmDelete && (
                <ConfirmDialog
                    title="Delete Testimonial"
                    message="Are you sure you want to delete this testimonial?"
                    onConfirm={() => handleDelete(confirmDelete)}
                    onCancel={() => setConfirmDelete(null)}
                />
            )}
        </div>
    );
}
