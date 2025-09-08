export default function NotificationPreview({
  theme = "dark",
  notification = { title: "", message: "" },
}) {
  const bgCard = theme === "dark" ? "bg-[#151F28]" : "bg-white";
  const inner =
    theme === "dark"
      ? "bg-[#1C2833] border-gray-700"
      : "bg-gray-100 border-gray-300";

  return (
    <div className={`${bgCard} p-6 rounded-2xl shadow`}>
      <h3 className="text-lg font-semibold mb-1">Notification Preview</h3>
      <p className="text-gray-400 text-sm mb-4">
        Preview how your notification will appear
      </p>

      <div className={`${inner} p-4 rounded-xl border`}>
        <div className="flex justify-between items-center mb-2">
          <p className="font-medium">Maheshwari Visuals</p>
          <span className="text-xs text-gray-400">now</span>
        </div>

        <h4 className="font-semibold">
          {notification.title || "Notification Title"}
        </h4>
        <p className="text-gray-400 text-sm">
          {notification.message ||
            "Your notification message will appear here..."}
        </p>

        <div className="flex gap-3 mt-4">
          <button
            className={`${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-black"
            } px-3 py-1 rounded-lg text-sm`}
          >
            View
          </button>
          <button
            className={`${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-black"
            } px-3 py-1 rounded-lg text-sm`}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
