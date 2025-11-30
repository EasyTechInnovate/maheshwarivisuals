import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function AssignSublabelModal({
  isOpen,
  onClose,
  theme,
  userId,
  onAssigned,
}) {
  const isDark = theme === "dark";

  const [allSublabels, setAllSublabels] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);

  // Normalize API response to an array safely
  const normalizeSublabels = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    // common shapes: { data: [...] }, { sublabels: [...] }, { items: [...] }
    if (Array.isArray(data.sublabels)) return data.sublabels;
    if (Array.isArray(data.items)) return data.items;
    // if it's an object with numeric keys or values that are objects, try values
    if (typeof data === "object") {
      const vals = Object.values(data).filter(Boolean);
      // prefer array-valued properties
      for (const v of vals) {
        if (Array.isArray(v)) return v;
      }
      // fallback: if values look like single sublabel objects, return them
      if (vals.length && typeof vals[0] === "object" && !Array.isArray(vals[0])) {
        return vals;
      }
    }
    return [];
  };

  // Fetch all sublabels (API exists on your backend)
  const fetchAll = async () => {
    try {
      const res = await GlobalApi.getAllSubLabels();
      // defensive access: res?.data?.data or res?.data
      const payload = res?.data?.data ?? res?.data ?? res;
      const list = normalizeSublabels(payload);
      setAllSublabels(list);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load sublabels");
      setAllSublabels([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedId(""); // reset selection when opening
      fetchAll();
    }
  }, [isOpen]);

  const handleAssign = async () => {
    if (!selectedId) {
      return toast.error("Please select a sublabel");
    }

    setLoading(true);
    try {
      await GlobalApi.assignSubLabelToUser(selectedId, {
        userId,
        isDefault: false,
      });

      toast.success("Sublabel assigned");
      if (typeof onAssigned === "function") onAssigned();
      onClose();
    } catch (err) {
      toast.error("Failed to assign sublabel");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-md rounded-2xl p-6 ${
          isDark
            ? "bg-[#111A22] text-white border border-gray-700"
            : "bg-white text-gray-900 border border-gray-200"
        }`}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Assign Sublabel
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <label className="text-sm mb-2 block">Select Sublabel</label>
          <select
            className={`w-full px-3 py-2 rounded-lg border outline-none ${
              isDark
                ? "bg-[#1A242C] border-gray-700 text-gray-200"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="">Select...</option>

            {/* guard: ensure allSublabels is an array before mapping */}
            {Array.isArray(allSublabels) &&
              allSublabels.map((s) => {
                // handle both _id and id
                const id = s._id ?? s.id ?? s.value ?? "";
                const name = s.name ?? s.label ?? s.title ?? String(id);
                return (
                  <option key={id || name} value={id}>
                    {name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className={isDark ? "border-gray-600 text-gray-300" : ""}
          >
            Cancel
          </Button>

          <Button
            disabled={loading}
            onClick={handleAssign}
            className="bg-gradient-to-r from-purple-500 to-purple-700"
          >
            {loading ? "Assigning..." : "Assign"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
