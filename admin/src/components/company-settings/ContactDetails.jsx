"use client";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Upload,
  Check,
  Save,
} from "lucide-react";
import { contactDetailsMock } from "../../pages/contact-details/ContactDetailsData";

export default function ContactPage({ theme = "dark" }) {
  const isDark = theme === "dark";

  // -------------------------
  // Helpers
  // -------------------------
  const isValidPhone = (v) => !!v && /^\+?[0-9][0-9\s\-()]{8,}$/.test(v);
  const isValidEmail = (v) => !!v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidUrl = (v) => !!v && /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(v);

  const wrap = (cls = "") =>
    `rounded-xl border ${
      isDark ? "bg-[#151F28] border-gray-700" : "bg-white border-gray-200"
    } ${cls}`;

  const inputBase =
    "w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500";
  const inputTheme = isDark
    ? "bg-[#0F1720] text-gray-200"
    : "bg-gray-100 text-[#111A22]";
  const badge = (ok) =>
    `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
      ok ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"
    }`;

  // -------------------------
  // States: Contact + Business
  // -------------------------
  const [phones, setPhones] = useState(
    contactDetailsMock.phones.map((p) => ({
      ...p,
      valid: isValidPhone(p.value),
    }))
  );
  const [emails, setEmails] = useState(
    contactDetailsMock.emails.map((e) => ({
      ...e,
      valid: isValidEmail(e.value),
    }))
  );
  const [qr, setQr] = useState(contactDetailsMock.qr);

  const [addresses, setAddresses] = useState(
    contactDetailsMock.addresses.map((a) => ({
      ...a,
      valid: Boolean(a.value.trim()),
    }))
  );
  const [website, setWebsite] = useState({
    ...contactDetailsMock.website,
    valid: isValidUrl(contactDetailsMock.website.value),
  });
  const [hours, setHours] = useState({
    ...contactDetailsMock.hours,
    valid: Boolean(contactDetailsMock.hours.value),
  });

  // Flags
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);

  const allValid = useMemo(() => {
    return (
      phones.every((p) => p.valid) &&
      emails.every((e) => e.valid) &&
      addresses.every((a) => a.valid) &&
      website.valid &&
      hours.valid
    );
  }, [phones, emails, addresses, website, hours]);

  // -------------------------
  // Update functions
  // -------------------------
  const updatePhone = (id, val) => {
    setTouched(true);
    setPhones((prev) =>
      prev.map((p) => (p.id === id ? { ...p, value: val, valid: isValidPhone(val) } : p))
    );
  };

  const updateEmail = (id, val) => {
    setTouched(true);
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, value: val, valid: isValidEmail(val) } : e))
    );
  };

  const handleQrUpload = (file) => {
    setTouched(true);
    const fileUrl = URL.createObjectURL(file);
    setQr({ ...qr, fileUrl, fileName: file.name });
  };

  const addAddress = () => {
    setTouched(true);
    setAddresses((prev) => [
      ...prev,
      { id: `addr-${Date.now()}`, label: "New Address", value: "", valid: false },
    ]);
  };

  const updateAddress = (id, val) => {
    setTouched(true);
    setAddresses((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, value: val, valid: Boolean(val.trim()) } : a
      )
    );
  };

  const updateWebsite = (val) => {
    setTouched(true);
    setWebsite({ ...website, value: val, valid: isValidUrl(val) });
  };

  const updateHours = (val) => {
    setTouched(true);
    setHours({ ...hours, value: val, valid: Boolean(val.trim()) });
  };

  // -------------------------
  // Save Handler
  // -------------------------
  const handleSaveAll = async () => {
    const payload = {
      phones: phones.map(({ id, value }) => ({ id, value })),
      emails: emails.map(({ id, value }) => ({ id, value })),
      qr: { id: qr.id, fileUrl: qr.fileUrl || null },
      addresses: addresses.map(({ id, value }) => ({ id, value })),
      website: { id: website.id, value: website.value },
      hours: { id: hours.id, value: hours.value },
    };

    try {
      setSaving(true);
      console.log("Combined Contact Page payload →", payload);
    } finally {
      setSaving(false);
      setTouched(false);
    }
  };

  // -------------------------
  // UI Rendering
  // -------------------------
  return (
    <div className={`space-y-8 ${isDark ? "text-white" : "text-[#111A22]"}`}>
      {/* Header */}
      <div className="flex items-start md:items-center justify-between pb-4">
        <div>
          <h1 className="text-2xl font-bold">Contact & Business Manager</h1>
          <p className="text-sm text-gray-400">
            Manage contact details and business information for your company
          </p>
        </div>
        
      </div>

      {/* ---------------- Phones ---------------- */}
      <Card className={wrap()}>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
          <Phone className="w-4 h-4 text-gray-400" />
          <span className="font-medium">Phone Numbers</span>
        </div>
        <CardContent className="p-4 space-y-4">
          {phones.map((p) => (
            <div key={p.id}>
              <label className="text-xs text-gray-400 block mb-2">{p.label}</label>
              <div className="relative">
                <input
                  type="tel"
                  value={p.value}
                  onChange={(e) => updatePhone(p.id, e.target.value)}
                  className={`${inputBase} ${inputTheme} pr-20`}
                />
                <span className={`absolute right-2 top-1/2 -translate-y-1/2 ${badge(p.valid)}`}>
                  <Check className="w-3 h-3" />
                  {p.valid ? "Valid" : "Invalid"}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ---------------- Email + QR ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Emails */}
        <Card className={wrap()}>
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="font-medium">Email Addresses</span>
          </div>
          <CardContent className="p-4 space-y-4">
            {emails.map((e) => (
              <div key={e.id}>
                <label className="text-xs text-gray-400 block mb-2">{e.label}</label>
                <div className="relative">
                  <input
                    type="email"
                    value={e.value}
                    onChange={(evt) => updateEmail(e.id, evt.target.value)}
                    className={`${inputBase} ${inputTheme} pr-20`}
                  />
                  <span
                    className={`absolute right-2 top-1/2 -translate-y-1/2 ${badge(e.valid)}`}
                  >
                    <Check className="w-3 h-3" />
                    {e.valid ? "Valid" : "Invalid"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* QR Upload */}
        <Card className={wrap()}>
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
            <Upload className="w-4 h-4 text-gray-400" />
            <span className="font-medium">WhatsApp QR</span>
          </div>
          <CardContent className="p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer ${
                isDark ? "border-gray-700" : "border-gray-300"
              }`}
            >
              {qr.fileUrl ? (
                <img src={qr.fileUrl} className="max-h-40 object-contain mb-3" />
              ) : (
                <Upload className="w-10 h-10 text-gray-400 mb-3" />
              )}

              <p className="text-sm text-gray-400">
                {qr.fileUrl ? qr.fileName : "Drop your Image file here"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supports PNG, JPG, DOC (Max 10MB)
              </p>

              <input
                type="file"
                accept=".png,.jpg,.jpeg,.doc,.docx"
                className="hidden"
                id="qrUpload"
                onChange={(e) =>
                  e.target.files[0] && handleQrUpload(e.target.files[0])
                }
              />
              <label
                htmlFor="qrUpload"
                className="mt-3 inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Choose File
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ---------------- Business Section ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Addresses */}
        <Card className={wrap()}>
          <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-700">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-300" />
                <span className="font-semibold text-[17px]">Physical Address</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Manage office and business addresses
              </p>
            </div>
            <Button onClick={addAddress} size="sm" variant="outline">
              + Add
            </Button>
          </div>
          <CardContent className="p-4 space-y-4">
            {addresses.map((a) => (
              <div key={a.id}>
                <label className="text-xs text-gray-400 block mb-2">{a.label}</label>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={a.value}
                    onChange={(e) => updateAddress(a.id, e.target.value)}
                    className={`${inputBase} ${inputTheme} pr-20 resize-none`}
                  />
                  <span className={`absolute right-2 top-2 ${badge(a.valid)}`}>
                    <Check className="w-3 h-3" />
                    {a.valid ? "Valid" : "Invalid"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Website + Hours */}
        <Card className={wrap()}>
          <div className="flex items-center gap-2 px-4 pt-4 pb-2 border-b border-gray-700">
            <Globe className="w-4 h-4 text-gray-400" />
            <span className="font-semibold text-[17px]">
              Website & Business Hours
            </span>
          </div>
          <CardContent className="p-4 space-y-4">
            <div>
              <label className="text-xs text-gray-400 block mb-2">
                Official Website
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={website.value}
                  onChange={(e) => updateWebsite(e.target.value)}
                  className={`${inputBase} ${inputTheme} pr-20`}
                />
                <span
                  className={`absolute right-2 top-1/2 -translate-y-1/2 ${badge(
                    website.valid
                  )}`}
                >
                  <Check className="w-3 h-3" />
                  {website.valid ? "Valid" : "Invalid"}
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-2">
                Business Hours
              </label>
              <textarea
                rows={3}
                value={hours.value}
                onChange={(e) => updateHours(e.target.value)}
                className={`${inputBase} ${inputTheme} resize-none`}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ---------------- Live Preview ---------------- */}
      <Card className={`${wrap()} mt-8`}>
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Contact Information Preview</h2>
          <p className="text-sm text-gray-400">
            This is how your contact information will appear to users
          </p>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phones */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-4 h-4 text-gray-400" />
                <h3 className="font-medium">Phone Numbers</h3>
              </div>
              <ul className="space-y-4 text-sm">
                {phones.map((p) => (
                  <li key={p.id}>
                    <p className="text-gray-400">{p.label}</p>
                    <p className="text-gray-200 font-medium">{p.value}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Emails */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-4 h-4 text-gray-400" />
                <h3 className="font-medium">Email Addresses</h3>
              </div>
              <ul className="space-y-4 text-sm">
                {emails.map((e) => (
                  <li key={e.id}>
                    <p className="text-gray-400">{e.label}</p>
                    <p className="text-gray-200 font-medium">{e.value}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address + Website + Hours */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-gray-400" />
                <h3 className="font-medium">Address & Website</h3>
              </div>
              <div className="space-y-4 text-sm">
                {addresses[0]?.value && (
                  <div>
                    <p className="text-gray-400">Office Address</p>
                    <p className="text-gray-200 font-medium">{addresses[0].value}</p>
                  </div>
                )}
                {website?.value && (
                  <div>
                    <p className="text-gray-400">Official Website</p>
                    <a
                      href={website.value}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-400 hover:underline font-medium"
                    >
                      {website.value}
                    </a>
                  </div>
                )}
                {hours?.value && (
                  <div>
                    <p className="text-gray-400">Business Hours</p>
                    <p className="text-gray-200 font-medium whitespace-pre-line">
                      {hours.value}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
