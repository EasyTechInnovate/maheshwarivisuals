import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Check, Plus } from "lucide-react";
import { contactDetailsMock } from "./ContactDetailsData";

const isValidUrl = (v) => !!v && /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(v);

export default function BusinessDetailsSection({
  theme = "dark",
  initialData = contactDetailsMock,
  onSave,
}) {
  const isDark = theme === "dark";

  const [addresses, setAddresses] = useState(
    initialData?.addresses?.map((a) => ({
      ...a,
      valid: Boolean(a?.value?.trim()),
    })) ?? []
  );
  const [website, setWebsite] = useState({
    ...initialData?.website,
    valid: isValidUrl(initialData?.website?.value),
  });
  const [hours, setHours] = useState({
    ...initialData?.hours,
    valid: Boolean(initialData?.hours?.value),
  });

  const [touched, setTouched] = useState(false);

  const allValid = useMemo(
    () => addresses.every((a) => a.valid) && website.valid && hours.valid,
    [addresses, website, hours]
  );

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

  const addAddress = () => {
    setTouched(true);
    setAddresses((prev) => [
      ...prev,
      {
        id: `addr-${Date.now()}`,
        label: "New Address",
        value: "",
        valid: false,
      },
    ]);
  };

  const updateAddress = (id, value) => {
    setTouched(true);
    setAddresses((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, value, valid: Boolean(value.trim()) } : a
      )
    );
  };

  const updateWebsite = (value) => {
    setTouched(true);
    setWebsite({ ...website, value, valid: isValidUrl(value) });
  };

  const updateHours = (value) => {
    setTouched(true);
    setHours({ ...hours, value, valid: Boolean(value.trim()) });
  };

  const handleSave = async () => {
    if (!onSave) return;
    const payload = {
      addresses: addresses.map(({ id, value }) => ({ id, value })),
      website: { id: website.id, value: website.value },
      hours: { id: hours.id, value: hours.value },
    };
    await onSave(payload);
    setTouched(false);
  };

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ${
        isDark ? "text-white" : "text-[#111A22]"
      }`}
    >
      {/* Left: Physical Address */}
      <Card className={wrap()}>
        <div
          className={`flex items-center justify-between px-4 pt-4 pb-2 border-b ${
            isDark ? "border-[#151F28]" : "border-gray-200"
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-300" />
              <span className="font-semibold text-[17px]">
                Physical Address
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Manage office and business addresses
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={addAddress}
            className="text-xs flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Add New Address
          </Button>
        </div>

        <CardContent className="p-4 space-y-4">
          {addresses.map((a) => (
            <div key={a.id}>
              <label className="text-xs text-gray-400 block mb-2">
                {a.label}
              </label>
              <div className="relative">
                <textarea
                  rows={2}
                  value={a.value}
                  onChange={(e) => updateAddress(a.id, e.target.value)}
                  className={`${inputBase} ${inputTheme} pr-20 resize-none`}
                  placeholder="Enter office address"
                />
                <span
                  className={`absolute right-2 top-2 ${badge(a.valid)}`}
                >
                  <Check className="w-3 h-3" />
                  {a.valid ? "Valid" : "Invalid"}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Right: Website + Hours */}
      <Card className={wrap()}>
        <div
          className={`flex items-center justify-between px-4 pt-4 pb-2 border-b ${
            isDark ? "border-[#151F28]" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <span className="font-semibold text-[17px]">
              Website & Business Hours
            </span>
          </div>
        </div>

        <CardContent className="p-4 space-y-4">
          {/* Website */}
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
                placeholder="https://example.com"
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

          {/* Hours */}
          <div>
            <label className="text-xs text-gray-400 block mb-2">
              Business Hours
            </label>
            <textarea
              rows={3}
              value={hours.value}
              onChange={(e) => updateHours(e.target.value)}
              className={`${inputBase} ${inputTheme} resize-none`}
              placeholder="e.g. Mon - Fri: 9AM - 6PM"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
