import React, { useEffect, useRef, useState } from "react";
import { Upload, Download, Edit, User, ArrowLeft } from "lucide-react";

const MOCK_USER = {
  id: "mock-1",
  channelName: "Badmash",
  channelLink: "https://www.youtube.com/channel/UC123456789",
  subscribersCount: 12400,
  totalViews28d: 45123,
  monetizationEligibility: "Active",
  adsenseEnabled: "mukulparemar470@gmail.com",
  copyrightStrikes: 0,
  contentLicensed: "Yes",
  partOfAnotherMCN: "No",
  anotherMCNName: "",
  revenueMonth: "12 July 2025",
  revenueType: "Pro",
  supportingFiles: [],
};

export default function MCNInfoForm({
  userId = null,
  theme = "dark",
  fetchUser = null,
  saveUser = null,
  deleteUser = null,
  exportCSV = null,
  onBack = null, // <-- NEW
}) {
  const isDark = theme === "dark";

  const _fetchUser = fetchUser || (async (id) => ({ ...(MOCK_USER), id: id ?? MOCK_USER.id }));
  const _saveUser = saveUser || (async (payload) => ({ ok: true, payload }));
  const _deleteUser = deleteUser || (async (id) => ({ ok: true, id }));
  const _exportCSV = exportCSV || (async (id) => ({ ok: true, id }));

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [filesForSlot, setFilesForSlot] = useState([[], []]);

  const fileInput0 = useRef(null);
  const fileInput1 = useRef(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const u = await _fetchUser(userId);
        if (!mounted) return;
        setData(u || null);
      } catch (err) {
        console.error("fetchUser error", err);
        setData(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, [userId]);

  const safe = (v) => (v === null || v === undefined ? "" : v);
  const setField = (k, v) => setData((s) => ({ ...(s || {}), [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...(data || {}), supportingFiles: filesForSlot };
      await _saveUser(payload);
      alert("Saved (mock or real). Hook saveUser to persist.");
    } catch (err) {
      console.error(err);
      alert("Save failed — check console");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!data?.id) return;
    if (!confirm("Are you sure you want to delete this user?")) return;
    setDeleting(true);
    try {
      await _deleteUser(data.id);
      alert("Deleted (mock or real). Hook deleteUser to persist.");
      setData(null);
    } catch (err) {
      console.error(err);
      alert("Delete failed — check console");
    } finally {
      setDeleting(false);
    }
  };

  const handleExport = async () => {
    try {
      await _exportCSV(data?.id);
      alert("Export initiated (mock).");
    } catch (err) {
      console.error(err);
      alert("Export failed — check console");
    }
  };

  const onFilesPicked = (slot, fileList) => {
    const arr = fileList ? Array.from(fileList) : [];
    setFilesForSlot((prev) => {
      const next = [...(prev || [[], []])];
      next[slot] = arr;
      return next;
    });
  };

  const onDrop = (e, slot) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length) onFilesPicked(slot, e.dataTransfer.files);
  };

  const bg = isDark ? "bg-gray-900 text-slate-300" : "bg-white text-[#151F28]";
  const card = isDark ? "bg-gray-900" : "bg-white";
  const border = isDark ? "border-[#12212a]" : "border-gray-200";
  const muted = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`${bg} p-6 min-h-screen`}>
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-500 hover:bg-gray-800 text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
            <div>
              <h1 className="text-2xl font-semibold">
                MCN Information - {safe(data?.channelName) || "Loading..."}
              </h1>
              <p className={`text-sm mt-1 ${muted}`}>
                Manage artists, labels, and aggregators in Maheshwari Visuals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className={`px-3 py-2 rounded-md border ${border} bg-transparent text-sm inline-flex items-center gap-2`}
            >
              <Download className="w-4 h-4" /> Export CSV/Excel
            </button>
            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white text-sm inline-flex items-center gap-2">
              <User className="w-4 h-4" /> User Wallet
            </button>
          </div>
        </div>

        {/* The form card */}
        <div className={`rounded-xl p-6 ${card} border ${border} shadow`}>
          {loading ? (
            <div className="py-10 text-center">Loading...</div>
          ) : (
            <>
              {/* Two column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left */}
                <div className="space-y-4">
                  <LabeledInput label="YouTube Channel Name" value={safe(data?.channelName)} onChange={(v) => setField("channelName", v)} />
                  <LabeledInput label="Subscribers Count" value={safe(data?.subscribersCount)} onChange={(v) => setField("subscribersCount", v)} />
                  <LabeledInput label="Monetization Eligibility" value={safe(data?.monetizationEligibility)} onChange={(v) => setField("monetizationEligibility", v)} />
                  <LabeledInput label="Have you received any copyright strikes?" value={safe(data?.copyrightStrikes)} onChange={(v) => setField("copyrightStrikes", v)} />
                  <LabeledInput label="Are you part of another MCN currently?" value={safe(data?.partOfAnotherMCN)} onChange={(v) => setField("partOfAnotherMCN", v)} />
                  <LabeledInput label="YouTube Channel Revenue in Last Month" value={safe(data?.revenueMonth)} onChange={(v) => setField("revenueMonth", v)} />
                </div>

                {/* Right */}
                <div className="space-y-4">
                  <LabeledInput label="YouTube Channel Link" value={safe(data?.channelLink)} onChange={(v) => setField("channelLink", v)} />
                  <LabeledInput label="Total Views in past 28 days" value={safe(data?.totalViews28d)} onChange={(v) => setField("totalViews28d", v)} />
                  <LabeledInput label="Is AdSense Enabled?" value={safe(data?.adsenseEnabled)} onChange={(v) => setField("adsenseEnabled", v)} />
                  <LabeledInput label="Is your content 100% original or properly licensed?" value={safe(data?.contentLicensed)} onChange={(v) => setField("contentLicensed", v)} />
                  <LabeledInput label="If yes, Name" value={safe(data?.anotherMCNName)} onChange={(v) => setField("anotherMCNName", v)} />
                  <LabeledInput label="YouTube Channel Revenue Label" value={safe(data?.revenueType)} onChange={(v) => setField("revenueType", v)} />
                </div>
              </div>

              {/* Supporting Materials */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Supporting Materials</h3>
                <p className={`text-sm ${muted} mt-1`}>
                  Upload channel analytics screenshots (last 30 days)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <FileDrop title="Upload Channel Analytics Screenshot (Last 30 Days)" slot={0} files={filesForSlot[0]} onPick={(f) => onFilesPicked(0, f)} onDrop={(e) => onDrop(e, 0)} inputRef={fileInput0} />
                  <FileDrop title="Upload Channel Analytics Screenshot (Last 30 Days)" slot={1} files={filesForSlot[1]} onPick={(f) => onFilesPicked(1, f)} onDrop={(e) => onDrop(e, 1)} inputRef={fileInput1} />
                </div>
              </div>

              {/* Save + Delete */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <button onClick={handleSave} disabled={saving} className="px-12 py-3 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white font-medium shadow">
                  {saving ? "Saving..." : "Save"}
                </button>
                <button onClick={handleDelete} disabled={deleting} className="px-8 py-3 rounded-md border border-gray-700 text-sm text-gray-300 bg-transparent">
                  {deleting ? "Deleting..." : "Delete User"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function LabeledInput({ label, value, onChange }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-gray-400">{label}</label>
        <Edit className="w-4 h-4 opacity-60" />
      </div>
      <input value={value ?? ""} onChange={(e) => onChange && onChange(e.target.value)} className="w-full rounded-md px-3 py-2 text-sm bg-transparent border border-gray-700" />
    </div>
  );
}

function FileDrop({ title, files = [], onPick, onDrop, slot = 0, inputRef }) {
  return (
    <div onDrop={onDrop} onDragOver={(e) => e.preventDefault()} className="rounded-lg border border-gray-700 p-4 bg-transparent">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium">{title}</div>
        <button type="button" onClick={() => inputRef?.current?.click?.()} className="px-3 py-1 rounded-md bg-gray-800 text-xs inline-flex items-center gap-2">
          <Upload className="w-4 h-4" /> Edit File
        </button>
      </div>

      <input ref={inputRef} type="file" className="hidden" onChange={(e) => onPick && onPick(e.target.files)} multiple />
      <div className="min-h-[120px] flex flex-col items-center justify-center text-center text-sm text-gray-400 border-2 border-dashed border-gray-700 rounded-md">
        <div className="py-6">
          <div className="mb-2">Drop your analytics screenshot here</div>
          <div className="text-xs text-gray-500">Supports JPG, PNG, PDF (max 10MB)</div>
        </div>
        {files && files.length > 0 && (
          <div className="w-full mt-3">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-800/30 rounded px-3 py-2 mt-2 text-xs">
                <div className="truncate pr-4">{f.name}</div>
                <div className="text-gray-400">{Math.round((f.size || 0) / 1024)} KB</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
