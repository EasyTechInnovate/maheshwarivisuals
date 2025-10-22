import { useState } from "react";

export default function ComposeNotification({
  theme = "dark",
  onCompose = () => {},
}) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("");
  const [type, setType] = useState("");

  const bgCard = theme === "dark" ? "bg-[#151F28]" : "bg-white";
  const border = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const placeholder =
    theme === "dark" ? "placeholder-gray-500" : "placeholder-gray-400";

  const handleSendNow = () =>
    onCompose({ title, message, audience, type, when: "now" });
  const handleSchedule = () =>
    onCompose({ title, message, audience, type, when: "scheduled" });

  return (
    <div className={`${bgCard} p-6 rounded-2xl shadow`}>
      <h3 className="text-lg font-semibold mb-1">Compose Notification</h3>
      <p className="text-gray-400 text-sm mb-4">
        Create and send notifications to users
      </p>

      <input
        type="text"
        placeholder="Enter notification title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`w-full p-3 mb-4 rounded-lg bg-transparent border ${border} ${placeholder} outline-none`}
      />

      <textarea
        placeholder="Enter your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`w-full p-3 mb-4 rounded-lg bg-transparent border ${border} ${placeholder} outline-none h-32`}
      />

      <select
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        className={`w-full p-3 mb-4 rounded-lg bg-transparent border ${border} outline-none`}
      >
        <option value="">Select audience</option>
        <option value="all">All Users</option>
        <option value="active">Active Users</option>
        <option value="inactive">Inactive Users</option>
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className={`w-full p-3 mb-6 rounded-lg bg-transparent border ${border} outline-none`}
      >
        <option value="">Select type</option>
        <option value="general">General</option>
        <option value="promo">Promotional</option>
        <option value="update">Update</option>
      </select>

      <div className="flex gap-4">
        <button
          onClick={handleSendNow}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl"
        >
          🚀 Send Now
        </button>
        <button
          onClick={handleSchedule}
          className={`flex-1 ${
            theme === "dark"
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-200 hover:bg-gray-300"
          } text-${theme === "dark" ? "white" : "black"} py-2.5 rounded-xl`}
        >
          ⏰ Schedule
        </button>
      </div>
    </div>
  );
}
