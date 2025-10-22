import { useState } from "react";
import { ExternalLink, Trash2, Plus, Upload, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsManagement({ theme = "dark" }) {
    const isDark = theme === "dark";

    const [items, setItems] = useState([
        {
            id: "news_1",
            url: "https://instagram.com/maheshwarivisuals",
            imageUrl: "/uploads/hindustan_times.jpg",
            imageName: "Hindustan_times.jpg",
            display: true,
            editingUrl: false,
        },
    ]);

    const addNew = () => {
        setItems([
            {
                id: `news_${Date.now()}`,
                url: "",
                imageUrl: "",
                imageName: "",
                display: false,
                editingUrl: true,
            },
            ...items,
        ]);
    };

    const updateItem = (id, patch) => {
        setItems((prev) =>
            prev.map((it) => (it.id === id ? { ...it, ...patch } : it))
        );
    };

    const removeItem = (id) => {
        setItems((prev) => prev.filter((it) => it.id !== id));
    };

    const handleFileChange = (id, file) => {
        if (file) {
            updateItem(id, { imageName: file.name });
        }
    };

    const containerClass = isDark
        ? "bg-[#111A22] text-white min-h-screen p-6"
        : "bg-gray-50 text-[#111A22] min-h-screen p-6";

    const cardClass = `${isDark ? "bg-[#151F28]" : "bg-white"} rounded-xl border ${isDark ? "border-gray-700" : "border-gray-200"
        } shadow p-6 flex flex-col md:flex-row items-start md:items-center gap-4 relative`;

    const labelClass = `${isDark ? "text-gray-300" : "text-gray-700"} text-sm font-medium`;

    return (
        <div className={containerClass}>
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold">News Management</h1>
                    <p className="text-gray-400 text-sm">
                        Add news article links along with publisher logo
                    </p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2">
                    <Plus size={16} /> Add New
                </Button>
            </div>

            {/* News Cards */}
            <div className="space-y-4">
                {items.map((it) => (
                    <div key={it.id} className={cardClass}>
                        {/* Delete Button */}
                        <button
                            onClick={() => removeItem(it.id)}
                            className="absolute top-4 right-4 text-red-500 hover:text-red-400"
                        >
                            <Trash2 size={18} />
                        </button>

                        {/* Article Link */}
                        <div className="flex-1 min-w-[250px] w-full">
                            <label className={labelClass}>Article Link</label>
                            <div className="flex items-center gap-3 mt-1">
                                {it.editingUrl ? (
                                    <input
                                        type="text"
                                        value={it.url}
                                        onChange={(e) =>
                                            updateItem(it.id, { url: e.target.value })
                                        }
                                        onBlur={() => updateItem(it.id, { editingUrl: false })}
                                        autoFocus
                                        className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDark
                                            ? "bg-[#151F28] text-gray-200"
                                            : "bg-gray-100 text-gray-800"
                                            }`}
                                    />
                                ) : (
                                    <div
                                        className={`flex items-center justify-between w-full rounded-md px-3 py-2 text-sm ${isDark
                                            ? "bg-gray-800 text-gray-200"
                                            : "bg-gray-100 text-gray-800"
                                            } cursor-pointer`}
                                        onClick={() =>
                                            updateItem(it.id, { editingUrl: true })
                                        }
                                    >
                                        <span className="truncate">{it.url || "No URL provided"}</span>
                                        <Edit size={16} />
                                    </div>
                                )}

                                {it.url && !it.editingUrl && (
                                    <a href={it.url} target="_blank" rel="noopener noreferrer">
                                        <button
                                            className={`p-2 rounded-md ${isDark
                                                ? "bg-gray-700 hover:bg-gray-600"
                                                : "bg-gray-200 hover:bg-gray-300"
                                                }`}
                                        >
                                            <ExternalLink size={16} />
                                        </button>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Publisher Image */}
                        <div className="flex-1 min-w-[220px] w-full">
                            <label className={labelClass}>Publisher Image</label>
                            <div className="flex items-center gap-3 mt-1">
                                <label className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-500 text-sm cursor-pointer">
                                    <Upload size={16} />
                                    Choose File
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(it.id, e.target.files[0])}
                                    />
                                </label>

                                {it.imageName ? (
                                    <div
                                        className={`w-[220px] text-sm px-3 py-2 rounded-md truncate ${isDark ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {it.imageName}
                                    </div>
                                ) : (
                                    <div
                                        className={`w-[220px] text-sm px-3 py-2 rounded-md ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-400"
                                            }`}
                                    >
                                        No file chosen
                                    </div>
                                )}
                            </div>
                        </div>




                        {/* Display Status */}
                        <div className="flex flex-col min-w-[120px] mt-3">
                            <span className={labelClass}>Display Status</span>
                            <label className="relative inline-flex items-center cursor-pointer mt-1">
                                <input
                                    type="checkbox"
                                    checked={it.display}
                                    onChange={() => updateItem(it.id, { display: !it.display })}
                                    className="sr-only peer"
                                />

                                <div className="w-11 h-6 bg-gray-700 rounded-full peer-checked:bg-purple-600 transition-colors"></div>

                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                            </label>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
