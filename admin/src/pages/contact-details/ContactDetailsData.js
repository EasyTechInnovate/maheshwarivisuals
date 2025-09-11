// ContactDetailsData.js
export const contactDetailsMock = {
  phones: [
    { id: "primary", label: "Primary Phone Number", value: "+91 98765 43210" },
    { id: "secondary", label: "Secondary Phone Number", value: "+91 87654 32109" },
  ],
  emails: [
    { id: "primary", label: "Primary Email", value: "info@maheshwarivisuals.com" },
    { id: "support", label: "Support Email", value: "support@maheshwarivisuals.com" },
    { id: "business", label: "Business Email", value: "business@maheshwarivisuals.com" },
  ],
  qr: {
    id: "whatsapp",
    label: "WhatsApp QR",
    fileUrl: "",
    fileName: "",
  },

  // ✅ New data for the Address + Website & Hours section
  addresses: [
    {
      id: "office",
      label: "Office Address",
      value:
        "123 Music Street, Entertainment District, Mumbai, Maharashtra 400001, India",
    },
  ],
  website: {
    id: "official",
    label: "Official Website",
    value: "https://maheshwarivisuals.com",
  },
  hours: {
    id: "business-hours",
    label: "Business Hours",
    value:
      "Monday - Friday: 9:00 AM - 6:00 PM IST\nSaturday: 10:00 AM - 4:00 PM IST\nSunday: Closed",
  },


};
