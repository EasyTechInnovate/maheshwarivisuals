import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";

export default function ResetPasswordModal({ isOpen, onClose, userData, theme }) {
  const isDark = theme === "dark";

  const [currentPassword] = useState(userData?.tempPassword || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);

      await GlobalApi.resetUserPassword(userData._id, {
        currentPassword,
        newPassword,
      });

      toast.success("Password reset successfully");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-md rounded-xl ${
          isDark
            ? "bg-[#151F28] text-gray-200 border border-gray-700"
            : "bg-white text-gray-800"
        }`}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Reset Password - {userData?.artistData?.artistName ||
              userData?.labelData?.labelName ||
              userData?.aggregatorData?.companyName ||
              userData?.emailAddress}
          </DialogTitle>
          <DialogDescription
            className={`${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Generate a new password for this user
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-3">
          
          <div className="flex flex-col gap-1">
            <label className="text-sm">Current Password</label>
            <Input
              value={currentPassword}
              disabled
              className={isDark ? "bg-[#111A22] border-gray-700" : ""}
            />
          </div>

         
          <div className="flex flex-col gap-1">
            <label className="text-sm">New Password</label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={isDark ? "bg-[#111A22] border-gray-700" : ""}
            />
          </div>

         
          <div className="flex flex-col gap-1">
            <label className="text-sm">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={isDark ? "bg-[#111A22] border-gray-700" : ""}
            />
          </div>
        </div>

        
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant={isDark ? "outline" : "secondary"}
            onClick={onClose}
            className="px-6"
          >
            Cancel
          </Button>

          <Button
            onClick={handleReset}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
