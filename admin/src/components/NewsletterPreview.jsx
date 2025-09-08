export default function NewsletterPreview({ theme = "dark", newsletter = {} }) {
  const bgCard = theme === "dark" ? "bg-[#151F28]" : "bg-white";
  const inner = theme === "dark" ? "bg-[#1C2833] border-gray-700" : "bg-gray-50 border-gray-200";

  return (
    <div className={`${bgCard} rounded-xl p-6 flex-1 shadow`}>
      <h2 className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-lg font-semibold mb-4`}>Newsletter Preview</h2>

      <div className="bg-purple-600 text-white rounded-lg p-3 mb-4">
        <div className="font-semibold">Maheshwari Visuals</div>
        <div className="text-xs opacity-80">Music Distribution Platform</div>
      </div>

      <div className={`${inner} p-4 rounded-xl border`}>
        <h3 className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-semibold text-base`}>
          {newsletter.title || "Newsletter Title"}
        </h3>
        <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-sm mt-2`}>
          {newsletter.content || "Your newsletter content will appear here..."}
        </p>
      </div>

      <p className={`${theme === "dark" ? "text-gray-500" : "text-gray-500"} text-xs mt-4`}>
        © 2024 Maheshwari Visuals. All rights reserved.
      </p>
    </div>
  );
}
