import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Download,
  Search,
  Eye,
  Music2,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";
import PlaylistPitchingReviewModal from "@/components/playlist-pitching/PlaylistPitchingReviewModal";

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
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [genre, setGenre] = useState("All Genres");

  const [selectedPitch, setSelectedPitch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const normalizeResponseToArray = (res) => {
    if (!res) return [];

    const payload = res.data ?? res;


    if (Array.isArray(payload)) return payload;
    if (payload?.data?.submissions && Array.isArray(payload.data.submissions))
      return payload.data.submissions;
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.submissions)) return payload.submissions;
    if (Array.isArray(payload.items)) return payload.items;


    const firstArray = Object.values(payload).find((v) => Array.isArray(v));
    if (firstArray) return firstArray;
    return [];
  };

  const fetchPlaylistPitches = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await GlobalApi.getPlayPitching();
      const arr = normalizeResponseToArray(res);
      setPitches(arr || []);
    } catch (err) {
      console.error("Failed to load playlist pitches:", err);
      setError("Failed to load submissions.");
      setPitches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylistPitches();
  }, []);

  const handleRefresh = () => {
    fetchPlaylistPitches();
  };

  const handleModalClose = (shouldRefresh = false) => {
    setIsModalOpen(false);
    setSelectedPitch(null);
    if (shouldRefresh) fetchPlaylistPitches();
  };

  const total = Array.isArray(pitches) ? pitches.length : 0;
  const pending = Array.isArray(pitches)
    ? pitches.filter((p) => p.status === "pending").length
    : 0;
  const approved = Array.isArray(pitches)
    ? pitches.filter((p) => p.status === "approved").length
    : 0;
  const rejected = Array.isArray(pitches)
    ? pitches.filter((p) => p.status === "rejected").length
    : 0;

  const genres = useMemo(
    () => [
      "All Genres",
      ...Array.from(
        new Set((Array.isArray(pitches) ? pitches.flatMap((p) => p.genres || []) : []))
      ),
    ],
    [pitches]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!Array.isArray(pitches)) return [];

    return pitches.filter((p) => {
      const matchesArtist = p.artistName
        ? String(p.artistName).toLowerCase().includes(q)
        : false;
      const matchesStatus = status === "All Status" || p.status === status;
      const matchesGenre =
        genre === "All Genres" || (p.genres || []).includes(genre);
      return (!q || matchesArtist) && matchesStatus && matchesGenre;
    });
  }, [pitches, search, status, genre]);


  const onReview = (row) => {
    setSelectedPitch(row);
    setIsModalOpen(true);
  };

  return (
    <div
      className={`p-4 md:p-6 space-y-6 transition-colors duration-300 ${isDark ? "bg-[#111A22] text-gray-200" : "bg-gray-50 text-[#151F28]"
        }`}
    >

      <div>
        <h1 className="text-2xl font-semibold">Playlist Pitching</h1>
        <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>
          Manage artist-submitted tracks for playlist inclusion and curation
        </p>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Submissions", value: total, icon: Music2 },
          { label: "Pending Review", value: pending, icon: Clock },
          { label: "Approved", value: approved, icon: CheckCircle2 },
          { label: "Rejected", value: rejected, icon: XCircle },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className={`relative rounded-lg p-5 overflow-hidden ${isDark ? "bg-[#151F28] text-white" : "bg-white border border-gray-200"
              }`}
          >
            <div className="absolute top-4 right-4   p-2 rounded-lg">
              <Icon className="w-5 h-5 text-gray-300" />
            </div>
            <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {label}
            </p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>


      <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
        <div className="relative w-full md:w-[520px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 opacity-70" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by artist name..."
            className={`pl-9 ${isDark ? "bg-[#151F28] border-gray-700 text-gray-200" : "bg-white"}`}
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`rounded-md px-3 py-2 text-sm ${isDark ? "bg-[#151F28] border border-gray-700 text-gray-200" : "bg-white border border-gray-300"
              }`}
          >
            {["All Status", "pending", "approved", "rejected"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className={`rounded-md px-3 py-2 text-sm ${isDark ? "bg-[#151F28] border border-gray-700 text-gray-200" : "bg-white border border-gray-300"
              }`}
          >
            {genres.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>

          <Button variant={isDark ? "outline" : "secondary"}>
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>


      <div className={`rounded-lg overflow-x-auto shadow-md ${isDark ? "bg-[#151F28]" : "bg-white"}`}>
        {loading ? (
          <div className="p-6 text-center">Loading submissions...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : (
          <table className="w-full text-sm min-w-[1300px]">
            <thead className={`${isDark ? "text-gray-400" : "text-gray-600"} text-left`}>
              <tr>
                <th className="px-4 py-3 font-medium">Track Name</th>
                <th className="px-4 py-3 font-medium">Artist Name</th>
                <th className="px-4 py-3 font-medium">Label Name</th>
                <th className="px-4 py-3 font-medium">ISRC</th>
                <th className="px-4 py-3 font-medium">Genre</th>
                <th className="px-4 py-3 font-medium">Mood</th>
                <th className="px-4 py-3 font-medium">Theme</th>
                <th className="px-4 py-3 font-medium">Language</th>
                <th className="px-4 py-3 font-medium">Store</th>
                <th className="px-4 py-3 font-medium">Submit Date</th>
                <th className="px-4 py-3 font-medium text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row._id} className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"} hover:bg-gray-800/40`}>
                  <td className="px-4 py-3 font-medium">{row.trackName || "—"}</td>
                  <td className="px-4 py-3">{row.artistName || "—"}</td>
                  <td className="px-4 py-3">{row.labelName || "—"}</td>
                  <td className="px-4 py-3">{row.isrc || "—"}</td>
                  <td className="px-4 py-3">{(row.genres || []).join(", ") || "—"}</td>
                  <td className="px-4 py-3 capitalize">{row.mood || "—"}</td>
                  <td className="px-4 py-3 capitalize">{row.theme || "—"}</td>
                  <td className="px-4 py-3 capitalize">{row.language || "—"}</td>
                  <td className="px-4 py-3">{row.selectedStore || "—"}</td>
                  <td className="px-4 py-3">{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—"}</td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant={isDark ? "secondary" : "outline"}
                      className={`rounded-full ${isDark ? "bg-[#1E293B] hover:bg-[#334155] text-gray-100 border border-gray-600" : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"}`}
                      onClick={() => onReview(row)}
                    >
                      <Eye className="h-4 w-4 mr-1" /> Review
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-4 py-6 text-center opacity-70">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>


      <PlaylistPitchingReviewModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        data={selectedPitch}
        theme={theme}
        refreshList={handleRefresh}
      />
    </div>
  );
}
