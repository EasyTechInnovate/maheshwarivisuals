import { useEffect, useState } from "react";
import { fetchMerchData } from "./MerchStoreManagementData";
import { Search, Download, Check, X, Eye, Users, Clock, CheckCircle, } from "lucide-react";
import DesignRequestTable from "../../components/MerchRequestTable";

const statusColors = {
  Pending: "bg-yellow-900/30 text-yellow-400",
  Approved: "bg-green-900/30 text-green-400",
  "Under Review": "bg-blue-900/30 text-blue-400",
  Rejected: "bg-red-900/30 text-red-400",
};

export default function MerchStoreManagement({ theme }) {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("approval");

  // helpers for theme styling
  const boxBg =
    theme === "dark"
      ? "bg-[#151F28] border border-gray-800"
      : "bg-white border border-gray-200";
  const inputBg =
    theme === "dark"
      ? "bg-[#151F28] text-gray-200 border border-gray-700"
      : "bg-white text-gray-800 border border-gray-300";
  const softBtn =
    theme === "dark"
      ? "bg-gray-800 hover:bg-gray-700 text-white"
      : "bg-gray-200 hover:bg-gray-300 text-[#111A22]";

  useEffect(() => {
    const load = async () => {
      const res = await fetchMerchData();
      setData(res);
    };
    load();
  }, []);

  if (!data)
    return (
      <div
        className={`${
          theme === "dark"
            ? "text-gray-400 bg-gray-950"
            : "text-gray-700 bg-gray-100"
        } text-center p-10`}
      >
        Loading Merch Store Management...
      </div>
    );

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#111A22] text-white"
          : "bg-gray-100 text-black"
      } min-h-screen p-4 sm:p-6 rounded-2xl`}
    >
      <h1 className="text-2xl sm:text-2xl font-semibold mb-1">Merch Store Management</h1>
      <p className="text-gray-400 text-xs sm:text-sm mb-6">
        Manage merchandise store requests and approvals from users
      </p>

{/* Stats */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  {/* Total Requests */}
  <div className={`${boxBg} p-4 rounded-2xl shadow relative`}>
    <span className="absolute top-4 right-4 text-gray-400">
      <Users className="h-5 w-5" />
    </span>
    <p className="text-gray-400 text-sm">Total Requests</p>
    <p className="text-2xl font-bold">{data.stats.totalRequests}</p>
  </div>

  {/* Pending */}
  <div className={`${boxBg} p-4 rounded-2xl shadow relative`}>
    <span className="absolute top-4 right-4 text-yellow-400">
      <Clock className="h-5 w-5" />
    </span>
    <p className="text-gray-400 text-sm">Pending</p>
    <p className="text-2xl font-bold text-yellow-400">{data.stats.pending}</p>
  </div>

  {/* Approved */}
  <div className={`${boxBg} p-4 rounded-2xl shadow relative`}>
    <span className="absolute top-4 right-4 text-green-400">
      <CheckCircle className="h-5 w-5" />
    </span>
    <p className="text-gray-400 text-sm">Approved</p>
    <p className="text-2xl font-bold text-green-400">{data.stats.approved}</p>
  </div>

  {/* Under Review */}
  <div className={`${boxBg} p-4 rounded-2xl shadow relative`}>
    <span className="absolute top-4 right-4 text-blue-400">
      <Search className="h-5 w-5" />
    </span>
    <p className="text-gray-400 text-sm">Under Review</p>
    <p className="text-2xl font-bold text-blue-400">{data.stats.underReview}</p>
  </div>
</div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <div className={`${inputBg} flex items-center w-full sm:w-1/3 rounded-lg px-3 py-2`}>
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by user, product name, or description..."
            className="bg-transparent w-full text-sm outline-none placeholder:text-gray-400"
          />
        </div>
        <div className="flex items-center gap-3">
          <select className={`${inputBg} text-sm rounded-lg px-3 py-2`}>
            <option>All Status</option>
          </select>
          <select className={`${inputBg} text-sm rounded-lg px-3 py-2`}>
            <option>All Types</option>
          </select>
          <select className={`${inputBg} text-sm rounded-lg px-3 py-2`}>
            <option>All Priority</option>
          </select>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex ${theme === "dark" ? "border-gray-700" : "border-gray-300"} border-b mb-4`}>
        {["approval", "design", "listed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-purple-500 text-purple-500"
                : "text-gray-400"
            }`}
          >
            {tab === "approval"
              ? "Approval Request"
              : tab === "design"
              ? "Design Request"
              : "Listed Product"}
          </button>
        ))}
      </div>

      {/* Approval Request Table */}
      {activeTab === "approval" && (
        <div className={`${boxBg} overflow-x-auto rounded-2xl shadow`}>
          <table className="w-full text-sm">
            <thead
              className={`${
                theme === "dark" ? "bg-[#151F28]" : "bg-gray-100"
              } ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
            >
              <tr>
                <th className="px-4 py-3 text-left">Artist’s Label Name</th>
                <th className="px-4 py-3 text-left">Product Preferences</th>
                <th className="px-4 py-3 text-left">Marketing & Launch Plan</th>
                <th className="px-4 py-3 text-left">Channel</th>
                <th className="px-4 py-3 text-left">MMC Assist</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Submit Date</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.approvalRequests.map((req) => (
                <tr
                  key={req.id}
                  className={`${
                    theme === "dark" ? "border-gray-800" : "border-gray-200"
                  } border-t ${theme === "dark" ? "hover:bg-gray-800/40" : "hover:bg-gray-50"}`}
                >
                  <td className="px-4 py-3">{req.artist}</td>
                  <td className="px-4 py-3">{req.product}</td>
                  <td className="px-4 py-3">{req.marketingPlan}</td>
                  <td className="px-4 py-3">{req.channel}</td>
                  <td className="px-4 py-3">{req.mmcAssist}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${statusColors[req.status]}`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{req.date}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className={`${softBtn} px-2 py-1 rounded flex items-center gap-1 text-xs`}>
                      <Eye size={12} /> View
                    </button>
                    {req.status === "Pending" && (
                      <>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded flex items-center gap-1 text-xs">
                          <Check size={12} /> Accept
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded flex items-center gap-1 text-xs">
                          <X size={12} /> Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Design Request Table */}
      {activeTab === "design" && (
        <DesignRequestTable theme={theme} data={data.designRequests} />
      )}

      {/* Listed Product Placeholder */}
      {activeTab === "listed" && (
        <div className={`${boxBg} rounded-2xl p-6 text-center ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
          Listed Product Section (Figma design pending)
        </div>
      )}
    </div>
  );
}
