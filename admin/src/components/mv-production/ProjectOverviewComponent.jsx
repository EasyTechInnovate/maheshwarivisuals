export default function ProjectOverview({
  theme = "dark",
  className = "",
  data = {},
}) {
  const isDark = theme === "dark";

  const cardBg = isDark ? "#151F28" : "#ffffff";
  const inputBg = isDark ? "#111A22" : "#f1f1f1";
  const textColor = isDark ? "text-white" : "text-black";
  const labelColor = isDark ? "text-gray-300" : "text-gray-700";

  
  const genreText = Array.isArray(data.genres) ? data.genres.join(", ") : "";

  const locationMap = {
    indoor_studio: "Indoor Studio",
    outdoor_natural: "Outdoor / Natural",
    urban_street: "Urban / Street",
  };

  const selectedLocations = data.locationPreference || [];

  return (
    <div
      className={`w-full rounded-xl p-6 mt-8 ${textColor} ${className} ${
        isDark ? "text-white border border-gray-800" : "text-black"
      }`}
      style={{ backgroundColor: cardBg }}
    >
      <h2 className="text-lg font-semibold mb-6">Project Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        
        <Input label="Project Title" value={data.projectTitle} isDark={isDark} inputBg={inputBg} />

        
        <Input label="Artist Name" value={data.artistName} isDark={isDark} inputBg={inputBg} />

        
        <Input label="Label Name" value={data.labelName} isDark={isDark} inputBg={inputBg} />

        
        <Input label="Release Timeline" value={data.releaseTimeline} isDark={isDark} inputBg={inputBg} />

        
        <Input label="Genres" value={genreText} isDark={isDark} inputBg={inputBg} />

        
        <Input label="Mood" value={data.mood} isDark={isDark} inputBg={inputBg} />

        
        <Input
          label="Is this part of an album or EP?"
          value={data.isPartOfAlbumOrEP ? "Yes" : "No"}
          isDark={isDark}
          inputBg={inputBg}
        />

        <Input label="Language" value={data.language} isDark={isDark} inputBg={inputBg} />

       
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className={`text-sm ${labelColor}`}>Theme</label>
          <input
            type="text"
            value={data.theme || ""}
            readOnly
            className="w-full rounded-md px-4 py-2 border border-transparent"
            style={{ backgroundColor: inputBg, color: isDark ? "white" : "black" }}
          />
        </div>

       
        <div className="md:col-span-2 flex flex-col gap-3 mt-2">
          <label className={`text-sm ${labelColor}`}>Location Preference</label>

          <div className="flex items-center gap-6 flex-wrap">
            {Object.entries(locationMap).map(([apiValue, label], index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(apiValue)}
                  readOnly
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

function Input({ label, value, isDark, inputBg }) {
  return (
    <div className="flex flex-col gap-2">
      <label className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        {label}
      </label>
      <input
        type="text"
        value={value || ""}
        readOnly
        className="w-full rounded-md px-4 py-2 border border-transparent"
        style={{ backgroundColor: inputBg, color: isDark ? "white" : "black" }}
      />
    </div>
  );
}
