import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit2, Trash, EyeOff } from "lucide-react";

export default function SubscriptionCard({
  plan,
  isDark,
  editingPlanId,
  setEditingPlanId,
  handleEdit,
  handleDelete,
  handleToggle,
}) {
  return (
    <div
  className={`rounded-lg p-5 shadow-md flex flex-col h-full ${
    isDark ? "bg-[#151F28] text-gray-100" : "bg-white text-[#151F28]"
  }`}
>

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          {editingPlanId === plan.id ? (
            <input
              className={`px-2 py-1 rounded-md border ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300"
              }`}
              defaultValue={plan.name}
              onBlur={(e) => handleEdit(plan.id, "name", e.target.value)}
              autoFocus
            />
          ) : (
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {plan.name}
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                {plan.status}
              </span>
            </h2>
          )}
          <p
            className={`${
              isDark ? "text-gray-400" : "text-gray-600"
            } text-sm`}
          >
            {plan.description}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            title="Edit"
            onClick={() => setEditingPlanId(plan.id)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            title="Delete"
            onClick={() => handleDelete(plan.id)}
          >
            <Trash className="h-4 w-4 text-red-500" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            title="Hide"
          >
            <EyeOff className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Price */}
      <p className="text-2xl font-bold mt-2">{plan.price}</p>
      <p className="text-sm mb-3">per month</p>

      {/* Features */}
      <ul className="text-sm space-y-1 mb-4">
        {plan.features.map((f, i) => (
          <li key={i}>• {f}</li>
        ))}
      </ul>

      {/* Stats */}
      <div className="flex justify-between text-sm mt-auto">
        <div>
          <p className="text-gray-400">Subscribers:</p>
          <p className="font-medium">{plan.subscribers}</p>
        </div>
        <div>
          <p className="text-gray-400">Monthly Revenue:</p>
          <p className="font-medium">{plan.revenue}</p>
        </div>
      </div>

      
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700/50">
        <div className="flex items-center gap-2">
          <span className="text-sm">Active Status</span>
          <Switch
            checked={plan.active}
            onCheckedChange={(value) => handleToggle(plan.id, value)}
          />
        </div>
        <Button
          size="sm"
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
          onClick={() => handleDelete(plan.id)}
        >
          <Trash className="h-4 w-4 mr-1" /> Hide Plan
        </Button>
      </div>
    </div>
  );
}
