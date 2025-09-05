export default function AllUsers({ users }) {
  return (
    <div className="bg-gray-900 rounded-xl p-5 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2">All Users</h2>
      <p className="text-sm text-gray-400 mb-4">Manage your users and their access levels</p>
      <table className="w-full border-collapse">
        <thead className="text-left text-gray-400">
          <tr>
            <th className="py-3">Member</th>
            <th className="py-3">Phone Number</th>
            <th className="py-3">Subscription Type</th>
            <th className="py-3">Status</th>
            <th className="py-3">Join Date</th>
            <th className="py-3">Last Active</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {users.map((user) => (
            <tr key={user.id} className="border-t border-gray-700">
              <td className="py-3">
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-gray-400 text-xs">{user.email}</span>
                </div>
              </td>
              <td>{user.phone}</td>
              <td>{user.subscription}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    user.status === "Active"
                      ? "bg-purple-600 text-white"
                      : user.status === "Away"
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-600 text-white"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td>{user.joinDate}</td>
              <td>{user.lastActive}</td>
              <td className="flex gap-2">
                <button className="bg-gray-700 px-3 py-1 rounded text-xs">E-Mail</button>
                <button className="bg-red-600 px-3 py-1 rounded text-xs">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
