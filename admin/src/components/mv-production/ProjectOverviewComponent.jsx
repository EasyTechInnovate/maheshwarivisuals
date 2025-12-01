export default function ProjectOverview({ theme = "dark" }) {
  const isDark = theme === "dark";

  const cardBg = isDark ? "#151F28" : "#ffffff";
  const inputBg = isDark ? "#111A22" : "#f1f1f1";
  const textColor = isDark ? "text-white" : "text-black";
  const labelColor = isDark ? "text-gray-300" : "text-gray-700";

  return (
    <div
      className={`w-full rounded-xl p-6 mt-8 ${textColor}`}
      style={{ backgroundColor: cardBg }}
    >
      <h2 className="text-lg font-semibold mb-6">Project Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Project Title */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelColor}`}>Project Title</label>
          <input
            type="text"
            placeholder="Artist"
            className={`w-full rounded-md px-4 py-2 placeholder-gray-500 border border-transparent focus:border-purple-600 focus:outline-none`}
            style={{ backgroundColor: inputBg, color: isDark ? "white" : "black" }}
          />
        </div>

        {/* Artist Name */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelColor}`}>Artist Name</label>
          <input
            type="text"
            placeholder="Name"
            className={`w-full rounded-md px-4 py-2 placeholder-gray-500 border border-transparent focus:border-purple-600 focus:outline-none`}
            style={{ backgroundColor: inputBg, color: isDark ? "white" : "black" }}
          />
        </div>

        {/* Label Name */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelColor}`}>Label Name</label>
          <input
            type="text"
            placeholder="Artist Name"
            className={`w-full rounded-md px-4 py-2 placeholder-gray-500 border border-transparent focus:border-purple-600 focus:outline-none`}
            style={{ backgroundColor: inputBg, color: isDark ? "white" : "black" }}
          />
        </div>

        {/* Release Timeline */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelColor}`}>Release Timeline</label>
          <input
            type="text"
            placeholder="98565674676476"
            className={`w-full rounded-md px-4 py-2 placeholder-gray-500 border border-transparent focus:border-purple-600 focus:outline-none`}
            style={{ backgroundColor: inputBg, color: isDark ? "white" : "black" }}
          />
        </div>

        {/* Genres */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelColor}`}>Genres</label>
          <input
            type="text"
            placeholder="Pop"
            className={`w-full rounded-md px-4 py-2 placeholder-gray-500 border border-transparent focus:border-purple-600 focus:outline-none`}
            style={{ backgroundColor: inputBg, color: isDark ? "white" : "black" }}
          />
        </div>

        {/* Mood */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelColor}`}>Mood</label>
          <input
            type="text"
            placeholder="Uplifting"
            className={`w-full rounded-md px-4 py-2 placeholder-gray-500 border border-transparent focus:border-purple-600 focus:outline-none`}
            style={{ backgroundColor: inputBg, color: isDark ? "white" : "black" }}
          />
        </div>

        {/* Album Part */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelColor}`}>
            Is this part of an album or EP?
          </label>
          <input
            type="text"
            placeholder="Yes"
            className={`w-full rounded-md px-4 py-2 placeholder-gray-500 border border-transparent focus:border-purple-600 focus:outline-none`}
            style={{ backgroundColor: inputBg, color: isDark ? "white" : "black" }}
          />
        </div>

        {/* Language */}
        <div className="flex flex-col gap-2">
          <label className={`text-sm ${labelColor}`}>Language</label>
          <input
            type="text"
            placeholder="Beats"
            className={`w-full rounded-md px-4 py-2 placeholder-gray-500 border border-transparent focus:border-purple-600 focus:outline-none`}
            style={{ backgroundColor: inputBg, color: isDark ? "white" : "black" }}
          />
        </div>

        {/* Theme (full width) */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className={`text-sm ${labelColor}`}>Theme</label>
          <input
            type="text"
            placeholder="Journey & Travel"
            className={`w-full rounded-md px-4 py-2 placeholder-gray-500 border border-transparent focus:border-purple-600 focus:outline-none`}
            style={{ backgroundColor: inputBg, color: isDark ? "white" : "black" }}
          />
        </div>

        {/* Location Preference Tick Boxes — full width */}
        <div className="md:col-span-2 flex flex-col gap-3 mt-2">
          <label className={`text-sm ${labelColor}`}>
            Location Preference
          </label>

          <div className="flex items-center gap-6 flex-wrap">
            {/* Each checkbox */}
            {[
              "Indoor Studio",
              "Outdoor / Natural",
              "Urban / Street",
            ].map((label, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-purple-600"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
