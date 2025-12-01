import React from "react";

export default function LegalOwnershipDeclaration({
  theme = "dark",
  className = "",
}) {
  const isDark = theme === "dark";

  const cardBg = isDark ? "bg-[#151F28]" : "bg-white";
  const inputBg = isDark ? "bg-[#111A22] text-gray-200" : "bg-gray-100 text-black";
  const textColor = isDark ? "text-white" : "text-black";
  const labelColor = isDark ? "text-gray-300" : "text-gray-700";

  return (
    <div
      className={`p-6 rounded-xl ${cardBg} ${textColor} ${className}`}
    >
      <h2 className="text-lg font-semibold mb-6">Legal & Ownership Declaration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Creative ownership confirmation */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelColor}`}>
            Do you confirm that you retain full creative ownership of the project?
          </label>
          <input
            type="text"
            placeholder="Yes"
            className={`w-full rounded-md px-4 py-2 placeholder-gray-500 border border-transparent ${inputBg}`}
          />
        </div>

        {/* Credit MV */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelColor}`}>
            Do you agree to credit MV Production for budget support?
          </label>
          <input
            type="text"
            placeholder="Yes"
            className={`w-full rounded-md px-4 py-2 placeholder-gray-500 border border-transparent ${inputBg}`}
          />
        </div>

        {/* Share final assets */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelColor}`}>
            Do you agree to share final assets with MV for portfolio and showcase use?
          </label>
          <input
            type="text"
            placeholder="Yes"
            className={`w-full rounded-md px-4 py-2 placeholder-gray-500 border border-transparent ${inputBg}`}
          />
        </div>

        {/* NDA */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelColor}`}>
            Do you require an NDA or custom agreement?
          </label>
          <input
            type="text"
            placeholder="Yes"
            className={`w-full rounded-md px-4 py-2 placeholder-gray-500 border border-transparent ${inputBg}`}
          />
        </div>

      </div>
    </div>
  );
}
