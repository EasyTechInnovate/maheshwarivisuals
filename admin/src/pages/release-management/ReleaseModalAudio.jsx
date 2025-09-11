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

export default function AudioUploadSection({ theme = "dark", onAudioChange }) {
  const isDark = theme === "dark";

  const [audioFile, setAudioFile] = useState(null);
  const [audioInfo, setAudioInfo] = useState({
    songName: "",
    genre: "",
    singerName: "",
    composerName: "",
    lyricistName: "",
    producerName: "",
    isrc: "",
    previewTiming: "",
    trackOption: "",
  });

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setAudioFile(f);
    if (typeof onAudioChange === "function") onAudioChange({ file: f, info: audioInfo });
  };

  const handleInfoChange = (key, value) => {
    setAudioInfo((prev) => {
      const next = { ...prev, [key]: value };
      if (typeof onAudioChange === "function") onAudioChange({ file: audioFile, info: next });
      return next;
    });
  };

  return (
    <div className="w-full">
      {/* grid matches cover-art layout: left upload card + right info (md: 1 / 2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Audio Upload Card (left) */}
        <div
          className={`rounded-lg p-4 ${
            isDark ? "bg-[#151F28] border border-gray-700" : "bg-white border border-gray-200"
          }`}
        >
          <p className={`font-medium mb-3 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
            Audio File
          </p>

          <div
            className={`rounded-lg p-6 flex flex-col items-center justify-center text-center border-2 border-dashed h-64 ${
              isDark ? "border-gray-700 bg-transparent" : "border-gray-200 bg-white"
            }`}
          >
            {audioFile ? (
              <>
                <div className="w-full">
                  <audio controls src={URL.createObjectURL(audioFile)} className="w-full" />
                </div>

                <div className="w-full flex items-center justify-between mt-3">
                  <div className="text-sm truncate max-w-[65%]">
                    <span className={`${isDark ? "text-gray-200" : "text-gray-800"} font-medium`}>
                      {audioFile.name}
                    </span>
                    <div className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {Math.round(audioFile.size / 1024)} KB
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button className="px-4 py-1 rounded-full bg-purple-600 hover:bg-purple-700 text-white">
                      Edit Audio
                    </Button>
                    <button
                      onClick={() => {
                        setAudioFile(null);
                        if (typeof onAudioChange === "function") onAudioChange({ file: null, info: audioInfo });
                      }}
                      className="text-xs text-gray-400 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={`w-20 h-20 rounded-md flex items-center justify-center mb-4 ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    <path d="M9 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M9 14V5l10-2v9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-1`}>Upload Audio File</p>
                <p className="text-xs mb-3">
                  <span className={`${isDark ? "text-gray-500" : "text-gray-500"}`}>Accepted: MP3, WAV</span>
                </p>

                <label
                  className={`inline-flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer ${
                    isDark ? "bg-transparent border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  <input
                    type="file"
                    accept="audio/mpeg, audio/wav, audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="text-sm">Upload</span>
                </label>
              </>
            )}

            <div className="w-full flex justify-center mt-3">
              <Button className="px-4 py-1 rounded-full bg-purple-600 hover:bg-purple-700 text-white">
                Edit Audio
              </Button>
            </div>
          </div>
        </div>

        {/* Audio Info (right, spans 2 cols on md) */}
        <div
          className={`md:col-span-2 rounded-lg p-6 ${
            isDark ? "bg-[#151F28] border border-gray-700" : "bg-white border border-gray-200"
          }`}
        >
          <p className={`font-medium mb-4 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
            Audio Information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Row 1 */}
            <div>
              <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>Song Name</label>
              <Input
                placeholder="Enter song name"
                value={audioInfo.songName}
                onChange={(e) => handleInfoChange("songName", e.target.value)}
                className={`w-full rounded-md ${isDark ? "bg-[#0f1724] border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-900"}`}
              />
            </div>

            <div>
              <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>Genre</label>
              <Select onValueChange={(v) => handleInfoChange("genre", v)}>
                <SelectTrigger className={`w-full ${isDark ? "bg-[#0f1724] border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-800"} rounded-md`}>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent className={`${isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"}`}>
                  <SelectItem value="Pop">Pop</SelectItem>
                  <SelectItem value="Rock">Rock</SelectItem>
                  <SelectItem value="Hip Hop">Hip Hop</SelectItem>
                  <SelectItem value="Electronic">Electronic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>Singer Name</label>
              <Input
                placeholder="Enter singer name"
                value={audioInfo.singerName}
                onChange={(e) => handleInfoChange("singerName", e.target.value)}
                className={`w-full rounded-md ${isDark ? "bg-[#0f1724] border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-900"}`}
              />
            </div>

            {/* Row 2 */}
            <div>
              <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>Composer Name</label>
              <Input
                placeholder="Enter composer name"
                value={audioInfo.composerName}
                onChange={(e) => handleInfoChange("composerName", e.target.value)}
                className={`w-full rounded-md ${isDark ? "bg-[#0f1724] border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-900"}`}
              />
            </div>

            <div>
              <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>Lyricist Name</label>
              <Input
                placeholder="Enter lyricist name"
                value={audioInfo.lyricistName}
                onChange={(e) => handleInfoChange("lyricistName", e.target.value)}
                className={`w-full rounded-md ${isDark ? "bg-[#0f1724] border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-900"}`}
              />
            </div>

            <div>
              <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>Producer Name</label>
              <Input
                placeholder="Enter producer name"
                value={audioInfo.producerName}
                onChange={(e) => handleInfoChange("producerName", e.target.value)}
                className={`w-full rounded-md ${isDark ? "bg-[#0f1724] border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-900"}`}
              />
            </div>

            {/* Row 3 */}
            <div>
              <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>ISRC</label>
              <Input
                placeholder="Enter ISRC"
                value={audioInfo.isrc}
                onChange={(e) => handleInfoChange("isrc", e.target.value)}
                className={`w-full rounded-md ${isDark ? "bg-[#0f1724] border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-900"}`}
              />
            </div>

            <div>
              <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>Preview/Callertune timing</label>
              <Input
                placeholder="Enter preview timing"
                value={audioInfo.previewTiming}
                onChange={(e) => handleInfoChange("previewTiming", e.target.value)}
                className={`w-full rounded-md ${isDark ? "bg-[#0f1724] border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-900"}`}
              />
            </div>

            <div>
              <label className={`text-xs mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>Track Option</label>
              <Input
                placeholder="Enter track option"
                value={audioInfo.trackOption}
                onChange={(e) => handleInfoChange("trackOption", e.target.value)}
                className={`w-full rounded-md ${isDark ? "bg-[#0f1724] border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-900"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
