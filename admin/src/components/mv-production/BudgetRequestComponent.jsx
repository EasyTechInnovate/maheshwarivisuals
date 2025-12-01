import React from "react";

export default function BudgetRequestOwnership({ theme = "dark", className = "" }) {
  const isDark = theme === "dark";

  // Card container style
  const containerBg = isDark
    ? "bg-[#151F28] border border-gray-800 text-white"
    : "bg-white border border-gray-300 text-black";

  // Full input (boxed input)
  const fullInput = isDark
    ? "bg-[#111A22] text-white placeholder-gray-400 border border-transparent rounded-lg px-3 py-2 focus:border-purple-600 focus:outline-none"
    : "bg-gray-50 text-black placeholder-gray-500 border border-gray-300 rounded-lg px-3 py-2 focus:border-indigo-500 focus:outline-none";

  // Underline input (only bottom border)
  const underlineInput = isDark
    ? "bg-transparent text-white placeholder-gray-400 border-b border-gray-600 focus:border-purple-600 outline-none"
    : "bg-transparent text-black placeholder-gray-500 border-b border-gray-400 focus:border-indigo-500 outline-none";

  const labelText = isDark ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`p-6 rounded-xl ${containerBg} ${className}`}>
      <h2 className="text-lg font-semibold mb-6">
        Budget Request & Ownership Proposal
      </h2>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className={`text-sm ${labelText}`}>
            Total Budget Requested (INR)
          </label>
          <input className={`w-full mt-2 ${fullInput}`} placeholder="Artist" />
        </div>

        <div>
          <label className={`text-sm ${labelText}`}>
            Proposed Ownership Dilution (% of video IP)
          </label>
          <input
            className={`w-full mt-2 ${fullInput}`}
            placeholder="10%, 20%, negotiable"
          />
        </div>
      </div>

      {/* Breakdown */}
      <p className={`text-sm ${labelText} mb-2`}>Breakdown (Estimated)</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div>
          <label className={`text-sm ${labelText}`}>Pre-Production:</label>
          <input
            className={`w-full mt-1 ${underlineInput}`}
            placeholder="Lorem Ipsum"
          />
        </div>

        <div>
          <label className={`text-sm ${labelText}`}>Shoot Day:</label>
          <input
            className={`w-full mt-1 ${underlineInput}`}
            placeholder="Lorem Ipsum"
          />
        </div>

        <div>
          <label className={`text-sm ${labelText}`}>Post-Production:</label>
          <input
            className={`w-full mt-1 ${underlineInput}`}
            placeholder="Lorem Ipsum"
          />
        </div>

        <div>
          <label className={`text-sm ${labelText}`}>Miscellaneous / Contingency:</label>
          <input
            className={`w-full mt-1 ${underlineInput}`}
            placeholder="Lorem Ipsum"
          />
        </div>
      </div>

      {/* Contribution Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className={`text-sm ${labelText}`}>
            Will you contribute any personal funds?
          </label>
          <input className={`w-full mt-2 ${fullInput}`} placeholder="Yes" />
        </div>

        <div>
          <label className={`text-sm ${labelText}`}>If yes, amount</label>
          <input className={`w-full mt-2 ${fullInput}`} placeholder="7 crore" />
        </div>
      </div>

      {/* Revenue Sharing */}
      <div>
        <p className={`text-sm ${labelText} mb-3`}>
          Revenue Sharing Model Proposed
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked className="w-4 h-4 accent-purple-500" />
            <span className="text-sm">Flat Buyout</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked className="w-4 h-4 accent-purple-500" />
            <span className="text-sm">Revenue Split</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked className="w-4 h-4 accent-purple-500" />
            <span className="text-sm">Hybrid (Buyout + Royalties)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
