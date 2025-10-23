import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Clock3,
  Music2,
  DollarSign,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import GlobalApi from "@/lib/GlobalApi";
import SyncLicenseReviewModal from "../../components/synchronization-(sync)/SyncLicenseReviewModal";


const enumLabels = {
  projectSuitability: {
    ad_campaigns: "Ad Campaigns",
    ott_web_series: "OTT / Web Series",
    tv_film_score: "TV & Film Score",
    trailers: "Trailers",
    podcasts: "Podcasts",
    corporate_films: "Corporate Films",
    gaming_animation: "Gaming / Animation",
    short_films_student: "Short Films / Student Projects",
    fashion_product_launch: "Fashion & Product Launch",
    festival_documentaries: "Festival Documentaries",
  },
  genres: {
    pop: "Pop",
    rock: "Rock",
    hip_hop: "Hip-Hop",
    electronic: "Electronic",
    jazz: "Jazz",
    classical: "Classical",
    reggae: "Reggae",
    country: "Country",
    blues: "Blues",
    folk: "Folk",
    r_and_b: "R&B",
    funk: "Funk",
    disco: "Disco",
    house: "House",
    techno: "Techno",
    trance: "Trance",
    ambient: "Ambient",
    indian_classical: "Indian Classical",
    bollywood: "Bollywood",
    bhangra: "Bhangra",
    devotional: "Devotional",
  },
  mood: {
    emotional: "Emotional",
    energetic: "Energetic",
    romantic: "Romantic",
    aggressive: "Aggressive",
    calm: "Calm",
    happy: "Happy",
    sad: "Sad",
    motivational: "Motivational",
    relaxing: "Relaxing",
    intense: "Intense",
    genre_specific: "Genre Specific",
    featured: "Featured",
    editorial: "Editorial",
  },
  theme: {
    love: "Love",
    heartbreak: "Heartbreak",
    friendship: "Friendship",
    party: "Party",
    celebration: "Celebration",
    inspiration: "Inspiration",
    nature: "Nature",
    spiritual: "Spiritual",
    adventure: "Adventure",
    nostalgia: "Nostalgia",
    freedom: "Freedom",
    struggle: "Struggle",
  },
  language: {
    hindi: "Hindi",
    english: "English",
    punjabi: "Punjabi",
    tamil: "Tamil",
    telugu: "Telugu",
    bengali: "Bengali",
    marathi: "Marathi",
    gujarati: "Gujarati",
    kannada: "Kannada",
    malayalam: "Malayalam",
    urdu: "Urdu",
    instrumental: "Instrumental",
    other: "Other",
  },
  proAffiliation: {
    bmi: "BMI",
    ascap: "ASCAP",
    iprs: "IPRS",
    prs: "PRS",
    socan: "SOCAN",
    sacem: "SACEM",
    gema: "GEMA",
    other: "Other",
    none: "None",
  },
};


const toReadable = (key, type) => {
  if (!key) return "—";
  const labelMap = enumLabels[type];
  if (Array.isArray(key))
    return key.map((v) => labelMap?.[v] || toTitleCase(v)).join(", ");
  return labelMap?.[key] || toTitleCase(key);
};

const toTitleCase = (str) =>
  str
    ? String(str)
        .toLowerCase()
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "—";


const iconMap = {
  total: Music2,
  approved: CheckCircle2,
  rejected: XCircle,
  pending: Clock3,
};

