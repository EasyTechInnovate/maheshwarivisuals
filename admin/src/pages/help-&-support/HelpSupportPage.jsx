import { useState } from "react";
import { Search, Download, MessageSquare } from "lucide-react";
import HelpSupportData from "./Help&SupportData";

export default function HelpSupport({ theme = "dark" }) {
  const [tickets] = useState(HelpSupportData.tickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const cardClass = `${
    theme === "dark" ? "bg-[#151F28]" : "bg-white"
  } p-5 rounded-2xl shadow flex flex-col`;

  const textColors = theme === "dark"
    ? {
        primary: "text-white",
        secondary: "text-gray-400",
        muted: "text-gray-500",
      }
    : {
        primary: "text-black",
        secondary: "text-gray-600",
        muted: "text-gray-500",
      };

  const bgColors = theme === "dark"
    ? {
        input: "bg-gray-800 text-white",
        select: "bg-gray-800 text-white hover:bg-gray-700",
        button: "bg-gray-800 text-white hover:bg-gray-700",
        rowHover: "hover:bg-gray-800/40 border-gray-800",
      }
    : {
        input: "bg-gray-200 text-black",
        select: "bg-gray-200 text-black hover:bg-gray-300",
        button: "bg-gray-200 text-black hover:bg-gray-300",
        rowHover: "hover:bg-gray-100 border-gray-200",
      };

  const badgeColors = {
    category: {
      Technical: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      Billing: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
      Account: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
      Content: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
      General: "bg-gray-200 text-gray-600 dark:bg-gray-700/30 dark:text-gray-300",
    },
    priority: {
      High: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
      Medium: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
      Low: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
      Critical: "bg-red-200 text-red-700 dark:bg-red-800/40 dark:text-red-300",
    },
    status: {
      Open: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
      Pending: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
      Resolved: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
      Closed: "bg-gray-200 text-gray-600 dark:bg-gray-700/30 dark:text-gray-400",
    },
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || t.priority === priorityFilter;
    const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  return (
    <div
      className={`${
        theme === "dark" ? "bg-[#111A22] text-white" : "bg-gray-100 text-black"
      } min-h-screen p-4 sm:p-6 rounded-2xl`}
    >
      {/* Heading */}
      <h1 className={`text-xl sm:text-2xl font-bold mb-2 ${textColors.primary}`}>
        Help & Support (Tickets)
      </h1>
      <p className={`text-sm mb-6 ${textColors.secondary}`}>
        Manage support tickets with filters by status, priority, and user ID
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className={cardClass}>
          <p className={textColors.secondary}>Open Tickets</p>
          <p className="text-2xl font-bold text-red-400 mt-2">
            {HelpSupportData.stats.open}
          </p>
          <span className={`text-xs mt-1 ${textColors.muted}`}>
            Needs immediate attention
          </span>
        </div>
        <div className={cardClass}>
          <p className={textColors.secondary}>Pending</p>
          <p className="text-2xl font-bold text-yellow-400 mt-2">
            {HelpSupportData.stats.pending}
          </p>
          <span className={`text-xs mt-1 ${textColors.muted}`}>
            Awaiting response
          </span>
        </div>
        <div className={cardClass}>
          <p className={textColors.secondary}>Resolved</p>
          <p className="text-2xl font-bold text-green-400 mt-2">
            {HelpSupportData.stats.resolved}
          </p>
          <span className={`text-xs mt-1 ${textColors.muted}`}>
            Ready to close
          </span>
        </div>
        <div className={cardClass}>
          <p className={textColors.secondary}>Closed</p>
          <p className="text-2xl font-bold text-gray-400 mt-2">
            {HelpSupportData.stats.closed}
          </p>
          <span className={`text-xs mt-1 ${textColors.muted}`}>
            Completed tickets
          </span>
        </div>
      </div>

      {/* Search + Filters */}
      <div
        className={`${
          theme === "dark" ? "bg-[#151F28]" : "bg-white"
        } p-4 rounded-2xl shadow mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between`}
      >
        <div className={`flex items-center rounded-lg px-3 py-2 w-full sm:w-1/2 ${bgColors.input}`}>
          <Search
            className={`w-4 h-4 mr-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          />
          <input
            type="text"
            placeholder="Search by subject, user, ticket number..."
            className="bg-transparent text-sm focus:outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <select
            className={`text-sm rounded-lg px-3 py-2 ${bgColors.select}`}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Open</option>
            <option>Pending</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>

          <select
            className={`text-sm rounded-lg px-3 py-2 ${bgColors.select}`}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
            <option>Critical</option>
          </select>

          <select
            className={`text-sm rounded-lg px-3 py-2 ${bgColors.select}`}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>All</option>
            <option>Technical</option>
            <option>Billing</option>
            <option>Account</option>
            <option>Content</option>
            <option>General</option>
          </select>

          <button className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${bgColors.button}`}>
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        className={`${
          theme === "dark" ? "bg-[#151F28]" : "bg-white"
        } rounded-2xl shadow overflow-x-auto`}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className={theme === "dark" ? "text-gray-400 border-b border-gray-700" : "text-gray-600 border-b border-gray-200"}>
              <th className="text-left py-3 px-4">Ticket #</th>
              <th className="text-left py-3 px-4">User</th>
              <th className="text-left py-3 px-4">Subject</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-left py-3 px-4">Priority</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Assigned To</th>
              <th className="text-left py-3 px-4">Created</th>
              <th className="text-left py-3 px-4">Responses</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((t, i) => (
              <tr
                key={i}
                className={`last:border-none ${bgColors.rowHover}`}
              >
                <td className="py-3 px-4">{t.id}</td>
                <td className="py-3 px-4">
                  <div>
                    <p>{t.user}</p>
                    <p className={`text-xs ${textColors.secondary}`}>{t.email}</p>
                  </div>
                </td>
                <td className="py-3 px-4">{t.subject}</td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full ${
                      badgeColors.category[t.category] || "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {t.category}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full ${
                      badgeColors.priority[t.priority] || "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {t.priority}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full ${
                      badgeColors.status[t.status] || "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="py-3 px-4">{t.assignedTo}</td>
                <td className="py-3 px-4">{t.created}</td>
                <td className="py-3 px-4 flex items-center gap-1">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  {t.responses}
                </td>
                <td className="py-3 px-4">
                  <button className={`px-3 py-1 rounded-lg text-xs ${bgColors.button}`}>
                    View
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
 