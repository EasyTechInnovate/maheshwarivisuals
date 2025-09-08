import { useState } from "react";
import NewsletterData from "./NewsletterData";
import CreateNewsletter from "../../components/CreateNewsletter";
import NewsletterPreview from "../../components/NewsletterPreview";
import AllUsers from "../../components/NewsletterAllUsers";
import { Send, Users, Eye, MousePointer, Mail } from "lucide-react";

export default function Newsletter({ theme = "dark" }) {
  const [newsletter, setNewsletter] = useState({});

  const handleSend = (data) => setNewsletter(data);

  const cardClass = `${
    theme === "dark" ? "bg-[#151F28]" : "bg-white"
  } p-5 rounded-2xl shadow flex flex-col justify-between`;

  const StatBox = ({ label, value, change, icon, color }) => (
    <div className={cardClass}>
      <div className="flex items-center justify-between">
        <p
          className={`${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          } text-sm`}
        >
          {label}
        </p>
        <span
          className={`p-2 rounded-lg ${
            theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
          }`}
        >
          {icon}
        </span>
      </div>
      <div className="mt-3">
        <p
          className={`${
            theme === "dark" ? "text-white" : "text-gray-900"
          } text-2xl font-bold`}
        >
          {value}
        </p>
        {change && (
          <span
            className={`mt-2 inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
              change > 0
                ? color
                : "bg-red-900/30 text-red-400"
            }`}
          >
            {change > 0 ? `+${change}%` : `${change}%`}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen p-4 sm:p-6 rounded-2xl`}
    >
      {/* Top Heading + Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Newsletter</h1>
          <p className="text-sm text-gray-400">
            Create, manage, and analyze email newsletters for your subscribers
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto">
          <Send className="w-4 h-4" />
          New Newsletter
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatBox
          label="Total Subscribers"
          value={NewsletterData.stats.totalSubscribers.value.toLocaleString()}
          change={NewsletterData.stats.totalSubscribers.change}
          icon={<Users className="w-5 h-5" />}
          color="bg-green-900/30 text-green-400"
        />
        <StatBox
          label="Open Rate"
          value={`${NewsletterData.stats.openRate.value}%`}
          change={NewsletterData.stats.openRate.change}
          icon={<Eye className="w-5 h-5" />}
          color="bg-blue-900/30 text-blue-400"
        />
        <StatBox
          label="Click Rate"
          value={`${NewsletterData.stats.clickRate.value}%`}
          change={NewsletterData.stats.clickRate.change}
          icon={<MousePointer className="w-5 h-5" />}
          color="bg-purple-900/30 text-purple-400"
        />
        <StatBox
          label="Newsletters Sent"
          value={NewsletterData.stats.newslettersSent.value}
          change={NewsletterData.stats.newslettersSent.change}
          icon={<Mail className="w-5 h-5" />}
          color="bg-orange-900/30 text-orange-400"
        />
      </div>

      {/* Create + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CreateNewsletter theme={theme} onSend={handleSend} />
        <NewsletterPreview theme={theme} newsletter={newsletter} />
      </div>

      {/* All Users */}
      <AllUsers theme={theme} users={NewsletterData.users} />
    </div>
  );
}
