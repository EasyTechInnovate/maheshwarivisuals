import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import AudioUploadSection from "./ReleaseModalAudio";

export default function ReleaseManagement({ theme = "dark", onBack }) {
  const isDark = theme === "dark";

  const [coverArt, setCoverArt] = useState(null);
  const [releaseData, setReleaseData] = useState({
    releaseName: "",
    genre: "",
    labelName: "",
    upc: "",
  });

  const handleChange = (key, value) =>
    setReleaseData((prev) => ({ ...prev, [key]: value }));

  const handleCoverArtUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setCoverArt(file);
  };

  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-200 ${isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-[#151F28]"
        }`}
    >
      {/* Header + actions */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Release Management</h1>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mt-1`}>
            Manage music releases and track distribution across platforms
          </p>
        </div>

        {/* Actions on the right (Export + Status) */}
        <div className="flex items-center gap-3 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${isDark
                    ? "bg-[#151F28] border border-gray-700 text-gray-200"
                    : "bg-white border border-gray-200 text-gray-800"
                  }`}
              >
                <Download className="w-4 h-4" /> Export CSV/Excel
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className={`w-56 ${isDark
                  ? "bg-gray-800   border border-gray-700 text-gray-200"
                  : "bg-white border border-gray-200 text-gray-800"
                } rounded-md shadow-md`}
            >
              <DropdownMenuItem>Export Cover Art</DropdownMenuItem>
              <DropdownMenuItem>Export Audio File</DropdownMenuItem>
              <DropdownMenuItem>Export Whole File</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select onValueChange={(v) => handleChange("status", v)}>
            <SelectTrigger
              className={`w-44 rounded-full px-4 py-2 text-sm border-2 border-purple-600 ${isDark ? "bg-[#151F28] text-gray-200" : "bg-white text-gray-800"
                }`}
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-200">
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>

        </div>
      </div>

      {/* Content grid: cover art (left) + track info (right) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cover Art */}
        <div
          className={`rounded-lg p-4 ${isDark ? "bg-[#151F28] border border-gray-700" : "bg-white border border-gray-200"
            }`}
        >
          <p className={`font-medium mb-3 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
            Cover Art
          </p>

          <div
            className={`rounded-lg p-6 flex flex-col items-center justify-center text-center border-2 border-dashed h-64 ${isDark ? "border-gray-700 bg-transparent" : "border-gray-200 bg-white"
              }`}
          >
            {coverArt ? (
              <img
                src={URL.createObjectURL(coverArt)}
                alt="cover preview"
                className="max-h-full max-w-full object-contain rounded"
              />
            ) : (
              <>
                <div
                  className={`w-20 h-20 rounded-md flex items-center justify-center mb-4 ${isDark ? "bg-gray-800" : "bg-gray-100"
                    }`}
                >
                  {/* simple music icon placeholder (text) */}
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    <path d="M9 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M9 14V5l10-2v9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-1`}>
                  Upload Cover Art
                </p>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                  3000x3000px, JPG/PNG
                </p>
              </>
            )}

            {/* file input (styled) */}
            <label
              className={`mt-4 inline-flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer ${isDark
                  ? "bg-transparent border border-gray-700 text-gray-200"
                  : "bg-white border border-gray-200 text-gray-800"
                }`}
            >
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleCoverArtUpload}
                className="hidden"
              />
              <span className="text-sm">Upload</span>
            </label>

            <div className="w-full flex justify-center mt-3">
              <Button className="px-4 py-1 rounded-full bg-purple-600 hover:bg-purple-700 text-white">
                Edit Image
              </Button>
            </div>
          </div>
        </div>

        {/* Track Information */}
        <div
          className={`md:col-span-2 rounded-lg p-6 ${isDark ? "bg-[#151F28] border border-gray-700" : "bg-white border border-gray-200"
            }`}
        >
          <p className={`font-medium mb-4 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
            Track Information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Release Name (span two cols on larger screens) */}
            <div className="md:col-span-2">
              <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Release Name
              </label>
              <Input
                placeholder="Enter track title"
                value={releaseData.releaseName}
                onChange={(e) => handleChange("releaseName", e.target.value)}
                className={`w-full rounded-md ${isDark ? "bg-[#0f1724] border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-900"}`}
              />
            </div>

            {/* Genre select */}
            <div>
              <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Genre
              </label>
              <Select onValueChange={(v) => handleChange("genre", v)}>
                <SelectTrigger
                  className={`w-full ${isDark ? "bg-[#0f1724] border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-800"} rounded-md`}
                >
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent className={`${isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
                  <SelectItem value="Pop">Pop</SelectItem>
                  <SelectItem value="Rock">Rock</SelectItem>
                  <SelectItem value="Hip Hop">Hip Hop</SelectItem>
                  <SelectItem value="Electronic">Electronic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Label Name (full width under Release Name on large screens) */}
            <div className="md:col-span-3">
              <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Label name
              </label>
              <Input
                placeholder="Enter label name"
                value={releaseData.labelName}
                onChange={(e) => handleChange("labelName", e.target.value)}
                className={`w-full rounded-md ${isDark ? "bg-[#0f1724] border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-900"}`}
              />
            </div>

            {/* UPC */}
            <div className="md:col-span-3">
              <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                UPC
              </label>
              <Input
                placeholder="Enter UPC"
                value={releaseData.upc}
                onChange={(e) => handleChange("upc", e.target.value)}
                className={`w-full rounded-md ${isDark ? "bg-[#0f1724] border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-900"}`}
              />
            </div>
          </div>
        </div>
      </div>

      <AudioUploadSection theme={theme} onAudioChange={(payload) => {

      }} />



      {/* Step 3 Section */}
      <div
        className={`rounded-lg p-6 ${isDark ? "bg-[#151F28] border border-gray-700" : "bg-white border border-gray-200"
          }`}
      >
        <h2 className="text-lg font-medium mb-4">Step 3</h2>

        <div className="space-y-4">
          {/* Release Date */}
          <div>
            <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Release Date
            </label>
            <Input
              placeholder="Enter release date"
              // type="date" if you want a datepicker
              className={`w-full rounded-md ${isDark
                  ? "bg-[#0f1724] border border-gray-700 text-gray-200"
                  : "bg-white border border-gray-200 text-gray-900"
                }`}
            />
          </div>

          {/* Stores */}
          <div>
            <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Stores
            </label>
            <Input
              placeholder="Enter store names"
              className={`w-full rounded-md ${isDark
                  ? "bg-[#0f1724] border border-gray-700 text-gray-200"
                  : "bg-white border border-gray-200 text-gray-900"
                }`}
            />
          </div>

          {/* Approve / Reject Buttons */}
          <div className="flex justify-center items-center gap-3 pt-4">
            {/* Approve */}
            <Button

              onClick={onBack}

              className="flex items-center gap-2 px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white">
              ✓ Approve
            </Button>

            {/* Rejection Reason Dropdown */}
            <Select>
              <SelectTrigger
                className={`w-56 rounded-md px-4 py-2 text-sm border ${isDark
                    ? "bg-[#151F28] border-red-500 text-gray-200"
                    : "bg-white border-red-500 text-gray-800"
                  }`}
              >
                <SelectValue placeholder="Rejection Reason" />
              </SelectTrigger>
              <SelectContent className={isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}>
                <SelectItem value="blurry">Cover art blurry</SelectItem>
                <SelectItem value="links">Links written in cover art</SelectItem>
                <SelectItem value="silence-end">Audio has silence in end</SelectItem>
                <SelectItem value="silence-start">Audio has silence in start</SelectItem>
              </SelectContent>
            </Select>

            {/* Reject */}
            <Button className="flex items-center gap-2 px-6 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white">
              ✕ Reject
            </Button>
          </div>

        </div>
      </div>


    </div>
  );
}
