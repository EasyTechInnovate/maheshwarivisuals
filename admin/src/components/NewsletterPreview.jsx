export default function NewsletterPreview({ newsletter }) {
  return (
    <div className="bg-gray-900 rounded-xl p-5 flex-1">
      <h2 className="text-lg font-semibold mb-4">Newsletter Preview</h2>
      <div className="bg-purple-600 text-white rounded-lg p-3 mb-3">
        Maheshwari Visuals
        <p className="text-xs opacity-80">Music Distribution Platform</p>
      </div>
      <h3 className="text-white font-semibold">{newsletter.title || "Newsletter Title"}</h3>
      <p className="text-gray-400 text-sm mt-2">{newsletter.content || "Your newsletter content will appear here..."}</p>
      <p className="text-xs text-gray-500 mt-4">© 2024 Maheshwari Visuals. All rights reserved.</p>
    </div>
  );
}
