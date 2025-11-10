// components/company-settings/SocialLinks.jsx
"use client";
import { useMemo } from "react";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Globe,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/lib/GlobalApi";

// Inline SVG for Twitter/X icon
const TwitterSvg = ({ className = "h-6 w-6 text-purple-500" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2H21l-6.56 7.497L21.89 22H15.31l-4.55-6.015L5.57 22H3l7.003-8.002L2.5 2h6.77l4.093 5.514L18.244 2Zm-2.318 18.27h1.839L8.153 3.662H6.184l9.742 16.608Z" />
  </svg>
);

const iconMap = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: TwitterSvg,
  x: TwitterSvg,
  youtube: Youtube,
  website: Globe,
};

export default function SocialLinksEditor({
  theme = "dark",
  socialMedia = {},
  youtubeLinks = [],
  setSocialMedia = () => {},
  setYoutubeLinks = () => {},
  isEditing = false,
  onRefresh = () => {},
  companySettingsId, // ✅ FIXED: we receive it here
}) {
  const isDark = theme === "dark";

  // ----------------------------------------
  // ✅ SOCIAL LINKS MAPPING (UNCHANGED)
  // ----------------------------------------

  const links = useMemo(() => {
    const order = [
      { key: "instagram", name: "Instagram", guideline: "Use your official Instagram profile" },
      { key: "facebook", name: "Facebook", guideline: "Page or profile URL" },
      { key: "x", alias: "twitter", name: "X / Twitter", guideline: "Your X / Twitter profile" },
      { key: "linkedin", name: "LinkedIn", guideline: "Company LinkedIn page" },
      { key: "youtube", name: "YouTube", guideline: "Main YouTube channel or handle" },
      { key: "website", name: "Website", guideline: "Official website (include https://)" },
    ];

    return order.map((item) => {
      const url =
        socialMedia?.[item.key] ??
        (item.alias && socialMedia?.[item.alias]) ??
        "";

      return {
        id: item.key,
        name: item.name,
        type: item.key,
        url,
        guideline: item.guideline,
        valid: !!url,
      };
    });
  }, [socialMedia]);

  const updateLink = (id, newUrl) => {
    const key = id === "twitter" ? "x" : id;
    setSocialMedia({ [key]: newUrl });
  };

  // ----------------------------------------
  // ✅ YOUTUBE API FIXED (uses Mongo _id)
  // ----------------------------------------

  const handleAddLocalYouTubeField = () => {
  const newTemp = {
    _id: null,
    title: "New Music Channel",
    url: "",
    isNew: true,
  };
  setYoutubeLinks([...youtubeLinks, newTemp]);
};

// ---------------------------
// ✅ Save new or existing link
// ---------------------------
const handleSaveYouTubeLink = async (video, idx) => {
  try {
    if (video.isNew) {
      // ✅ New link → call add API
      await GlobalApi.addYouTubeLink(companySettingsId, {
        title: video.title,
        url: video.url,
      });
    } else {
      // ✅ Existing link → update whole array
      await GlobalApi.updateYouTubeLinks(companySettingsId, youtubeLinks);
    }

    onRefresh();
  } catch (err) {
    console.error("Save YouTube Error:", err);
  }
};

// ---------------------------
// ✅ Update field locally
// ---------------------------
const handleLocalUpdate = (idx, key, value) => {
  const updated = [...youtubeLinks];
  updated[idx][key] = value;
  setYoutubeLinks(updated);
};

// ---------------------------
// ✅ Delete (temp or real)
// ---------------------------
const handleDeleteYouTubeLink = async (idx) => {
  const target = youtubeLinks[idx];

  try {
    if (target.isNew) {
      // ✅ Just remove locally
      const arr = youtubeLinks.filter((_, i) => i !== idx);
      setYoutubeLinks(arr);
      return;
    }

    // ✅ Existing link → delete API
    await GlobalApi.deleteYouTubeLink(companySettingsId, target._id);

    onRefresh();
  } catch (err) {
    console.error("Delete YouTube Error:", err);
  }
};

  // ----------------------------------------
  // ✅ UI (UNCHANGED)
  // ----------------------------------------

  return (
    <div
      className={`min-h-screen p-6 ${
        isDark ? "bg-[#111A22] text-white" : "bg-gray-50 text-[#111A22]"
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Social Links Editor</h1>
          <p className="text-gray-400 text-sm">
            Manage social media links and website URLs for your company
          </p>
        </div>
      </div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {links.map((link) => {
          const Icon = iconMap[(link.type || "").toLowerCase()];
          return (
            <div
              key={link.id}
              className={`${
                isDark ? "bg-[#151F28] border-gray-700" : "bg-white border-gray-200"
              } rounded-xl border shadow p-5 flex flex-col gap-3`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 flex items-center justify-center rounded-full ${
                    isDark ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  {Icon && <Icon className="h-6 w-6 text-purple-500" />}
                </div>
                <div className="flex flex-col">
                  <span className={`font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                    {link.name}
                  </span>
                  {link.valid && (
                    <div className="flex items-center gap-1 text-green-400 text-xs mt-0.5">
                      <CheckCircle size={14} /> Valid
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400">URL</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => updateLink(link.id, e.target.value)}
                    disabled={!isEditing}
                    className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDark ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
                    } ${!isEditing ? "opacity-70 cursor-not-allowed" : ""}`}
                  />
                  {link.url && (
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <button
                        className={`p-2 rounded-md ${
                          isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        <ExternalLink size={16} />
                      </button>
                    </a>
                  )}
                </div>
              </div>

              <span className="text-xs text-gray-500">{link.guideline}</span>
            </div>
          );
        })}
      </div>

      {/* Preview Section */}
      <div
        className={`${
          isDark ? "bg-[#151F28] border-gray-700" : "bg-white border-gray-200"
        } rounded-xl border shadow p-5 mb-8`}
      >
        <h2 className="text-lg font-semibold mb-3">Preview</h2>
        <p className="text-sm text-gray-400 mb-4">This is how your social links will appear to users</p>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => {
            const Icon = iconMap[(link.type || "").toLowerCase()];
            return (
              <a
                key={link.id}
                href={link.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  isDark ? "border-gray-700 bg-gray-800 hover:bg-gray-700" : "border-gray-200 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {Icon && <Icon size={16} />}
                {link.name}
                <ExternalLink size={14} />
              </a>
            );
          })}
        </div>
      </div>

   
