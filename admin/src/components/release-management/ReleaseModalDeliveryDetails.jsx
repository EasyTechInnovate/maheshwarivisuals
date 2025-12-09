import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Check, X } from "lucide-react";

import { COUNTRIES } from "@/components/constant/countries";
import { PARTNERS } from "@/components/constant/partners";

export default function ReleaseModalDeliveryDetails({
  theme = "dark",
  onApprove,
  onReject,
}) {
  const isDark = theme === "dark";
  const [futureRelease, setFutureRelease] = useState("");
  const [previousRelease, setPreviousRelease] = useState("");
  const [worldWide, setWorldWide] = useState(false);
  const [selectedTerritories, setSelectedTerritories] = useState([]);
  const toggleTerritory = (name) => {
    setSelectedTerritories((prev) =>
      prev.includes(name)
        ? prev.filter((x) => x !== name)
        : [...prev, name]
    );
  };

  const [selectedPartners, setSelectedPartners] = useState([]);
  const [selectAllPartners, setSelectAllPartners] = useState(false);

  const togglePartner = (p) =>
    setSelectedPartners((prev) =>
      prev.includes(p)
        ? prev.filter((x) => x !== p)
        : [...prev, p]
    );

  const handleSelectAllPartners = () => {
    if (selectAllPartners) {
      setSelectedPartners([]);
      setSelectAllPartners(false);
    } else {
      setSelectedPartners([...PARTNERS]);
      setSelectAllPartners(true);
    }
  };

  
  const [proceedWithoutDocs, setProceedWithoutDocs] = useState(false);
  const [iOwnCopyright, setIOwnCopyright] = useState(false);

  const [rejectionReason, setRejectionReason] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  const REJECTION_OPTIONS = [
    "cover art blurry",
    "links written in cover art",
    "audio has silence at end",
    "audio has silence at start",
  ];

  const onApproveClick = () => {
    onApprove?.({
      futureRelease,
      previousRelease,
      worldWide,
      territories: selectedTerritories,
      partners: selectedPartners,
      proceedWithoutDocs,
      iOwnCopyright,
    });
  };

  const onRejectClick = () => {
    onReject?.({
      reason: rejectionReason,
      notes: customNotes,
    });
  };

  return (
    <div
      className={`w-full rounded-xl p-6 border ${
        isDark
          ? "bg-[#151F28] border-[#1f2a37] text-gray-200"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <h2 className="text-lg font-semibold mb-6">Delivery Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs text-gray-400 mb-2 block">
            For Future release
          </label>
          <Input
            value={futureRelease}
            onChange={(e) => setFutureRelease(e.target.value)}
            placeholder="mm/dd/yyyy"
            type="date"
            className={
              isDark
                ? "bg-[#0f1724] border border-gray-700 text-gray-200"
                : ""
            }
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 mb-2 block">
            For Previous/First release
          </label>
          <Input
            value={previousRelease}
            onChange={(e) => setPreviousRelease(e.target.value)}
            placeholder="mm/dd/yyyy"
            type="date"
            className={
              isDark
                ? "bg-[#0f1724] border border-gray-700 text-gray-200"
                : ""
            }
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium mb-3">Territory Rights :</p>

        <div className="flex items-center gap-4 mb-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={worldWide}
              onChange={() => {
                setWorldWide(true);
                setSelectedTerritories([...COUNTRIES]);
              }}
              className="accent-indigo-500"
            />
            Yes
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={!worldWide}
              onChange={() => {
                setWorldWide(false);
                setSelectedTerritories([]);
              }}
              className="accent-indigo-500"
            />
            No
          </label>
        </div>

        <p className="text-xs text-gray-400 mb-2">
          Select The Territories, Where you own the rights
        </p>

        <div
          className={`rounded-md border ${
            isDark ? "border-[#22303a]" : "border-gray-200"
          } p-4 bg-transparent`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-44 overflow-y-auto pr-2 custom-scrollbar">
            {COUNTRIES.map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedTerritories.includes(c)}
                  onChange={() => toggleTerritory(c)}
                  disabled={worldWide}
                  className="accent-indigo-500"
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

    
      <div className="mb-6">
        <p className="text-sm font-medium mb-3">Partner Selection :</p>

        <label className="flex items-center gap-2 text-sm mb-3">
          <input
            type="checkbox"
            checked={selectAllPartners}
            onChange={handleSelectAllPartners}
            className="accent-indigo-500"
          />
          Select All Partners
        </label>

        <div
          className={`rounded-md border ${
            isDark ? "border-[#22303a]" : "border-gray-200"
          } p-4`}
        >
          <p className="text-sm font-semibold text-purple-500 mb-3">
            International Partners
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNERS.map((p) => (
              <label key={p} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedPartners.includes(p)}
                  onChange={() => togglePartner(p)}
                  className="accent-indigo-500"
                />
                {p}
              </label>
            ))}
          </div>
        </div>
      </div>

    
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm mb-2">
          <input
            type="checkbox"
            checked={proceedWithoutDocs}
            onChange={() => setProceedWithoutDocs((s) => !s)}
            className="accent-indigo-500"
          />
          Proceed without Uploading the Copyright Documents
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={iOwnCopyright}
            onChange={() => setIOwnCopyright((s) => !s)}
            className="accent-indigo-500"
          />
          I own the Copyrights Will Upload
        </label>
      </div>

    
<div className="flex flex-col items-center gap-4">
  <div className="flex items-center gap-4">
    <Button
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
      onClick={onApproveClick}
    >
      <Check size={16} /> Approve
    </Button>

    <Select onValueChange={(v) => setRejectionReason(v)}>
      <SelectTrigger
        className={`w-56 rounded-md px-3 py-2 text-sm border ${
          isDark
            ? "bg-[#151F28] border-red-500 text-gray-200"
            : "bg-white border-red-500 text-gray-800"
        }`}
      >
        <SelectValue placeholder="Rejection Reason" />
      </SelectTrigger>

      <SelectContent className={isDark ? "bg-[#151F28] text-white border-gray-700" : "bg-white"}>
        {REJECTION_OPTIONS.map((r) => (
          <SelectItem key={r} value={r}>
            {r}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Button
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
      onClick={onRejectClick}
    >
      <X size={16} /> Reject
    </Button>
  </div>
</div>

    </div>
  );
}
