"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import GlobalApi from "@/lib/GlobalApi";

export default function UpdateMCNChannelStatusModal({ isOpen, onClose, channelId, currentStatus }) {
  const [status, setStatus] = useState(currentStatus || "");
  const [suspensionReason, setSuspensionReason] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStatus(currentStatus || "");
      setSuspensionReason("");
    }
  }, [isOpen, currentStatus]);

  const handleSubmit = async () => {
    if (!status) {
      toast.error("Please select a status");
      return;
    }

    const payload = {
      status,
      ...(status === "suspended" ? { suspensionReason } : {}),
    };

    try {
      setLoading(true);
      await GlobalApi.updateMcnChannelStatus(channelId, payload);
      toast.success("Channel status updated successfully!");
      onClose(true);
    } catch (err) {
      console.error("❌ Error updating channel status:", err);
      toast.error(err.response?.data?.message || "Failed to update channel status");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#111A22] border border-gray-800 rounded-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Update Channel Status</h2>
          <button onClick={() => onClose(false)} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-[#151F28] border border-gray-800 text-gray-200">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-[#151F28] border border-gray-800 text-gray-200">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

         
          {status === "suspended" && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">Suspension Reason</label>
              <Textarea
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                placeholder="Enter reason for suspension"
                className="bg-[#151F28] border border-gray-800 text-gray-200 resize-none"
                rows={3}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => onClose(false)} className="border-gray-700 text-gray-300">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
}
