import { useState, useEffect } from "react";
import {
  X,
  Plus,
  Loader2,
  Trash2,
  Save,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";

export default function CreateCompanySettingsModal({
  open,
  onClose,
  editData = null, // If editing an existing company settings entry
  onSuccess,
}) {
  const isEditMode = !!editData;
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    socialMedia: {
      instagram: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      website: "",
      x: "",
      youtubeLinks: [
        { title: "", url: "" },
      ],
    },
    contactInfo: {
      primaryPhone: "",
      secondaryPhone: "",
      primaryEmail: "",
      supportEmail: "",
      businessEmail: "",
      whatsappQRCode: "",
      physicalAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      businessHours: "",
    },
  });

  // Prefill for editing
  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (path, value) => {
    setFormData((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  // ----------------------- YOUTUBE LINKS ------------------------
  const addYoutubeLink = () => {
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        youtubeLinks: [...prev.socialMedia.youtubeLinks, { title: "", url: "" }],
      },
    }));
  };

  const removeYoutubeLink = (index) => {
    setFormData((prev) => {
      const newLinks = prev.socialMedia.youtubeLinks.filter((_, i) => i !== index);
      return {
        ...prev,
        socialMedia: { ...prev.socialMedia, youtubeLinks: newLinks },
      };
    });
  };

  // ----------------------- SUBMIT ------------------------
  const handleSubmit = async () => {
    setSaving(true);
    try {
      if (isEditMode) {
        await GlobalApi.updateCompanySettings(editData._id, formData);
        toast.success("Company settings updated successfully!");
      } else {
        await GlobalApi.createCompanySettings(formData);
        toast.success("Company settings created successfully!");
      }
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error saving company settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0d0d0d]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditMode ? "Edit Company Settings" : "Create Company Settings"}
          </DialogTitle>
        </DialogHeader>

        {/* ------------------- SOCIAL MEDIA ------------------- */}
        <div className="space-y-3 border p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 dark:text-gray-200">Social Media Links</h3>
          {["instagram", "facebook", "linkedin", "youtube", "website", "x"].map((key) => (
            <Input
              key={key}
              placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} URL`}
              value={formData.socialMedia[key]}
              onChange={(e) => handleChange(`socialMedia.${key}`, e.target.value)}
            />
          ))}

          <div className="space-y-2 mt-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">YouTube Links</h4>
              <Button variant="outline" size="sm" onClick={addYoutubeLink}>
                <Plus className="w-4 h-4 mr-1" /> Add Link
              </Button>
            </div>
            {formData.socialMedia.youtubeLinks.map((link, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Title"
                  value={link.title}
                  onChange={(e) =>
                    handleChange(`socialMedia.youtubeLinks.${index}.title`, e.target.value)
                  }
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) =>
                    handleChange(`socialMedia.youtubeLinks.${index}.url`, e.target.value)
                  }
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeYoutubeLink(index)}
                  disabled={formData.socialMedia.youtubeLinks.length === 1}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------- CONTACT INFO ------------------- */}
        <div className="space-y-3 border p-4 rounded-lg mt-4">
          <h3 className="font-medium text-gray-800 dark:text-gray-200">Contact Information</h3>

          <Input
            placeholder="Primary Phone"
            value={formData.contactInfo.primaryPhone}
            onChange={(e) => handleChange("contactInfo.primaryPhone", e.target.value)}
          />
          <Input
            placeholder="Secondary Phone"
            value={formData.contactInfo.secondaryPhone}
            onChange={(e) => handleChange("contactInfo.secondaryPhone", e.target.value)}
          />
          <Input
            placeholder="Primary Email"
            value={formData.contactInfo.primaryEmail}
            onChange={(e) => handleChange("contactInfo.primaryEmail", e.target.value)}
          />
          <Input
            placeholder="Support Email"
            value={formData.contactInfo.supportEmail}
            onChange={(e) => handleChange("contactInfo.supportEmail", e.target.value)}
          />
          <Input
            placeholder="Business Email"
            value={formData.contactInfo.businessEmail}
            onChange={(e) => handleChange("contactInfo.businessEmail", e.target.value)}
          />
          <Input
            placeholder="WhatsApp QR Code URL"
            value={formData.contactInfo.whatsappQRCode}
            onChange={(e) => handleChange("contactInfo.whatsappQRCode", e.target.value)}
          />

          <h4 className="mt-2 font-medium">Physical Address</h4>
          {["street", "city", "state", "zipCode", "country"].map((field) => (
            <Input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData.contactInfo.physicalAddress[field]}
              onChange={(e) =>
                handleChange(`contactInfo.physicalAddress.${field}`, e.target.value)
              }
            />
          ))}

          <Input
            placeholder="Business Hours (e.g. Mon-Fri: 9AM-6PM)"
            value={formData.contactInfo.businessHours}
            onChange={(e) => handleChange("contactInfo.businessHours", e.target.value)}
          />
        </div>

        <DialogFooter className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-1 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1" /> Save
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
