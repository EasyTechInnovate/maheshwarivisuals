// // SocialLinks.jsx
// import { useEffect, useState } from "react";
// import {
//   Instagram,
//   Facebook,
//   Linkedin,
//   Twitter,
//   Youtube,
//   Globe,
//   ExternalLink,
//   CheckCircle,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const iconMap = {
//   instagram: Instagram,
//   facebook: Facebook,
//   linkedin: Linkedin,
//   twitter: Twitter,
//   youtube: Youtube,
//   website: Globe,
// };

// export default function SocialLinksEditor({ theme = "dark", data = {}, onChange }) {
//   const isDark = theme === "dark";

//   // local copy to allow editing before parent receives updates
//   const [links, setLinks] = useState([
//     { id: "instagram", name: "Instagram", type: "instagram", url: "" },
//     { id: "facebook", name: "Facebook", type: "facebook", url: "" },
//     { id: "linkedin", name: "LinkedIn", type: "linkedin", url: "" },
//     { id: "twitter", name: "X (Twitter)", type: "x", url: "" },
//     { id: "youtube", name: "YouTube", type: "youtube", url: "" },
//     { id: "website", name: "Website", type: "website", url: "" },
//   ]);
//   const [youtubeLinks, setYoutubeLinks] = useState([]);

//   // populate from parent data when it changes
//  useEffect(() => {
//   if (!data) return;

//   // prevent re-render if nothing changed
//   setLinks((prev) => {
//     const newLinks = prev.map((l) => ({
//       ...l,
//       url: data?.[l.type] ?? data?.[l.id] ?? "",
//     }));
//     const changed = JSON.stringify(newLinks) !== JSON.stringify(prev);
//     return changed ? newLinks : prev;
//   });

//   setYoutubeLinks((prev) => {
//     const newArr = (data?.youtubeLinks || []).map((y, i) => ({
//       id: y.id ?? `yt-${i}`,
//       label: y.title ?? y.label ?? `Channel ${i + 1}`,
//       url: y.url ?? y.value ?? "",
//     }));
//     const changed = JSON.stringify(newArr) !== JSON.stringify(prev);
//     return changed ? newArr : prev;
//   });
// }, [data]);

//   // when local link changes, update parent immediately
//   const updateLink = (id, newUrl) => {
//     setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, url: newUrl } : l)));
//     // send update for that socialMedia key
//     if (onChange) onChange(id === "x" ? "x" : id, newUrl);
//   };

//   const updateYoutubeLink = (id, newUrl) => {
//     setYoutubeLinks((prev) => prev.map((v) => (v.id === id ? { ...v, url: newUrl } : v)));
//     const newArr = youtubeLinks.map((v) => (v.id === id ? { ...v, url: newUrl } : v));
//     if (onChange) onChange("youtubeLinks", newArr);
//   };

//   // Add a new youtube link
//   const addYoutube = () => {
//     const item = { id: `yt-${Date.now()}`, label: "New Channel", url: "" };
//     const newArr = [...youtubeLinks, item];
//     setYoutubeLinks(newArr);
//     if (onChange) onChange("youtubeLinks", newArr);
//   };

//   // Remove youtube link
//   const removeYoutube = (id) => {
//     const newArr = youtubeLinks.filter((y) => y.id !== id);
//     setYoutubeLinks(newArr);
//     if (onChange) onChange("youtubeLinks", newArr);
//   };

//   return (
//     <div className={`p-6 ${isDark ? "bg-[#111A22] text-white" : "bg-gray-50 text-[#111A22]"}`}>
//       {/* Header */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
//         <div>
//           <h2 className="text-xl font-semibold">Social Links</h2>
//           <p className="text-gray-400 text-sm">Manage social media links and website URLs</p>
//         </div>
//         {/* global Save button removed — parent has Save All */}
//       </div>

//       {/* Social Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         {links.map((link) => {
//           const Icon = iconMap[link.type.toLowerCase()];
//           return (
//             <div key={link.id} className={`${isDark ? "bg-[#151F28] border-gray-700" : "bg-white border-gray-200"} rounded-xl border shadow p-5 flex flex-col gap-3`}>
//               <div className="flex items-center gap-3">
//                 <div className={`h-10 w-10 flex items-center justify-center rounded-full ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
//                   {Icon && <Icon className="h-6 w-6 text-purple-500" />}
//                 </div>
//                 <div className="flex flex-col">
//                   <span className={`font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>{link.name}</span>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-xs text-gray-400">URL</label>
//                 <div className="flex items-center gap-2 mt-1">
//                   <input
//                     type="text"
//                     value={link.url}
//                     onChange={(e) => updateLink(link.id, e.target.value)}
//                     className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDark ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"}`}
//                   />
//                   {link.url && (
//                     <a href={link.url} target="_blank" rel="noopener noreferrer">
//                       <button className={`p-2 rounded-md ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}>
//                         <ExternalLink size={16} />
//                       </button>
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* YouTube Links */}
//       <div className={`${isDark ? "bg-[#151F28] border-gray-700" : "bg-white border-gray-200"} rounded-xl border shadow p-5`}>
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="text-lg font-semibold">YouTube Links</h3>
//           <Button size="sm" onClick={addYoutube}>Add Channel</Button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {youtubeLinks.map((video) => (
//             <div key={video.id} className="flex flex-col gap-2">
//               <div className="flex justify-between items-center">
//                 <label className="text-xs text-gray-400">{video.label}</label>
//                 <button className="text-xs" onClick={() => removeYoutube(video.id)}>Remove</button>
//               </div>
//               <input
//                 type="text"
//                 value={video.url}
//                 onChange={(e) => updateYoutubeLink(video.id, e.target.value)}
//                 className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDark ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"}`}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
