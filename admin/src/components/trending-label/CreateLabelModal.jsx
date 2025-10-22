import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";

export default function AddLabelModal({ open, onClose, theme, editData }) {
  const [form, setForm] = useState({
    labelNumber: "",
    labelName: "",
    designation: "",
    logoUrl: "",
    totalArtists: 0,
    totalReleases: 0,
    monthlyStreams: 0,
    status: "active",
  });

  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (editData) {
      setForm({
        labelNumber: editData.labelNumber || "",
        labelName: editData.labelName || "",
        designation: editData.designation || "",
        logoUrl: editData.logoUrl || "",
        totalArtists: editData.totalArtists || 0,
        totalReleases: editData.totalReleases || 0,
        monthlyStreams: editData.monthlyStreams || 0,
        status: editData.status || "active",
      });
    } else {
      setForm({
        labelNumber: "",
        labelName: "",
        designation: "",
        logoUrl: "",
        totalArtists: 0,
        totalReleases: 0,
        monthlyStreams: 0,
        status: "active",
      });
    }
  }, [editData, open]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        labelNumber: form.labelNumber,
        labelName: form.labelName,
        designation: form.designation,
        logoUrl: form.logoUrl,
        totalArtists: Number(form.totalArtists),
        totalReleases: Number(form.totalReleases),
        monthlyStreams: Number(form.monthlyStreams),
        status: form.status,
      };

      if (editData?._id) {
        
        await GlobalApi.updateTrendingLabel(editData._id, payload);
        toast.success("Label updated successfully");
      } else {
        
        await GlobalApi.createTrendingLabel(payload);
        toast.success("Label created successfully");
      }

      
      onClose();
    } catch (error) {
      console.error("❌ Error saving label:", error);
      const msg = error?.response?.data?.message || error?.response?.data?.request?.message || error?.message || "Failed to save label";
      
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-[#151F28] text-white" : "bg-white text-black";
  const inputClass = `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
    isDark
      ? "bg-[#0F1620] border-gray-700 placeholder-gray-500 text-white focus:border-purple-500"
      : "bg-gray-50 border-gray-300 placeholder-gray-500 text-black focus:border-purple-600"
  }`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 120 }} className={`rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.4)] w-[600px] max-w-[90%] p-6 relative ${bgClass} border ${isDark ? "border-gray-800" : "border-gray-200"}`}>
        
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{editData ? "Edit Label" : "Add New Label"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={18} />
          </button>
        </div>

        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Label Number</label>
              <input type="text" placeholder="e.g., MV001" value={form.labelNumber} onChange={(e) => handleChange("labelNumber", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm mb-1">Label Name</label>
              <input type="text" placeholder="Enter label name" value={form.labelName} onChange={(e) => handleChange("labelName", e.target.value)} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Designation</label>
            <input type="text" placeholder="e.g., Independent Music Label" value={form.designation} onChange={(e) => handleChange("designation", e.target.value)} className={inputClass} />
          </div>

          <div>
            <label className="block text-sm mb-1">Logo URL</label>
            <input type="text" placeholder="Enter logo image URL" value={form.logoUrl} onChange={(e) => handleChange("logoUrl", e.target.value)} className={inputClass} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Total Artists</label>
              <input type="number" min="0" value={form.totalArtists} onChange={(e) => handleChange("totalArtists", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm mb-1">Total Releases</label>
              <input type="number" min="0" value={form.totalReleases} onChange={(e) => handleChange("totalReleases", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm mb-1">Monthly Streams</label>
              <input type="number" min="0" value={form.monthlyStreams} onChange={(e) => handleChange("monthlyStreams", e.target.value)} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Status</label>
            <Select value={form.status} onValueChange={(val) => handleChange("status", val)}>
              <SelectTrigger className={`w-full ${inputClass} flex justify-between`}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className={isDark ? "bg-[#151F28] text-white" : "bg-white text-black"}>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        
        <div className="flex justify-end mt-6 gap-3">
          <Button variant="outline" disabled={loading} onClick={onClose} className={`rounded-full px-4 ${isDark ? "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 flex items-center gap-2">
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                {editData ? "Updating..." : "Adding..."}
              </>
            ) : editData ? "Update Label" : "Add Label"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
