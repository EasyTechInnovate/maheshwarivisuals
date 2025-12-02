import React, { useEffect, useState } from "react";
import OwnerInformation from "@/components/mv-production/OwnerInformationComponent.jsx";
import { ArrowLeft, Check, X  } from "lucide-react";
import ProjectOverview from "./ProjectOverviewComponent";
import BudgetRequestOwnership from "./BudgetRequestComponent.jsx";
import LegalOwnershipDeclaration from "./LegalOwnershipComponent.jsx";
import MarketingDistributionPlan from "./MarketingDistributionComponent.jsx";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";
export default function MVProductionUserPage({
  theme = "dark",
  onBack,
  defaultData,
  onRefresh,
}) {
  const isDark = theme === "dark";

  const [loading, setLoading] = useState(true);
  const [production, setProduction] = useState(null);

  const [editMode, setEditMode] = useState(false);

 
  const [budgetData, setBudgetData] = useState(null);

 
  useEffect(() => {
    if (!defaultData?._id) return;

    const fetchDetails = async () => {
      try {
        const res = await GlobalApi.getMVProductionById(defaultData._id);
        const data = res?.data?.data || null;

        setProduction(data);
        setBudgetData(data?.budgetRequestAndOwnershipProposal);
      } catch (err) {
        console.error("❌ Failed to load MV Production →", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [defaultData]);

  const handleSave = async () => {
    try {
      const payload = {
        budgetRequestAndOwnershipProposal: budgetData,
      };

      await GlobalApi.updateMVProduction(defaultData._id, payload);

      setProduction((prev) => ({
        ...prev,
        budgetRequestAndOwnershipProposal: budgetData,
      }));

      setEditMode(false);
    } catch (err) {
      console.error("❌ Patch failed:", err);
    }
  };

 
const updateStatus = async (newStatus) => {
  try {
    await GlobalApi.updateMVProductionStatus(defaultData._id, {
      status: newStatus,
    });

    setProduction((prev) => ({
      ...prev,
      status: newStatus,
    }));

    
    toast.success(
      newStatus === "accept"
        ? "Production request accepted successfully!"
        : "Production request rejected successfully!"
    );

    if (onRefresh) onRefresh();

  } catch (err) {
    console.error("❌ Failed to update status:", err);

 
    toast.error("Failed to update status. Please try again.");
  }
};



  if (loading || !production) {
    return (
      <div
        className={`min-h-screen w-full flex items-center justify-center ${
          isDark ? "bg-[#111A22] text-white" : "bg-gray-100 text-black"
        }`}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full p-6 md:p-10 ${
        isDark ? "bg-[#111A22] text-white" : "bg-gray-100 text-black"
      }`}
    >
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
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

       
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-green-600 text-white"
          >
            Save
          </button>
        )}
      </div>

      <p className="text-sm opacity-70 mb-8">
        Apply for music and video production funding to enhance your creative
        projects
      </p>

      
      <OwnerInformation
        theme={theme}
        data={production.ownerInfo}
        user={production.userId}
      />

      <ProjectOverview
        theme={theme}
        data={production.projectOverview}
        className="mt-5"
      />

      <BudgetRequestOwnership
        theme={theme}
        data={budgetData}
        editMode={editMode}
        onChange={setBudgetData}
        className="mt-5"
      />

      <MarketingDistributionPlan
        theme={theme}
        data={production.marketingAndDistributionPlan}
        className="mt-5"
      />

      <LegalOwnershipDeclaration
        theme={theme}
        data={production.legalAndOwnershipDeclaration}
        className="mt-5"
      />

     
      <div
        className={`mt-8 p-5 flex justify-center rounded-xl `}
      >
    
        {!editMode && (
          <div className="flex gap-4">
            <button
              onClick={() => updateStatus("accept")}
              className="px-5 py-2 rounded-lg bg-green-600 text-white"
            >
              <Check className="inline-block w-4 h-4 mr-2" />
              Accept
            </button>

            <button
              onClick={() => updateStatus("reject")}
              className="px-5 py-2 rounded-lg bg-red-600 text-white"
            >

              <X className="inline-block w-4 h-4 mr-2" />
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
