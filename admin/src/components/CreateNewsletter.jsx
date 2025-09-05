import { useState } from "react";

export default function CreateNewsletter({ onSend }) {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    content: "",
    audience: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSend(form);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-5 space-y-4 flex-1">
      <h2 className="text-lg font-semibold">Create Newsletter</h2>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Enter newsletter title"
        className="w-full rounded-md p-2 bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="subject"
        value={form.subject}
        onChange={handleChange}
        placeholder="Email subject line"
        className="w-full rounded-md p-2 bg-gray-800 border border-gray-700"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Write your newsletter content..."
        rows={5}
        className="w-full rounded-md p-2 bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="audience"
        value={form.audience}
        onChange={handleChange}
        placeholder="Target Audience"
        className="w-full rounded-md p-2 bg-gray-800 border border-gray-700"
      />
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
        >
          Send Newsletter
        </button>
        <button className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-md">
          Schedule
        </button>
      </div>
    </div>
  );
}
