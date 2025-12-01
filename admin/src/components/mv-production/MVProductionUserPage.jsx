import React from "react";
import OwnerInformation from "@/components/mv-production/OwnerInformationComponent.jsx";
import { ArrowLeft } from "lucide-react";
import ProjectOverview from "./ProjectOverviewComponent";
export default function MVProductionUserPage({
  theme = "dark",
  onBack,
}) {
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen w-full p-6 md:p-10 ${
        isDark ? "bg-[#111A22] text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Heading + Back button row */}
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
            isDark
              ? "bg-[#151F28] hover:bg-[#1d2732] text-gray-200"
              : "bg-white hover:bg-gray-200 text-black"
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h1 className="text-2xl font-semibold">MV Production</h1>
      </div>

      {/* Subtitle */}
      <p className="text-sm opacity-70 mb-8">
        Apply for music and video production funding to enhance your creative projects
      </p>

      {/* Owner Info */}
      <OwnerInformation theme={theme} className="mt-4" />

        {/* Project Overview */}
        <ProjectOverview theme={theme} className="mt-4"/>
    </div>
  );
}
