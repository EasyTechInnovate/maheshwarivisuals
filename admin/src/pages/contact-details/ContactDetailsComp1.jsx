import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Save, Check, Upload } from "lucide-react";
import { contactDetailsMock } from "./ContactDetailsData";

const isValidPhone = (v) => !!v && /^\+?[0-9][0-9\s\-()]{8,}$/.test(v);
const isValidEmail = (v) => !!v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function ContactDetailsManager({
  theme = "dark",
  initialData = contactDetailsMock,
  onSave,
}) {
  const isDark = theme === "dark";

  const [phones, setPhones] = useState(
    initialData?.phones?.map((p) => ({ ...p, valid: isValidPhone(p.value) })) ?? []
  );
  const [emails, setEmails] = useState(
    initialData?.emails?.map((e) => ({ ...e, valid: isValidEmail(e.value) })) ?? []
  );
  const [qr, setQr] = useState(initialData?.qr ?? {});

  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState(false);

  const allValid = useMemo(
    () =>
      phones.every((p) => p.valid) &&
      emails.every((e) => e.valid) &&
      (!!qr.fileUrl || !qr.required),
    [phones, emails, qr]
  );

  const updatePhone = (id, value) => {
    setTouched(true);
    setPhones((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, value, valid: isValidPhone(value) } : p
      )
    );
  };

  const updateEmail = (id, value) => {
    setTouched(true);
    setEmails((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, value, valid: isValidEmail(value) } : e
      )
    );
  };

  const handleQrUpload = (file) => {
    setTouched(true);
    const fileUrl = URL.createObjectURL(file);
    setQr({ ...qr, fileUrl, fileName: file.name });
  };

  const handleSave = async () => {
    const payload = {
      phones: phones.map(({ id, value }) => ({ id, value })),
      emails: emails.map(({ id, value }) => ({ id, value })),
      qr: { id: qr.id, fileUrl: qr.fileUrl },
    };
    try {
      setSaving(true);
      if (onSave) {
        await onSave(payload);
      } else {
        console.log("ContactDetails payload →", payload);
      }
    } finally {
      setSaving(false);
      setTouched(false);
    }
  };

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

  return (
    <div className={isDark ? "text-white" : "text-[#111A22]"}>
      {/* Header */}
      <div className="flex items-start md:items-center justify-between pb-4">
        <div>
          <h1 className="text-2xl font-bold">Contact Details Manager</h1>
          <p className="text-sm text-gray-400">
            Manage contact information and business details for Maheshwari Visuals
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={!touched || !allValid || saving}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Phone Numbers card */}
      <Card className={wrap()}>
        <div
          className={`flex items-center justify-between px-4 py-3 border-b ${
            isDark ? "border-[#151F28]" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="font-medium">Phone Numbers</span>
          </div>
        </div>

        <CardContent className="p-4 space-y-4">
          {phones.map((p) => (
            <div key={p.id}>
              <label className="text-xs text-gray-400 block mb-2">
                {p.label}
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={p.value}
                  onChange={(e) => updatePhone(p.id, e.target.value)}
                  className={`${inputBase} ${inputTheme} pr-20`}
                  placeholder="+91 98765 43210"
                />
                <span
                  className={`absolute right-2 top-1/2 -translate-y-1/2 ${badge(
                    p.valid
                  )}`}
                >
                  <Check className="w-3 h-3" />
                  {p.valid ? "Valid" : "Invalid"}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

           {/* Email + WhatsApp QR side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Email Addresses card */}
        <Card className={wrap()}>
          <div
            className={`flex items-center justify-between px-4 py-3 border-b ${
              isDark ? "border-[#151F28]" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">Email Addresses</span>
            </div>
          </div>

          <CardContent className="p-4 space-y-4">
            {emails.map((e) => (
              <div key={e.id}>
                <label className="text-xs text-gray-400 block mb-2">
                  {e.label}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={e.value}
                    onChange={(evt) => updateEmail(e.id, evt.target.value)}
                    className={`${inputBase} ${inputTheme} pr-20`}
                    placeholder="example@domain.com"
                  />
                  <span
                    className={`absolute right-2 top-1/2 -translate-y-1/2 ${badge(
                      e.valid
                    )}`}
                  >
                    <Check className="w-3 h-3" />
                    {e.valid ? "Valid" : "Invalid"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* WhatsApp QR Upload card */}
        <Card className={wrap()}>
          <div
            className={`flex items-center justify-between px-4 py-3 border-b ${
              isDark ? "border-[#151F28]" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">Update your WhatsApp QR</span>
            </div>
          </div>

          <CardContent className="p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer ${
                isDark ? "border-gray-700" : "border-gray-300"
              }`}
            >
              {qr.fileUrl ? (
                <img
                  src={qr.fileUrl}
                  alt="WhatsApp QR"
                  className="max-h-40 object-contain mb-3"
                />
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

    </div>
  );
}
