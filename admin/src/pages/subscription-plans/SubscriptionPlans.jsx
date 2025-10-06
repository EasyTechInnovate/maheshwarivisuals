import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  subscriptionStats,
  subscriptionPlans,
} from "./SubscriptionPlansData";
import SubscriptionCard from "@/components/SubscriptionCard";
import SubscriberTable from "@/components/SubscriberTable";
import CreateSubscriptionPlanModal from "./SubscriptionPlanModal"; // Import the modal component

export default function SubscriptionPlans({ theme }) {
  const isDark = theme === "dark";
  const [plans, setPlans] = useState(subscriptionPlans);
  const [activeTab, setActiveTab] = useState("Everyone");
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (id, field, value) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
    setEditingPlanId(null);
  };

  const handleToggle = (id, value) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: value } : p))
    );
  };

  return (
    <div
      className={`p-4 md:p-6 space-y-6 ${
        isDark ? "bg-[#111A22] text-gray-200" : "bg-gray-50 text-[#151F28]"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Subscription Plans</h1>
          <p
            className={`${
              isDark ? "text-gray-400" : "text-gray-600"
            } text-sm`}
          >
            Manage pricing tiers and subscription offerings
          </p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 flex items-center gap-2"
          onClick={() => setIsModalOpen(true)} // Open modal on click
        >
          <Plus className="h-4 w-4" /> Create New Plan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {subscriptionStats.map((stat, i) => (
          <div
            key={i}
            className={`rounded-lg p-4 shadow-md ${
              isDark ? "bg-[#151F28]" : "bg-white"
            }`}
          >
            <p className="text-sm">{stat.label}</p>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p
              className={`text-xs mt-1 ${
                stat.subtext.includes("+")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {stat.subtext}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div
        className={`flex items-center rounded-lg overflow-hidden ${
          isDark ? "bg-[#151F28]" : "bg-gray-200"
        }`}
      >
        {["Everyone", "Artists", "Labels", "Subscribers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : isDark
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Switch */}
      {activeTab === "Subscribers" ? (
        <SubscriberTable isDark={isDark} />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div key={plan.id} className="max-w-sm w-full">
              <SubscriptionCard
                plan={plan}
                isDark={isDark}
                editingPlanId={editingPlanId}
                setEditingPlanId={setEditingPlanId}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleToggle={handleToggle}
              />
            </div>
          ))}
        </div>
      )}

      {/* Create Plan Modal */}
     <CreateSubscriptionPlanModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  theme={theme}
  categories={[
    { id: 1, name: "Everyone" },
    { id: 2, name: "Artists" },
    { id: 3, name: "Labels" },
    { id: 4, name: "Subscribers" },
  ]}
/>

    </div>
  );
}
