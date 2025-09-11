import { useState } from "react";
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Globe,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  socialLinks as mockSocialLinks,
  youtubeDashboardLinks as mockYoutubeLinks,
} from "./SocialLinksData";


const iconMap = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  website: Globe,
};

export default function SocialLinksEditor({ theme = "dark" }) {
  const isDark = theme === "dark";
  const [links, setLinks] = useState(mockSocialLinks);
  const [youtubeLinks, setYoutubeLinks] = useState(mockYoutubeLinks);

  const updateLink = (id, newUrl) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, url: newUrl } : link))
    );
  };

  const updateYoutubeLink = (id, newUrl) => {
    setYoutubeLinks((prev) =>
      prev.map((video) => (video.id === id ? { ...video, url: newUrl } : video))
    );
  };

  const saveLinks = () => {
    console.log("Saving social links:", links);
    console.log("Saving YouTube dashboard links:", youtubeLinks);
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Social Links Editor</h1>
          <p className="text-gray-400 text-sm">
            Manage social media links and website URLs for Maheshwari Visuals
          </p>
        </div>
        <Button
          onClick={saveLinks}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
        >
          Save Changes
        </Button>
      </div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {links.map((link) => {
          const Icon = iconMap[link.type.toLowerCase()];
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
                  <span
                    className={`font-medium ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {link.name}
                  </span>
                  {link.valid && (
                    <div className="flex items-center gap-1 text-green-400 text-xs mt-0.5">
                      <CheckCircle size={14} /> Valid
                    </div>
                  )}
                </div>
              </div>

              {/* Input */}
              <div>
                <label className="text-xs text-gray-400">URL</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => updateLink(link.id, e.target.value)}
                    className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDark
                        ? "bg-gray-800 text-gray-200"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  />
                  {link.url && (
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <button
                        className={`p-2 rounded-md ${
                          isDark
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
        <p className="text-sm text-gray-400 mb-4">
          This is how your social links will appear to users
        </p>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => {
            const Icon = iconMap[link.type.toLowerCase()];
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  isDark
                    ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
                    : "border-gray-200 bg-gray-100 hover:bg-gray-200"
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

      {/* YouTube Dashboard Section */}
      <div
        className={`${
          isDark ? "bg-[#151F28] border-gray-700" : "bg-white border-gray-200"
        } rounded-xl border shadow p-5`}
      >
        <h2 className="text-lg font-semibold mb-3">YouTube Link for Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {youtubeLinks.map((video) => (
            <div key={video.id} className="flex flex-col gap-2">
              <label className="text-xs text-gray-400">{video.label}</label>
              <input
                type="text"
                value={video.url}
                onChange={(e) => updateYoutubeLink(video.id, e.target.value)}
                className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDark
                    ? "bg-gray-800 text-gray-200"
                    : "bg-gray-100 text-gray-800"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
