import { useState, useMemo } from "react";
import { testimonials as mockTestimonials } from "./TestimonialsData";
import { MoreHorizontal, Star, Search } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialManager({ theme }) {
    const [search, setSearch] = useState("");
    const [data, setData] = useState(mockTestimonials);

    const stats = useMemo(() => {
        const total = data.length;
        const published = data.filter((t) => t.status === "Published").length;
        const pending = data.filter((t) => t.status === "Pending").length;
        const avgRating =
            data.length > 0
                ? (data.reduce((a, b) => a + b.rating, 0) / data.length).toFixed(1)
                : "0";
        return { total, published, pending, avgRating };
    }, [data]);

    const filtered = data.filter(
        (t) =>
            t.customer.toLowerCase().includes(search.toLowerCase()) ||
            t.company.toLowerCase().includes(search.toLowerCase()) ||
            t.content.toLowerCase().includes(search.toLowerCase())
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
                    <h1 className="text-2xl font-bold">Testimonial Manager</h1>
                    <p className="text-sm text-gray-500">
                        Manage customer testimonials and reviews for Maheshwari Visuals
                    </p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                    + Add Testimonial
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className={cardClass}>
                    <CardContent className="p-4">
                        <p className="text-sm">Total Testimonials</p>
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
                        <p className="text-sm">Average Rating</p>
                        <p className="text-2xl font-bold text-yellow-500">{stats.avgRating}</p>
                    </CardContent>
                </Card>
                <Card className={cardClass}>
                    <CardContent className="p-4">
                        <p className="text-sm">Pending Review</p>
                        <p className="text-2xl font-bold">{stats.pending}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
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
                    placeholder="Search testimonials by name, company, or content..."
                    className={`w-full text-sm focus:outline-none ${theme === "dark"
                            ? "bg-[#151F28] text-white placeholder-gray-400"
                            : "bg-gray-200 text-black placeholder-gray-500"
                        }`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <div
                className={`overflow-x-auto rounded-xl border ${theme === "dark"
                        ? "bg-[#151F28] border-[#151F28]"
                        : "bg-white border-gray-200"
                    }`}
            >
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
                                "Content Preview",
                                "Status",
                                "Created At",
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
                                key={t.id}
                                className={`border-b ${theme === "dark"
                                        ? "border-[#151F28] hover:bg-[#151F28]/50"
                                        : "border-gray-200 hover:bg-gray-100"
                                    }`}
                            >
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <div
                                        className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold ${theme === "dark" ? "bg-gray-800" : "bg-gray-300"
                                            }`}
                                    >
                                        {t.customer.charAt(0)}
                                    </div>
                                    <span>{t.customer}</span>
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
                                <td className="px-4 py-3 truncate max-w-xs">{t.content}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${t.status === "Published"
                                                ? "bg-green-100 text-green-700"
                                                : t.status === "Draft"
                                                    ? "bg-gray-200 text-gray-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {t.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{t.createdAt}</td>
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