export default function SyncManagement({ theme }) {
  const isDark = theme === "dark";
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const [showBulk, setShowBulk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const fetchSyncRequests = async () => {
    try {
      setLoading(true);
      const res = await GlobalApi.getAllSyncSubmissions(1, 10);
      if (res.data?.success) {
        setRequests(res.data.data.submissions || []);
      } else {
        throw new Error("Failed to load sync submissions");
      }
    } catch (err) {
      console.error("❌ Error fetching sync submissions:", err);
      setError("Failed to fetch data");
      toast.error("Failed to load sync submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSyncRequests();
  }, []);

 
  const stats = {
    total: requests.length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
    pending: requests.filter((r) => r.status === "pending").length,
  };

  const statCards = [
    { key: "total", label: "Total Requests", value: stats.total },
    { key: "approved", label: "Approved Requests", value: stats.approved },
    { key: "rejected", label: "Rejected Requests", value: stats.rejected },
    { key: "pending", label: "Pending Requests", value: stats.pending },
  ];

  const handleBulkDelete = () => setShowBulk(false);
  const handleBulkEdit = () => setShowBulk(false);

  const filteredRequests = requests.filter((row) => {
    const q = searchQuery.toLowerCase();
    return (
      row.trackName?.toLowerCase().includes(q) ||
      row.artistName?.toLowerCase().includes(q)
    );
  });

  const handleReviewClick = (row) => {
    setSelectedRequest(row);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const primaryText = isDark ? "text-gray-300" : "text-gray-800";
  const secondaryText = isDark ? "text-gray-400" : "text-gray-700";

  return (
    <div
      className={`p-6 transition-colors duration-300 ${
        isDark ? "bg-[#111A22] text-gray-200" : "bg-gray-50 text-[#151F28]"
      }`}
    >
     
      <div>
        <h1 className="text-2xl font-bold">Synchronization (SYNC)</h1>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Manage sync license requests for film, TV, commercials, and digital content.
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {statCards.map((s) => {
          const Icon = iconMap[s.key];
          const colorClass =
            s.key === "approved"
              ? "text-green-500"
              : s.key === "rejected"
              ? "text-red-500"
              : s.key === "pending"
              ? "text-yellow-400"
              : isDark
              ? "text-blue-400"
              : "text-blue-600";

          return (
            <Card
              key={s.key}
              className={`relative ${
                isDark
                  ? "bg-[#151F28] border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <CardContent className="p-4">
                <div
                  className={`absolute top-3 right-3 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {s.label}
                </p>
                <p className={`text-2xl font-bold ${colorClass}`}>{s.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

         
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-6">
        <div className="relative flex-1">
          <Search
            className={`absolute left-3 top-2.5 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by track name or artist..."
            className={`w-full text-sm pl-10 pr-4 py-2 rounded-lg border ${
              isDark
                ? "bg-[#151F28] text-gray-200 border-gray-700"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          />
        </div>

        <div className="flex gap-2">
          {["All Status", "All Genres", "All Types"].map((label) => (
            <select
              key={label}
              className={`text-sm rounded-lg px-3 py-2 border ${
                isDark
                  ? "bg-[#151F28] text-gray-200 border-gray-700"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              <option>{label}</option>
            </select>
          ))}

          <Button
            variant={isDark ? "outline" : "secondary"}
            size="sm"
            className="flex items-center gap-2 px-4"
          >
            <Download className="w-4 h-4" /> Export
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
                className={`absolute top-11 right-0 w-36 rounded-md shadow-md border z-20 ${
                  isDark
                    ? "bg-[#151F28] text-gray-200 border-gray-700"
                    : "bg-white text-gray-800 border-gray-200"
                }`}
              >
                <button
                  onClick={handleBulkDelete}
                  className={`w-full text-left px-3 py-2 text-sm ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  Bulk Delete
                </button>
                <button
                  onClick={handleBulkEdit}
                  className={`w-full text-left px-3 py-2 text-sm ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  Bulk Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    
<div
  className={`mt-6 overflow-x-auto rounded-lg shadow-md ${
    isDark ? "bg-[#151F28]" : "bg-white"
  }`}
>
  {loading ? (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="animate-spin h-6 w-6 mr-2" />
      <p>Loading sync requests...</p>
    </div>
  ) : error ? (
    <div className="text-center py-10 text-red-500">
      Failed to load data. Please try again.
    </div>
  ) : (
    <table
      className={`w-full border-collapse text-sm min-w-[1100px] ${
        isDark ? "text-gray-200" : "text-[#151F28]"
      }`}
    >
      <thead
        className={`text-left border-b ${
          isDark ? "border-gray-700 text-gray-300" : "border-gray-200 text-gray-600"
        }`}
      >
        <tr>
          {[
            "Track Name",
            "Artist Name",
            "Label Name",
            "ISRC of Track",
            "Genre",
            "Mood",
            "Theme",
            "Language",
            "Master Rights",
            "PRO Affiliation",
            "Project Suitability",
            "Submit Date",
            "Actions",
          ].map((header) => (
            <th key={header} className="px-4 py-3 font-semibold whitespace-nowrap">
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {filteredRequests.length > 0 ? (
          filteredRequests.map((row, i) => (
            <tr
              key={row._id || i}
              className={`border-t transition-colors ${
                isDark
                  ? "border-gray-700 hover:bg-gray-800/50"
                  : "border-gray-200 hover:bg-gray-100"
              }`}
            >
              <td className="px-4 py-3 text-sm">{toTitleCase(row.trackName)}</td>
              <td className="px-4 py-3 text-sm">{toTitleCase(row.artistName)}</td>
              <td className="px-4 py-3 text-sm">{toTitleCase(row.labelName)}</td>
              <td className="px-4 py-3 text-sm font-mono">{row.isrc || "—"}</td>
              <td className="px-4 py-3 text-sm">{toReadable(row.genres, "genres")}</td>
              <td className="px-4 py-3 text-sm">{toReadable(row.mood, "mood")}</td>
              <td className="px-4 py-3 text-sm">{toReadable(row.theme, "theme")}</td>
              <td className="px-4 py-3 text-sm">{toReadable(row.language, "language")}</td>
              <td className="px-4 py-3 text-sm">{toTitleCase(row.masterRightsOwner)}</td>
              <td className="px-4 py-3 text-sm">{toReadable(row.proAffiliation, "proAffiliation")}</td>
              <td className="px-4 py-3 text-sm">{toReadable(row.projectSuitability, "projectSuitability")}</td>
              <td className="px-4 py-3 text-sm">
                {row.createdAt
                  ? new Date(row.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </td>
              <td className="px-4 py-3 flex gap-2">
                <Button
                  size="sm"
                  className={`min-w-[90px] ${
                    isDark ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
                  }`}
                  onClick={() => handleReviewClick(row)}
                >
                  <Eye className="w-4 h-4 mr-1" /> Review
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={14}
              className={`text-center py-6 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              No sync requests found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )}
</div>


      
      <SyncLicenseReviewModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        data={selectedRequest}
        theme={theme}
        refreshList={fetchSyncRequests}
      />
    </div>
  );
}