<div
  className={`${
    isDark ? "bg-[#151F28] border-gray-700" : "bg-white border-gray-200"
  } rounded-xl border shadow p-5`}
>
  <h2 className="text-lg font-semibold mb-3">YouTube Link for Dashboard</h2>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {youtubeLinks.map((video, idx) => (
    <div key={idx} className="flex flex-col gap-2 p-3 rounded-lg">
      
      {/* ✅ TITLE — Label normally, input only in editing mode */}
      {!isEditing ? (
        <label className="text-xs text-gray-400">
          {video.title}
        </label>
      ) : (
        <input
          type="text"
          value={video.title}
          onChange={(e) => handleLocalUpdate(idx, "title", e.target.value)}
          className={`rounded-md px-3 py-2 text-sm 
            ${isDark ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"}
          `}
        />
      )}

      {/* ✅ URL FIELD (readonly when NOT editing) */}
      <input
        type="text"
        value={video.url}
        onChange={(e) => handleLocalUpdate(idx, "url", e.target.value)}
        disabled={!isEditing}
        className={`rounded-md px-3 py-2 text-sm 
          ${isDark ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"}
          ${!isEditing ? "opacity-70 cursor-not-allowed" : ""}
        `}
      />

      {/* ✅ ACTION BUTTONS ONLY IN EDIT MODE */}
      {isEditing && (
        <div className="flex gap-2">
          <button
            onClick={() => handleSaveYouTubeLink(video, idx)}
            className="px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-xs"
          >
            Update
          </button>

          <button
            onClick={() => handleDeleteYouTubeLink(idx)}
            className="px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  ))}
</div>


  {isEditing && (
    <div className="mt-4 flex gap-2">
      <Button size="sm" onClick={handleAddLocalYouTubeField}>
        + Add YouTube Link
      </Button>
    </div>
  )}
</div>

    </div>
  );
}
