export default function AllUsers({ theme = "dark", users = [] }) {
  const isDark = theme === "dark";

  const statusColors = {
    Active: "bg-purple-600 text-white",
    Away: "bg-yellow-600 text-white",
    Inactive: "bg-gray-500 text-white",
  };

  return (
    <div
      className={`${
        isDark ? "bg-[#151F28]" : "bg-white"
      } rounded-xl p-4 sm:p-6 shadow`}
    >
      <h2 className={`${isDark ? "text-white" : "text-gray-900"} text-lg font-semibold mb-2`}>
        All Users
      </h2>
      <p className="text-sm text-gray-400 mb-4">
        Manage your users and their access levels
      </p>

      {/* Scrollable Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead
            className={`${
              isDark
                ? "text-gray-400 border-b border-gray-700"
                : "text-gray-600 border-b border-gray-200"
            }`}
          >
            <tr>
              <th className="py-3 px-3 text-left">Member</th>
              <th className="py-3 px-3 text-left">Phone</th>
              <th className="py-3 px-3 text-left">Subscription</th>
              <th className="py-3 px-3 text-left">Status</th>
              <th className="py-3 px-3 text-left">Join Date</th>
              <th className="py-3 px-3 text-left">Last Active</th>
              <th className="py-3 px-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className={`border-b ${
                  isDark ? "border-gray-800" : "border-gray-200"
                }`}
              >
                <td className="py-3 px-3">
                  <div className="flex flex-col">
                    <span
                      className={`${
                        isDark ? "text-white" : "text-gray-900"
                      } font-medium`}
                    >
                      {u.name}
                    </span>
                    <span className="text-xs text-gray-400">{u.email}</span>
                  </div>
                </td>
                <td className={`${isDark ? "text-gray-200" : "text-gray-700"} px-3`}>
                  {u.phone}
                </td>
                <td className={`${isDark ? "text-gray-200" : "text-gray-700"} px-3`}>
                  {u.subscription}
                </td>
                <td className="px-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      statusColors[u.status] || "bg-gray-600 text-white"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className={`px-3 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                  {u.joinDate}
                </td>
                <td className={`px-3 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                  {u.lastActive}
                </td>
                <td className="px-3 py-3 flex items-center gap-2">
                  <button
  className={`${
    isDark
      ? "bg-gray-700 text-white hover:bg-gray-600"
      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
  } px-3 py-1 rounded text-xs whitespace-nowrap`}
>
  E-Mail
</button>

                  <button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
