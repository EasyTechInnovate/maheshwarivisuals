import { Button } from "@/components/ui/button";

export default function SubscriberTable({ isDark }) {
  const subscribers = [
    {
      id: 1,
      name: "DJ Melody",
      phone: "7668009623",
      type: "Base",
      amount: "₹234.56",
      dueDate: "2024-02-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Sound Wave",
      phone: "7668009623",
      type: "Pro",
      amount: "₹567.89",
      dueDate: "2024-02-10",
      status: "Active",
    },
    {
      id: 3,
      name: "Rhythm Master",
      phone: "7668009623",
      type: "Pro",
      amount: "₹123.45",
      dueDate: "2024-02-20",
      status: "Ending",
    },
    {
      id: 4,
      name: "Bass Line",
      phone: "7668009623",
      type: "Base",
      amount: "₹345.67",
      dueDate: "2024-02-12",
      status: "Approved",
    },
  ];

  return (
    <div
      className={`rounded-lg p-4 ${
        isDark ? "bg-[#151F28] text-gray-200" : "bg-white text-[#151F28]"
      }`}
    >
      <h2 className="text-lg font-semibold mb-1">Subscription Plans Management</h2>
      <p className="text-sm mb-4 text-gray-400">
        Requests awaiting approval and processing
      </p>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr
              className={`${
                isDark ? "bg-gray-800" : "bg-gray-100"
              } text-left`}
            >
              <th className="px-4 py-2">Account Name</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Subscription Type</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Due Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr
                key={sub.id}
                className={`border-t ${
                  isDark ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <td className="px-4 py-2">{sub.name}</td>
                <td className="px-4 py-2">{sub.phone}</td>
                <td className="px-4 py-2">{sub.type}</td>
                <td className="px-4 py-2">{sub.amount}</td>
                <td className="px-4 py-2">{sub.dueDate}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      sub.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : sub.status === "Approved"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {sub.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <Button size="sm" variant="outline">
                    E-Mail
                  </Button>
                  <Button size="sm" variant="secondary">
                    Extend
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {subscribers.map((sub) => (
          <div
            key={sub.id}
            className={`rounded-lg p-4 shadow ${
              isDark ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <p className="font-semibold">{sub.name}</p>
            <p className="text-sm text-gray-400">{sub.phone}</p>
            <div className="mt-2 text-sm">
              <p>
                <span className="font-medium">Type:</span> {sub.type}
              </p>
              <p>
                <span className="font-medium">Amount:</span> {sub.amount}
              </p>
              <p>
                <span className="font-medium">Due:</span> {sub.dueDate}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    sub.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : sub.status === "Approved"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {sub.status}
                </span>
              </p>
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline">
                E-Mail
              </Button>
              <Button size="sm" variant="secondary">
                Extend
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
