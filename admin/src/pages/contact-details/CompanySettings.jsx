// app/(admin)/company-settings/CompanySettingsPage.jsx
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GlobalApi from "@/lib/GlobalApi";
import SocialLinksEditor from "@/components/company-settings/SocialLinks";
import ContactPage from "@/components/company-settings/ContactDetails";

export default function CompanySettingsPage({ theme = "dark", companySettingsId }) {
  const isDark = theme === "dark";

  // Loading / saving flags
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Main company settings state (normalized)
  const [companyId, setCompanyId] = useState(companySettingsId || null);
  const [companySettings, setCompanySettings] = useState(null);

  // Split pieces (kept in sync with companySettings)
  const [socialMedia, setSocialMedia] = useState({
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    website: "",
    x: "",
    youtubeLinks: [],
  });
  const [contactInfo, setContactInfo] = useState({
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
  });

  // UI editing toggle
  const [isEditing, setIsEditing] = useState(false);

  // Fetch helpers -----------------------------------------------------------
 const normalizeAndSet = (data) => {
  // If API returned null / undefined
  if (!data) {
    setCompanySettings(null);
    setCompanyId(null);

    // Reset Social
    setSocialMedia({
      instagram: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      website: "",
      x: "",
      youtubeLinks: [],
    });

    // Reset Contact
    setContactInfo({
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
    });

    return;
  }

  // --------------------------
  // ✅ SOCIAL NORMALIZATION
  // --------------------------
  const social = data?.socialMedia || {};

  setSocialMedia({
    instagram: social.instagram || "",
    facebook: social.facebook || "",
    linkedin: social.linkedin || "",
    youtube: social.youtube || "",
    website: social.website || "",
    x: social.x || "",
    youtubeLinks: Array.isArray(social.youtubeLinks)
      ? social.youtubeLinks
      : [],
  });

  // --------------------------
  // ✅ CONTACT NORMALIZATION
  // --------------------------
  const contact = data?.contactInfo || {};

  setContactInfo({
    primaryPhone: contact.primaryPhone || "",
    secondaryPhone: contact.secondaryPhone || "",
    primaryEmail: contact.primaryEmail || "",
    supportEmail: contact.supportEmail || "",
    businessEmail: contact.businessEmail || "",

    whatsappQRCode: contact.whatsappQRCode || "",

    physicalAddress: {
      street: contact?.physicalAddress?.street || "",
      city: contact?.physicalAddress?.city || "",
      state: contact?.physicalAddress?.state || "",
      zipCode: contact?.physicalAddress?.zipCode || "",
      country: contact?.physicalAddress?.country || "",
    },

    businessHours: contact.businessHours || "",
  });

  // ✅ Save company settings + ID
  setCompanySettings(data);
  setCompanyId(data._id || null);
};


  // Fetch either by id or getAll -> first record --------------------------------
 const fetchCompanySettings = async () => {
  setLoading(true);
  try {
    if (companySettingsId) {
      const res = await GlobalApi.getCompanySettingsById(companySettingsId);
      const data = res?.data?.data ?? null;

      console.log("✅ API RESPONSE (BY ID):", data);
      normalizeAndSet(data);
    } else {
      const res = await GlobalApi.getAllCompanySettings(1, 10);

      console.log("✅ RAW API RESPONSE (ALL):", res?.data?.data);

      // ✅ Backend returns ONE SINGLE OBJECT, not an array
      const data = res?.data?.data ?? null;

      normalizeAndSet(data);
    }
  } catch (err) {
    console.error("fetchCompanySettings:", err);
    toast.error("Failed to fetch company settings");
    normalizeAndSet(null);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    // If parent gave a companySettingsId prop, use it; otherwise fetch all
    fetchCompanySettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companySettingsId]);

  // Parent-level operations -------------------------------------------------

  // Submit (create or update entire company settings)
  const handleSubmit = async () => {
    const payload = {
      socialMedia: {
        instagram: socialMedia.instagram || null,
        facebook: socialMedia.facebook || null,
        linkedin: socialMedia.linkedin || null,
        youtube: socialMedia.youtube || null,
        website: socialMedia.website || null,
        x: socialMedia.x || null,
        youtubeLinks: socialMedia.youtubeLinks || [],
      },
      contactInfo: {
        primaryPhone: contactInfo.primaryPhone || null,
        secondaryPhone: contactInfo.secondaryPhone || null,
        primaryEmail: contactInfo.primaryEmail || null,
        supportEmail: contactInfo.supportEmail || null,
        businessEmail: contactInfo.businessEmail || null,
        whatsappQRCode: contactInfo.whatsappQRCode || null,
        physicalAddress: contactInfo.physicalAddress || {
          street: null,
          city: null,
          state: null,
          zipCode: null,
          country: null,
        },
        businessHours: contactInfo.businessHours || null,
      },
    };

    setSaving(true);
    try {
      if (companyId) {
        await GlobalApi.updateCompanySettings(companyId, payload);
        toast.success("Company settings updated");
      } else {
        const res = await GlobalApi.createCompanySettings(payload);
        const newId = res?.data?.data?._id ?? res?.data?.data?.id ?? null;
        if (newId) {
          setCompanyId(newId);
          toast.success("Company settings created");
        } else {
          toast.success("Company settings created (no id returned)");
        }
      }

      // refresh data from server to get normalized format & server IDs for youtubeLinks
      await fetchCompanySettings();
      setIsEditing(false);
    } catch (err) {
      console.error("handleSubmit:", err);
      toast.error("Failed to save company settings");
    } finally {
      setSaving(false);
    }
  };

  // Delete entire company settings record
  const handleDelete = async () => {
    if (!companyId) {
      toast.error("No company settings to delete");
      return;
    }
    const confirmed = window.confirm("Delete company settings? This action cannot be undone.");
    if (!confirmed) return;

    setDeleting(true);
    try {
      await GlobalApi.deleteCompanySettings(companyId);
      toast.success("Company settings deleted");
      // reset local state
      setCompanyId(null);
      normalizeAndSet(null);
    } catch (err) {
      console.error("handleDelete:", err);
      toast.error("Failed to delete company settings");
    } finally {
      setDeleting(false);
    }
  };

  // YouTube links independent operations (use endpoints you gave)
  const handleAddYouTubeLink = async (payload) => {
    // payload: { title, url }
    if (!companyId) {
      toast.error("Create company settings first before adding YouTube links");
      return;
    }
    try {
      await GlobalApi.addYouTubeLink(companyId, payload);
      toast.success("YouTube link added");
      await fetchCompanySettings();
    } catch (err) {
      console.error("handleAddYouTubeLink:", err);
      toast.error("Failed to add YouTube link");
    }
  };

  const handleUpdateYouTubeLinks = async (payloadArray) => {
    // payloadArray - the API expects a put with the updated array
    if (!companyId) {
      toast.error("Create company settings first before updating YouTube links");
      return;
    }
    try {
      // call updateYouTubeLinks which PUTs the entire array
      await GlobalApi.updateYouTubeLinks(companyId, payloadArray);
      toast.success("YouTube links updated");
      await fetchCompanySettings();
    } catch (err) {
      console.error("handleUpdateYouTubeLinks:", err);
      toast.error("Failed to update YouTube links");
    }
  };

  const handleDeleteYouTubeLink = async () => {
    if (!companyId) {
      toast.error("No company settings to delete YouTube link from");
      return;
    }
    try {
      await GlobalApi.deleteYouTubeLink(companyId);
      toast.success("YouTube link deleted");
      await fetchCompanySettings();
    } catch (err) {
      console.error("handleDeleteYouTubeLink:", err);
      toast.error("Failed to delete YouTube link");
    }
  };

  // Helpers to let children update parent state locally (children will call these)
  // We pass these setters directly, but wrapping allows logging or normalization if needed
  const updateSocialMediaLocally = (partial) => {
    setSocialMedia((prev) => ({ ...prev, ...partial }));
  };

  const updateContactInfoLocally = (partial) => {
    // merge into contactInfo, allowing nested updates to physicalAddress too
    setContactInfo((prev) => {
      const merged = { ...prev, ...partial };
      if (partial.physicalAddress) {
        merged.physicalAddress = { ...prev.physicalAddress, ...partial.physicalAddress };
      }
      return merged;
    });
  };

  // Render -----------------------------------------------------------------
  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          isDark ? "bg-[#111A22] text-white" : "bg-gray-50 text-[#111A22]"
        }`}
      >
        <p className="text-gray-400">Loading company settings...</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 ${
        isDark ? "bg-[#111A22] text-white" : "bg-gray-50 text-[#111A22]"
      }`}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Company Settings</h1>
          <p className="text-gray-400 text-sm">
            Manage all your company information, social links & contact details
          </p>
        </div>

        {/* Controls: Edit / Save / Delete */}
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          ) : (
            <>
              <Button
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  // reset to fetched state
                  normalizeAndSet(companySettings);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </>
          )}

          <Button
            className="ml-2"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>

      {/* SOCIAL LINKS SECTION */}
      <section className="mb-12">
        <SocialLinksEditor
          theme={theme}
          // data props (children expect socialMedia / youtubeLinks props)
          socialMedia={socialMedia}
          youtubeLinks={socialMedia.youtubeLinks || []}
          // pass setters so child can write to parent-local state
          setSocialMedia={updateSocialMediaLocally}
          setYoutubeLinks={(arr) => updateSocialMediaLocally({ youtubeLinks: arr })}
          // pass editing flag so child can enable/disable inputs if you later add that prop
          isEditing={isEditing}
          // allow child to call independent youtube endpoints if UI includes that option
          addYouTubeLink={handleAddYouTubeLink}
          updateYouTubeLinks={handleUpdateYouTubeLinks}
          deleteYouTubeLink={handleDeleteYouTubeLink}
          // convenience callback for children to request re-fetch
          onRefresh={fetchCompanySettings}
          companySettingsId={companyId}
        />
      </section>

      {/* CONTACT DETAILS SECTION */}
      <section className="mb-12">
        <ContactPage
          theme={theme}
          companySettingsId={companyId}
          contactInfo={contactInfo}
          physicalAddress={contactInfo.physicalAddress || {}}
          // allow child to update parent-local contact state
          setContactInfo={updateContactInfoLocally}
          isEditing={isEditing}
          onRefresh={fetchCompanySettings}
        />
      </section>

      {/* BUSINESS DETAILS (optional) */}
      {companySettings?.physicalAddress && (
        <section className="mb-12">
          {/* leave BusinessDetails alone for now; it will receive physicalAddress if implemented */}
          <div />
        </section>
      )}
    </div>
  );
}
