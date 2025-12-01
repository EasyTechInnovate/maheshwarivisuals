import React from "react";

export default function MarketingDistributionPlan({
  theme = "dark",
  className = "",
}) {
  const isDark = theme === "dark";

  // matching OwnerInformation theme system
  const containerBg = isDark
    ? "bg-[#151F28] border border-gray-800 text-white"
    : "bg-white text-black";

  const inputBg = isDark ? "bg-[#111A22]" : "bg-gray-50";
  const inputText = isDark
    ? "text-white placeholder-gray-400"
    : "text-black placeholder-gray-500";

  const labelText = isDark ? "text-gray-300" : "text-gray-700";
  const focusBorder = isDark
    ? "focus:border-purple-600"
    : "focus:border-indigo-500";

  return (
    <div className={`w-full rounded-xl p-6 ${containerBg} ${className}`}>
      <h2 className={`text-lg font-semibold mb-6`}>
        Marketing & Distribution Plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* MV Distribution */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelText}`}>
            Will this be released via MV Distribution?
          </label>
          <input
            type="text"
            placeholder="Yes"
            className={`w-full rounded-md px-4 py-2 
            ${inputText} ${inputBg} border border-transparent 
            ${focusBorder} focus:outline-none`}
          />
        </div>

        {/* Ads / Influencer */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelText}`}>
            Do you plan to run ads or influencer campaigns?
          </label>
          <input
            type="text"
            placeholder="Yes"
            className={`w-full rounded-md px-4 py-2 
            ${inputText} ${inputBg} border border-transparent 
            ${focusBorder} focus:outline-none`}
          />
        </div>

        {/* Brand Tie-in */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelText}`}>
            Any brand or merch tie-ins?
          </label>
          <input
            type="text"
            placeholder="Yes"
            className={`w-full rounded-md px-4 py-2 
            ${inputText} ${inputBg} border border-transparent 
            ${focusBorder} focus:outline-none`}
          />
        </div>

        {/* Describe */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelText}`}>If yes, describe</label>
          <input
            type="text"
            placeholder="Yes"
            className={`w-full rounded-md px-4 py-2 
            ${inputText} ${inputBg} border border-transparent 
            ${focusBorder} focus:outline-none`}
          />
        </div>

      </div>
    </div>
  );
}
