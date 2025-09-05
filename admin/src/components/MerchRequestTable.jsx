import { Eye, Check, X } from "lucide-react";

const statusColors = {
  Pending: "bg-yellow-900/30 text-yellow-400",
  Approved: "bg-green-900/30 text-green-400",
  "Under Review": "bg-blue-900/30 text-blue-400",
  Rejected: "bg-red-900/30 text-red-400",
};

const priorityColors = {
  High: "bg-red-900/30 text-red-400",
  Medium: "bg-yellow-900/30 text-yellow-400",
  Low: "bg-blue-900/30 text-blue-400",
};

export default function DesignRequestTable({ theme, data }) {
  const boxBg =
    theme === "dark"
      ? "bg-[#151F28] border border-gray-800"
      : "bg-white border border-gray-200";
  const softBtn =
    theme === "dark"
      ? "bg-gray-800 hover:bg-gray-700 text-white"
      : "bg-gray-200 hover:bg-gray-300 text-gray-900";

  return (
    <div className={`${boxBg} overflow-x-auto rounded-2xl shadow`}>
      <table className="w-full text-sm">
        <thead
          className={`${
            theme === "dark" ? "bg-[#151F28] text-gray-400" : "bg-gray-100 text-gray-600"
          }`}
        >
          <tr>
            <th className="px-4 py-3 text-left">Request ID</th>
            <th className="px-4 py-3 text-left">User</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">Priority</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Submit Date</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((req) => (
            <tr
              key={req.id}
              className={`${
                theme === "dark" ? "border-gray-800" : "border-gray-200"
              } border-t ${theme === "dark" ? "hover:bg-gray-800/40" : "hover:bg-gray-50"}`}
            >
              <td className="px-4 py-3 font-medium">{req.id}</td>
              <td className="px-4 py-3">{req.user}</td>
              <td className="px-4 py-3">{req.type}</td>
              <td className="px-4 py-3">{req.product}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[req.priority]}`}>
                  {req.priority}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 text-xs rounded-full ${statusColors[req.status]}`}>
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
  );
}
