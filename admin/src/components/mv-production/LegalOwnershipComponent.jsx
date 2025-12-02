import React from "react";

export default function LegalOwnershipDeclaration({
  theme = "dark",
  className = "",
  data = {}, 
}) {
  const isDark = theme === "dark";

  
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

  
  const yesNo = (val) => (val ? "Yes" : "No");

  return (
    <div className={`w-full rounded-xl p-6 ${containerBg} ${className}`}>
      <h2 className="text-lg font-semibold mb-6">
        Legal & Ownership Declaration
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelText}`}>
            Do you confirm that you retain full creative ownership of the project?
          </label>
          <input
            type="text"
            value={yesNo(data.confirmFullCreativeOwnership)}
            readOnly
            className={`w-full rounded-md px-4 py-2 
              ${inputText} ${inputBg} border border-transparent 
              ${focusBorder} focus:outline-none`}
          />
        </div>

        
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelText}`}>
            Do you agree to credit MV Production for budget support?
          </label>
          <input
            type="text"
            value={yesNo(data.agreeToCreditMVProduction)}
            readOnly
            className={`w-full rounded-md px-4 py-2 
              ${inputText} ${inputBg} border border-transparent 
              ${focusBorder} focus:outline-none`}
          />
        </div>

        
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelText}`}>
            Do you agree to share final assets with MV for portfolio and showcase use?
          </label>
          <input
            type="text"
            value={yesNo(data.agreeToShareFinalAssets)}
            readOnly
            className={`w-full rounded-md px-4 py-2 
              ${inputText} ${inputBg} border border-transparent 
              ${focusBorder} focus:outline-none`}
          />
        </div>

        
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelText}`}>
            Do you require an NDA or custom agreement?
          </label>
          <input
            type="text"
            value={yesNo(data.requireNDAOrCustomAgreement)}
            readOnly
            className={`w-full rounded-md px-4 py-2 
              ${inputText} ${inputBg} border border-transparent 
              ${focusBorder} focus:outline-none`}
          />
        </div>

      </div>
    </div>
  );
}
