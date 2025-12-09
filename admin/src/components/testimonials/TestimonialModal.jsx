import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import GlobalApi from "@/lib/GlobalApi";

export default function TestimonialModal({
    open,
    onClose,
    testimonialId = null,
    onSaved,
    theme = "dark",
}) {
    const [form, setForm] = useState({
        customerName: "",
        designation: "",
        company: "",
        rating: "",
        testimonialContent: "",
        profileImageUrl: "",
        status: "draft",
    });
    const [saving, setSaving] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    const isValidUrl = (url) => {
        if (!url) return true;
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };


    useEffect(() => {
        if (!open) return;

        let cancelled = false;

        const load = async () => {
            if (testimonialId) {
                setIsEdit(true);
                try {
                    const res = await GlobalApi.getTestimonialById(testimonialId);
                    const data = res?.data?.data ?? res?.data ?? {};
                    if (cancelled) return;
                    setForm({
                        customerName: data.customerName || "",
                        designation: data.designation || "",
                        company: data.company || "",
                        rating: data.rating != null ? String(data.rating) : "",
                        testimonialContent: data.testimonialContent || "",
                        profileImageUrl: data.profileImageUrl || "",
                        status: (data.status || "draft").toLowerCase(),
                    });
                } catch (err) {
                    console.error("Failed to load testimonial:", err);
                    toast.error(err?.response?.data?.message || "Failed to load testimonial");
                }
            } else {
                setIsEdit(false);
                setForm({
                    customerName: "",
                    designation: "",
                    company: "",
                    rating: "",
                    testimonialContent: "",
                    profileImageUrl: "",
                    status: "draft",
                });
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [open, testimonialId]);

    const handleChange = (field, value) => {
        setForm((p) => ({ ...p, [field]: value }));
    };

    const validate = () => {
        if (!form.customerName?.trim()) return "Customer name is required";
        if (!form.designation?.trim()) return "Designation is required";
        if (!form.company?.trim()) return "Company is required";
        if (!form.rating) return "Rating is required";
        if (!form.testimonialContent?.trim()) return "Testimonial content is required";
        if (!form.status) return "Status is required";
        if (form.profileImageUrl && !isValidUrl(form.profileImageUrl)) return "Profile image URL appears invalid";
        return null;
    };

    const handleSubmit = async () => {
        const err = validate();
        if (err) {
            toast.error(err);
            return;
        }

        const payload = {
            customerName: form.customerName.trim(),
            designation: form.designation.trim(),
            company: form.company.trim(),
            rating: Number(form.rating),
            testimonialContent: form.testimonialContent.trim(),
            profileImageUrl: form.profileImageUrl?.trim() || undefined,
            status: (form.status || "draft").toLowerCase(),
        };

        try {
            setSaving(true);
            if (isEdit && testimonialId) {
                await GlobalApi.updateTestimonial(testimonialId, payload);
                toast.success("Testimonial updated");
            } else {
                await GlobalApi.createTestimonial(payload);
                toast.success("Testimonial created");
            }
            onSaved && onSaved();
            onClose();
        } catch (error) {
            console.error("Error saving testimonial:", error);
            const msg = error?.response?.data?.message || error?.message || "Failed to save testimonial";
            toast.error(msg);
        } finally {
            setSaving(false);
        }
    };

    if (!open) return null;

    const isDark = theme === "dark";
    const bgClass = isDark ? "bg-[#151F28] text-white" : "bg-white text-black";
    const inputClass = `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${isDark
        ? "bg-[#0F1620] border-gray-700 placeholder-gray-500 text-white"
        : "bg-gray-50 border-gray-300 placeholder-gray-500 text-black"
        }`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 140 }}
                className={`rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.45)] w-[720px] max-w-[95%] p-6 relative ${bgClass} border ${isDark ? "border-gray-800" : "border-gray-200"}`}
            >

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">{isEdit ? "Edit Testimonial" : "Add New Testimonial"}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X size={18} />
                    </button>
                </div>


                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Customer Name</label>
                            <input
                                className={inputClass}
                                value={form.customerName}
                                onChange={(e) => handleChange("customerName", e.target.value)}
                                placeholder="Enter customer name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Designation</label>
                            <input
                                className={inputClass}
                                value={form.designation}
                                onChange={(e) => handleChange("designation", e.target.value)}
                                placeholder="Enter designation"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Company</label>
                            <input
                                className={inputClass}
                                value={form.company}
                                onChange={(e) => handleChange("company", e.target.value)}
                                placeholder="Enter company name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Rating</label>
                            <Select value={form.rating} onValueChange={(val) => handleChange("rating", val)}>
                                <SelectTrigger className={`${inputClass} flex justify-between`}>
                                    <SelectValue placeholder="Select rating" />
                                </SelectTrigger>
                                <SelectContent className={isDark ? "bg-[#151F28] text-white" : "bg-white text-black"}>
                                    {[5, 4, 3, 2, 1].map((r) => (
                                        <SelectItem key={r} value={String(r)}>{r} Stars</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Testimonial Content</label>
                        <textarea
                            rows={4}
                            className={`${inputClass} resize-y`}
                            value={form.testimonialContent}
                            onChange={(e) => handleChange("testimonialContent", e.target.value)}
                            placeholder="Enter the testimonial content..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Profile Image URL (Optional)</label>
                        <input
                            className={inputClass}
                            value={form.profileImageUrl}
                            onChange={(e) => handleChange("profileImageUrl", e.target.value)}
                            placeholder="Enter image URL"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Status</label>
                        <Select value={form.status} onValueChange={(val) => handleChange("status", val)}>
                            <SelectTrigger className={`${inputClass} flex justify-between`}>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent className={isDark ? "bg-[#151F28] text-white" : "bg-white text-black"}>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                <div className="flex justify-end mt-6 gap-3">
                    <Button variant="outline" onClick={onClose} disabled={saving} className={`rounded-full px-4 ${isDark ? "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}>
                        Cancel
                    </Button>

                    <Button onClick={handleSubmit} disabled={saving} className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4">
                        {isEdit ? "Update Testimonial" : "Add Testimonial"}
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
}
