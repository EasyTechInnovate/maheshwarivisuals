import { useState } from "react";
import NewsletterData from ".//NewsletterData";
import CreateNewsletter from "../../components/CreateNewsletter";
import NewsletterPreview from "../../components/NewsletterPreview";
import AllUsers from "../../components/NewsletterAllUsers";

export default function Newsletter() {
  const [newsletter, setNewsletter] = useState({});

  const handleSend = (data) => {
    setNewsletter(data);
  };

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 p-5 rounded-xl">
          <h3 className="text-gray-400 text-sm">Total Subscribers</h3>
          <p className="text-xl font-bold">{NewsletterData.stats.totalSubscribers}</p>
        </div>
        <div className="bg-gray-900 p-5 rounded-xl">
          <h3 className="text-gray-400 text-sm">Open Rate</h3>
          <p className="text-xl font-bold">{NewsletterData.stats.openRate}%</p>
        </div>
        <div className="bg-gray-900 p-5 rounded-xl">
          <h3 className="text-gray-400 text-sm">Click Rate</h3>
          <p className="text-xl font-bold">{NewsletterData.stats.clickRate}%</p>
        </div>
        <div className="bg-gray-900 p-5 rounded-xl">
          <h3 className="text-gray-400 text-sm">Newsletters Sent</h3>
          <p className="text-xl font-bold">{NewsletterData.stats.newslettersSent}</p>
        </div>
      </div>

      {/* Create + Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CreateNewsletter onSend={handleSend} />
        <NewsletterPreview newsletter={newsletter} />
      </div>

      {/* Users */}
      <AllUsers users={NewsletterData.users} />
    </div>
  );
}
