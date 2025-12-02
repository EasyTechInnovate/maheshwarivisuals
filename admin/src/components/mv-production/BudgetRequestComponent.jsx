import React from "react";

export default function BudgetRequestOwnership({
  theme = "dark",
  className = "",
  data = {},
  editMode = false,
  onChange, 
}) {
  const isDark = theme === "dark";

  const containerBg = isDark
    ? "bg-[#151F28] border border-gray-800 text-white"
    : "bg-white border border-gray-300 text-black";

  const fullInput = isDark
    ? "bg-[#111A22] text-white placeholder-gray-400 border border-transparent rounded-lg px-3 py-2 focus:outline-none"
    : "bg-gray-50 text-black placeholder-gray-500 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none";

  const underlineInput = isDark
    ? "bg-transparent text-white placeholder-gray-400 border-b border-gray-600 focus:outline-none"
    : "bg-transparent text-black placeholder-gray-500 border-b border-gray-400 focus:outline-none";

  const labelText = isDark ? "text-gray-300" : "text-gray-600";

  const breakdown = data?.breakdown || {};

  const handleChange = (field, value) => {
    const updated = { ...data, [field]: value };
    onChange(updated);
  };

  const handleBreakdownChange = (field, value) => {
    const updated = {
      ...data,
      breakdown: { ...breakdown, [field]: value },
    };
    onChange(updated);
  };

  return (
    <div className={`p-6 rounded-xl ${containerBg} ${className}`}>
      <h2 className="text-lg font-semibold mb-6">
        Budget Request & Ownership Proposal
      </h2>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className={`text-sm ${labelText}`}>
            Total Budget Requested (INR)
          </label>
          <input
            className={`w-full mt-2 ${fullInput}`}
            readOnly={!editMode}
            value={data?.totalBudgetRequested || ""}
            onChange={(e) =>
              handleChange("totalBudgetRequested", Number(e.target.value))
            }
          />
        </div>

        <div>
          <label className={`text-sm ${labelText}`}>
            Proposed Ownership Dilution (%)
          </label>
          <input
            className={`w-full mt-2 ${fullInput}`}
            readOnly={!editMode}
            value={data?.proposedOwnershipDilution || ""}
            onChange={(e) =>
              handleChange("proposedOwnershipDilution", Number(e.target.value))
            }
          />
        </div>
      </div>

     
      <p className={`text-sm ${labelText} mb-2`}>Breakdown (Estimated)</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div>
          <label className={`text-sm ${labelText}`}>Pre-Production:</label>
          <input
            className={`w-full mt-1 ${underlineInput}`}
            readOnly={!editMode}
            value={breakdown?.preProduction || ""}
            onChange={(e) =>
              handleBreakdownChange("preProduction", Number(e.target.value))
            }
          />
        </div>

        <div>
          <label className={`text-sm ${labelText}`}>Shoot Day:</label>
          <input
            className={`w-full mt-1 ${underlineInput}`}
            readOnly={!editMode}
            value={breakdown?.shootDay || ""}
            onChange={(e) =>
              handleBreakdownChange("shootDay", Number(e.target.value))
            }
          />
        </div>

        <div>
          <label className={`text-sm ${labelText}`}>Post-Production:</label>
          <input
            className={`w-full mt-1 ${underlineInput}`}
            readOnly={!editMode}
            value={breakdown?.postProduction || ""}
            onChange={(e) =>
              handleBreakdownChange("postProduction", Number(e.target.value))
            }
          />
        </div>

        <div>
          <label className={`text-sm ${labelText}`}>
            Miscellaneous / Contingency:
          </label>
          <input
            className={`w-full mt-1 ${underlineInput}`}
            readOnly={!editMode}
            value={breakdown?.miscellaneousContingency || ""}
            onChange={(e) =>
              handleBreakdownChange(
                "miscellaneousContingency",
                Number(e.target.value)
              )
            }
          />
        </div>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className={`text-sm ${labelText}`}>
            Will you contribute personal funds?
          </label>

          <select
            className={`w-full mt-2 ${fullInput}`}
            disabled={!editMode}
            value={data?.willContributePersonalFunds ? "yes" : "no"}
            onChange={(e) =>
              handleChange("willContributePersonalFunds", e.target.value === "yes")
            }
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label className={`text-sm ${labelText}`}>If yes, amount</label>
          <input
            className={`w-full mt-2 ${fullInput}`}
            readOnly={!editMode}
            value={data?.personalFundsAmount || ""}
            onChange={(e) =>
              handleChange("personalFundsAmount", Number(e.target.value))
            }
          />
        </div>
      </div>

     
<div>
  <p className={`text-sm ${labelText} mb-3`}>Revenue Sharing Model Proposed</p>

  <div className="flex flex-wrap items-center gap-10">

   
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        disabled={!editMode}
        checked={data?.revenueSharingModelProposed === "flat_buyout"}
        onChange={() =>
          handleChange("revenueSharingModelProposed", "flat_buyout")
        }
        className="w-4 h-4 accent-purple-500"
      />
      <span className="text-sm">Flat Buyout</span>
    </label>

    
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        disabled={!editMode}
        checked={data?.revenueSharingModelProposed === "revenue_split"}
        onChange={() =>
          handleChange("revenueSharingModelProposed", "revenue_split")
        }
        className="w-4 h-4 accent-purple-500"
      />
      <span className="text-sm">Revenue Split</span>
    </label>

   
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        disabled={!editMode}
        checked={data?.revenueSharingModelProposed === "hybrid"}
        onChange={() =>
          handleChange("revenueSharingModelProposed", "hybrid")
        }
        className="w-4 h-4 accent-purple-500"
      />
      <span className="text-sm">Hybrid (Buyout + Royalties)</span>
    </label>

  </div>
</div>

    </div>
  );
}
