export default function NotificationPreview({
  theme = "dark",
  stats = [],                 // [{ label, value, change }, ...] 2 items
  notification = { title: "", message: "" },
}) {
  const bgCard = theme === "dark" ? "bg-[#151F28]" : "bg-white";
  const inner = theme === "dark" ? "bg-[#1C2833] border-gray-700" : "bg-gray-100 border-gray-300";

  return (
    <div className="space-y-6">
      {/* Top stats (exactly 2) */}
      <div className="grid grid-cols-2 gap-4">
        {stats.slice(0, 2).map((stat, i) => (
          <div key={i} className={`${bgCard} p-4 rounded-2xl shadow text-left`}>
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            {stat.change ? (
              <span
                className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full ${
                  String(stat.change).trim().startsWith("+")
                    ? "bg-green-900/30 text-green-400"
                    : "bg-red-900/30 text-red-400"
                }`}
              >
                {stat.change}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {/* Preview box */}
      <div className={`${bgCard} p-6 rounded-2xl shadow`}>
        <h3 className="text-lg font-semibold mb-1">Notification Preview</h3>
        <p className="text-gray-400 text-sm mb-4">Preview how your notification will appear</p>

        <div className={`${inner} p-4 rounded-xl border`}>
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">Maheshwari Visuals</p>
            <span className="text-xs text-gray-400">now</span>
          </div>

          <h4 className="font-semibold">{notification.title || "Notification Title"}</h4>
          <p className="text-gray-400 text-sm">
            {notification.message || "Your notification message will appear here..."}
          </p>

          <div className="flex gap-3 mt-4">
            <button className={`${theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-black"} px-3 py-1 rounded-lg text-sm`}>
              View
            </button>
            <button className={`${theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-black"} px-3 py-1 rounded-lg text-sm`}>
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
