import { useMemo, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search, Check, X, Eye, Trash2, ChevronDown } from "lucide-react";

import { mockPitchStats, mockPitches } from "./PlaylistPitchingData";

function MoodBadge({ mood }) {
    const map = {
        Editorial: "bg-purple-500/20 text-purple-300",
        "Genre-specific": "bg-green-500/20 text-green-300",
        Featured: "bg-blue-500/20 text-blue-300",
    };
    return (
        <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[mood] || "bg-gray-500/20 text-gray-300"
                }`}
        >
            {mood}
        </span>
    );
}

export default function PlaylistPitching({ theme }) {
    const isDark = theme === "dark";

    const [pitches, setPitches] = useState(mockPitches);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All Status");
    const [genre, setGenre] = useState("All Genres");
    const [type, setType] = useState("All Types");
    const [showBulk, setShowBulk] = useState(false);
    const dropdownRef = useRef(null);

    const handleBulkDelete = () => setShowBulk(false);
    const handleBulkEdit = () => setShowBulk(false);




    const stats = useMemo(() => {
        const base = JSON.parse(JSON.stringify(mockPitchStats));
        const total = pitches.length;
        const pending = pitches.filter((p) => p.status === "Pending Review").length;
        const approved = pitches.filter((p) => p.status === "Approved").length;
        const under = pitches.filter((p) => p.status === "Under Review").length;

        const map = { total, pending, approved, underReview: under };
        return base.map((s) => ({ ...s, value: map[s.key] }));
    }, [pitches]);

    const genres = useMemo(
        () => ["All Genres", ...Array.from(new Set(pitches.map((p) => p.genre)))],
        [pitches]
    );
    const types = useMemo(
        () => ["All Types", ...Array.from(new Set(pitches.map((p) => p.type)))],
        [pitches]
    );

    const filtered = useMemo(() => {
        return pitches.filter((p) => {
            const q = search.trim().toLowerCase();
            const matchesQ =
                !q ||
                p.trackName.toLowerCase().includes(q) ||
                p.artistName.toLowerCase().includes(q) ||
                p.userId.toLowerCase().includes(q);

            const matchesStatus = status === "All Status" || p.status === status;
            const matchesGenre = genre === "All Genres" || p.genre === genre;
            const matchesType = type === "All Types" || p.type === type;

            return matchesQ && matchesStatus && matchesGenre && matchesType;
        });
    }, [pitches, search, status, genre, type]);

    const onApprove = (id) =>
        setPitches((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: "Approved" } : p))
        );
    const onReject = (id) =>
        setPitches((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p))
        );
    const onReview = (id) =>
        setPitches((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: "Under Review" } : p))
        );

    return (
        <div
            className={`p-4 md:p-6 space-y-6 transition-colors duration-300 ${isDark ? "bg-[#111A22] text-gray-200" : "bg-gray-50 text-[#151F28]"
                }`}
        >
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold">Playlist Pitching</h1>
                <p
                    className={`${isDark ? "text-gray-400" : "text-gray-600"
                        } text-sm`}
                >
                    Manage artist-submitted tracks for playlist inclusion and curation
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <div
                        key={i}
                        className={`rounded-lg p-4 shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"
                            }`}
                    >
                        <p className="text-sm">{s.label}</p>
                        <div className="flex items-end gap-2 mt-1">
                            <p className="text-2xl font-semibold">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
                {/* Search */}
                <div className="relative w-full md:w-[520px]">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 opacity-70" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by track name, artist, or playlist..."
                        className={`${isDark
                            ? "bg-[#151F28] border-gray-700 text-gray-200"
                            : "bg-white"
                            } pl-9`}
                    />
                </div>

                {/* Filters + actions */}
                <div className="flex flex-wrap gap-2 items-center">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`rounded-md px-3 py-2 text-sm ${isDark
                            ? "bg-[#151F28] border border-gray-700 text-gray-200"
                            : "bg-white border border-gray-300"
                            }`}
                    >
                        {[
                            "All Status",
                            "Pending Review",
                            "Approved",
                            "Under Review",
                            "Rejected",
                        ].map((s) => (
                            <option key={s}>{s}</option>
                        ))}
                    </select>

                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className={`rounded-md px-3 py-2 text-sm ${isDark
                            ? "bg-[#151F28] border border-gray-700 text-gray-200"
                            : "bg-white border border-gray-300"
                            }`}
                    >
                        {genres.map((g) => (
                            <option key={g}>{g}</option>
                        ))}
                    </select>

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className={`rounded-md px-3 py-2 text-sm ${isDark
                            ? "bg-[#151F28] border border-gray-700 text-gray-200"
                            : "bg-white border border-gray-300"
                            }`}
                    >
                        {types.map((t) => (
                            <option key={t}>{t}</option>
                        ))}
                    </select>

                    <Button
                        variant={isDark ? "outline" : "secondary"}
                        className="flex items-center gap-2 px-4"
                    >
                        <Download className="h-4 w-4" />
                        Export
                    </Button>


                    <div className="relative" ref={dropdownRef}>
                        <Button
                            variant="outline"
                            className="px-5 text-red-500"
                            onClick={() => setShowBulk((s) => !s)}
                        >
                            Bulk Action
                            <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                        {showBulk && (
                            <div
                                className={`absolute top-11 right-0 w-36 rounded-md shadow-md border z-20 ${isDark
                                    ? "bg-[#151F28] text-gray-200 border-gray-700"
                                    : "bg-white text-gray-800 border-gray-200"
                                    }`}
                            >
                                <button
                                    onClick={handleBulkDelete}
                                    className={`w-full text-left px-3 py-2 text-sm hover:${isDark ? "bg-gray-700" : "bg-gray-100"
                                        }`}
                                >
                                    Bulk Delete
                                </button>
                                <button
                                    onClick={handleBulkEdit}
                                    className={`w-full text-left px-3 py-2 text-sm hover:${isDark ? "bg-gray-700" : "bg-gray-100"
                                        }`}
                                >
                                    Bulk Edit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div
                className={`rounded-lg overflow-x-auto shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"
                    }`}
            >
                <table className="w-full text-sm min-w-[1200px]">
                    <thead
                        className={`${isDark ? "text-gray-400" : "text-gray-600"
                            } text-left`}
                    >
                        <tr>
                            <th className="px-4 py-3 font-medium">Track Name</th>
                            <th className="px-4 py-3 font-medium">Artist Name</th>
                            <th className="px-4 py-3 font-medium">User ID</th>
                            <th className="px-4 py-3 font-medium">ISRC of Track</th>
                            <th className="px-4 py-3 font-medium">Genre</th>
                            <th className="px-4 py-3 font-medium">Mood</th>
                            <th className="px-4 py-3 font-medium">Theme</th>
                            <th className="px-4 py-3 font-medium">Language</th>
                            <th className="px-4 py-3 font-medium">Store</th>
                            <th className="px-4 py-3 font-medium w-[120px] whitespace-nowrap">Submit Date</th>
                            <th className="px-4 py-3 font-medium text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((row) => (
                            <tr
                                key={row.id}
                                className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"
                                    } hover:bg-gray-800/40`}
                            >
                                <td className="px-4 py-3 font-medium">{row.trackName}</td>
                                <td className="px-4 py-3">{row.artistName}</td>
                                <td className="px-4 py-3">{row.userId}</td>
                                <td className="px-4 py-3">{row.isrc}</td>
                                <td className="px-4 py-3">{row.genre}</td>
                                <td className="px-4 py-3">
                                    <MoodBadge mood={row.mood} />
                                </td>
                                <td className="px-4 py-3">{row.theme}</td>
                                <td className="px-4 py-3">{row.language}</td>
                                <td className="px-4 py-3">{row.store}</td>
                                <td className="px-4 py-3">{row.submitDate}</td>
                                <td className="px-4 py-3">
                                    <div className="flex min-w-max gap-2">
                                        <Button
                                            size="sm"
                                            className="bg-gray-800 hover:bg-gray-700 text-white rounded-full w-[100px] justify-center"
                                            onClick={() => onReview(row.id)}
                                        >
                                            <Eye className="h-4 w-4 mr-1" /> Review
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="bg-green-600 hover:bg-green-700 text-white rounded-full w-[100px] justify-center"
                                            onClick={() => onApprove(row.id)}
                                        >
                                            <Check className="h-4 w-4 mr-1" /> Approve
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="bg-red-600 hover:bg-red-700 text-white rounded-full w-[100px] justify-center"
                                            onClick={() => onReject(row.id)}
                                        >
                                            <X className="h-4 w-4 mr-1" /> Reject
                                        </Button>
                                    </div>
                                </td>


                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td
                                    colSpan={11}
                                    className="px-4 py-6 text-center opacity-70"
                                >
                                    No results match your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
