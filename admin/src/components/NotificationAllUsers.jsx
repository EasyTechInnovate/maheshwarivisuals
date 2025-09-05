export default function AllUsers({ theme, users }) {
  const statusColors = {
    Active: "bg-purple-600 text-white",
    Away: "bg-yellow-500 text-white",
    Inactive: "bg-gray-500 text-white",
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`${
        isDark ? "bg-[#151F28]" : "bg-white"
      } rounded-2xl p-6 shadow`}
    >
      <h3 className="text-lg font-semibold mb-4">All Users</h3>

      {/* Scroll container */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="min-w-full text-sm">
          <thead
            className={`border-b ${
              isDark ? "text-gray-400 border-gray-700" : "text-gray-600 border-gray-300"
            }`}
          >
            <tr>
              <th className="py-2 px-3 text-left">Member</th>
              <th className="py-2 px-3 text-left">Phone</th>
              <th className="py-2 px-3 text-left">Subscription</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-left">Join Date</th>
              <th className="py-2 px-3 text-left">Last Active</th>
              <th className="py-2 px-3 text-left">Actions</th>
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
                <td className="py-2 px-3">
                  {u.name}
                  <br />
                  <span className="text-xs text-gray-400">{u.email}</span>
                </td>
                <td className="px-3">{u.phone}</td>
                <td className="px-3">{u.subscription}</td>
                <td className="px-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${statusColors[u.status]}`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-3">{u.joinDate}</td>
                <td className="px-3">{u.lastActive}</td>
               <td className="px-3 py-3 flex items-center gap-2">
  <button
  className={`px-3 py-1 rounded text-xs transition whitespace-nowrap ${
    isDark
      ? "bg-gray-700 hover:bg-gray-600 text-white"
      : "bg-gray-200 hover:bg-gray-300 text-black"
  }`}
>
  E-Mail
</button>

  <button
    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
  >
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
