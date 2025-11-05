"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import { CalendarDays } from "lucide-react"
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";

export const ESublabelMembershipStatus = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  EXPIRED: "expired",
  SUSPENDED: "suspended",
});

export default function CreateSublabelModal({
  open,
  onClose,
  theme = "dark",
  userId,
  userName,
}) {
  const isDark = theme === "dark";
  const [form, setForm] = useState({
    name: "",
    membershipStatus: "active",
    contractStartDate: null,
    contractEndDate: null,
    description: "",
    contactInfo: { email: "", phone: "" },
    display: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));
  const handleContactChange = (field, value) =>
    setForm((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value },
    }));

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const payload = {
        name: form.name.trim(),
        membershipStatus: form.membershipStatus,
        contractStartDate: form.contractStartDate
          ? new Date(form.contractStartDate).toISOString()
          : null,
        contractEndDate: form.contractEndDate
          ? new Date(form.contractEndDate).toISOString()
          : null,
        description: form.description.trim(),
        contactInfo: {
          email: form.contactInfo.email.trim(),
          phone: form.contactInfo.phone.trim(),
        },
      };

      // 🔥 POST API CALL
      const res = await GlobalApi.createSubLabel(userId, payload);
      if (res.status === 201 || res.status === 200) {
        toast.success("Sublabel created successfully!");
        onClose(true);
      } else {
        toast.error("Failed to create sublabel");
      }
    } catch (err) {
      console.error("❌ Error creating sublabel:", err);
      toast.error(err.response?.data?.message || "Failed to create sublabel");
    } finally {
      setSubmitting(false);
    }
  };

  const bg = isDark ? "bg-[#111A22] text-white" : "bg-white text-[#111A22]";
  const inputBg = isDark
    ? "bg-[#151F28] border-[#1f2a33] text-white"
    : "bg-white border-gray-300 text-[#111A22]";
  const labelText = isDark ? "text-gray-300" : "text-gray-700";
  const cardBg = isDark ? "bg-[#151F28]" : "bg-gray-50";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-lg w-full rounded-2xl p-5 ${bg} transition-all duration-200`}
      >
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-base font-semibold">
            Create Sublabel – {userName || "User"}
          </DialogTitle>
          <p className="text-xs text-gray-400">
            Fill the details to assign a sublabel to this user.
          </p>
        </DialogHeader>

        {/* === LABEL INFORMATION === */}
        <div
          className={`mt-3 rounded-lg p-3 border ${isDark ? "border-[#1f2a33]" : "border-gray-200"} ${cardBg}`}
        >
          <p className={`font-medium text-sm mb-2 ${labelText}`}>
            Label Information
          </p>

          <div className="space-y-3">
            <div>
              <Label className={labelText}>Label Name</Label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter label name"
                className={`${inputBg} h-9 text-sm`}
              />
            </div>

            <div>
              <Label className={labelText}>Description</Label>
              <Textarea
                rows={2}
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Short description"
                className={`${inputBg} resize-none text-sm`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className={labelText}>Membership Status</Label>
                <Select
                  value={form.membershipStatus}
                  onValueChange={(v) => handleChange("membershipStatus", v)}
                >
                  <SelectTrigger className={`${inputBg} h-9`}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className={bg}>
                    {Object.values(ESublabelMembershipStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className={labelText}>Display</Label>
                <div className="flex items-center h-[38px]">
                  <Switch
                    checked={form.display}
                    onCheckedChange={(v) => handleChange("display", v)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === CONTRACT SECTION === */}
        <div
          className={`mt-3 rounded-lg p-3 border ${isDark ? "border-[#1f2a33]" : "border-gray-200"} ${cardBg}`}
        >
          <p className={`font-medium text-sm mb-2 ${labelText}`}>
            Contract & Contact
          </p>

          <div className="grid grid-cols-2 gap-3">
        <div>
  <Label className={labelText}>Contract Start</Label>
  <div className="relative">
    <DatePicker
      selected={form.contractStartDate}
      onChange={(date) => handleChange("contractStartDate", date)}
      dateFormat="dd MMM yyyy"
      placeholderText="Select start date"
      className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition ${inputBg}`}
      calendarClassName={isDark ? "bg-[#1A1D23] text-white border-gray-700" : ""}
      popperClassName="z-[9999]"
    />
    <CalendarDays className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
  </div>
</div>

<div>
  <Label className={labelText}>Contract End</Label>
  <div className="relative">
    <DatePicker
      selected={form.contractEndDate}
      onChange={(date) => handleChange("contractEndDate", date)}
      dateFormat="dd MMM yyyy"
      placeholderText="Select end date"
      className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition ${inputBg}`}
      calendarClassName={isDark ? "bg-[#1A1D23] text-white border-gray-700" : ""}
      popperClassName="z-[9999]"
    />
    <CalendarDays className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
  </div>
</div>


            <div>
              <Label className={labelText}>Contact Email</Label>
              <Input
                type="email"
                value={form.contactInfo.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
                placeholder="Enter email"
                className={`${inputBg} h-9 text-sm`}
              />
            </div>

            <div>
              <Label className={labelText}>Contact Phone</Label>
              <Input
                value={form.contactInfo.phone}
                onChange={(e) => handleContactChange("phone", e.target.value)}
                placeholder="Enter phone number"
                className={`${inputBg} h-9 text-sm`}
              />
            </div>
          </div>
        </div>

        {/* === ACTION BUTTONS === */}
        <div className="flex justify-end gap-2 mt-5">
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm px-5 h-9"
          >
            {submitting ? "Creating..." : "Create"}
          </Button>
          <Button
            variant="outline"
            onClick={() => onClose(false)}
            className="text-sm h-9"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
