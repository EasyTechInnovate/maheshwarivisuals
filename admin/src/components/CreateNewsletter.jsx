import { useState } from "react";
import { Send } from "lucide-react";

export default function CreateNewsletter({ theme = "dark", onSend }) {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    content: "",
    audience: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => onSend?.(form);

  const bgCard = theme === "dark" ? "bg-[#151F28]" : "bg-white";
  const inputBg = theme === "dark" ? "bg-[#1C2833] text-white placeholder-gray-400" : "bg-white text-[#111A22] placeholder-gray-500";
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200";

  return (
    <div className={`${bgCard} rounded-xl p-6 space-y-4 shadow flex-1`}>
      <h2 className={`${theme === "dark" ? "text-white" : "text-[#111A22]"} text-lg font-semibold`}>Create Newsletter</h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Enter newsletter title"
        className={`w-full p-3 rounded-lg border ${border} ${inputBg} outline-none`}
      />

      <input
        name="subject"
        value={form.subject}
        onChange={handleChange}
        placeholder="Email subject line"
        className={`w-full p-3 rounded-lg border ${border} ${inputBg} outline-none`}
      />

      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Write your newsletter content..."
        rows={6}
        className={`w-full p-3 rounded-lg border ${border} ${inputBg} outline-none`}
      />

      <input
        name="audience"
        value={form.audience}
        onChange={handleChange}
        placeholder="Target Audience"
        className={`w-full p-3 rounded-lg border ${border} ${inputBg} outline-none`}
      />

      <div className="flex gap-3">
        <button onClick={handleSubmit} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
          <Send size={16} /> Send Newsletter
        </button>
        <button className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-[#111A22]"} px-4 py-2 rounded-lg border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
          Schedule
        </button>
      </div>
    </div>
  );
}
