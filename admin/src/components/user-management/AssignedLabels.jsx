import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import AssignSublabelModal from "./AssignSublabelModal";

export default function AssignedSublabels({ isOpen, onClose, theme, userId }) {
  const isDark = theme === "dark";

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [sublabels, setSublabels] = useState([]);
  const [loading, setLoading] = useState(false);

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null,
  });

  // Fetch assigned sublabels
  const fetchUserAssignedSublabels = async () => {
    try {
      setLoading(true);
      const res = await GlobalApi.getUserSubLabels(userId);

      const data = res.data.data;
      setUserName(data.user?.name || "User");

      // API returns array with "id", not "_id"
      setSublabels(data.sublabels || []);
    } catch (err) {
      console.error("❌ Error fetching assigned sublabels:", err);
      toast.error("Failed to load user sublabels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchUserAssignedSublabels();
  }, [isOpen]);

  // Toggle display (using isDefault for now)
  const handleToggle = async (sublabelId, value) => {
    try {
      // Adjust API call based on your backend need
      await GlobalApi.assignUserToSubLabel(sublabelId, { userId });

      toast.success("Updated assignment");

      setSublabels((prev) =>
        prev.map((item) =>
          item.id === sublabelId ? { ...item, isDefault: value } : item
        )
      );
    } catch (err) {
      toast.error("Failed to update assignment");
      console.error(err);
    }
  };

  // Remove user from sublabel
  const handleRemove = async () => {
    try {
      await GlobalApi.removeSubLabelFromUser(deleteDialog.id, { userId });
      toast.success("User removed from sublabel");

      setDeleteDialog({ open: false, id: null });
      fetchUserAssignedSublabels();
    } catch (err) {
      toast.error("Failed to remove sublabel");
      console.error(err);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className={`max-w-5xl rounded-2xl p-6 ${
            isDark
              ? "bg-[#111A22] text-white border border-gray-800"
              : "bg-white text-gray-900 border border-gray-200"
          }`}
        >
          <DialogHeader className="flex flex-row items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold">
                {userName}'s Sublabels
              </DialogTitle>

              <DialogDescription
                className={`mt-1 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Manage label assignments for this user.
              </DialogDescription>
            </div>

            <Button
              onClick={() => setIsAssignModalOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90"
            >
              Assign Sublabel
            </Button>
          </DialogHeader>

          {/* Table */}
          <div
            className={`mt-6 border ${
              isDark ? "border-gray-700" : "border-gray-200"
            } rounded-lg overflow-hidden`}
          >
            <table className="w-full">
              <thead
                className={`text-sm ${
                  isDark
                    ? "bg-[#1A242C] text-gray-300"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Label Name</th>
                  <th className="py-3 px-4 text-left">Membership</th>
                  {/* <th className="py-3 px-4 text-center">Display</th> */}
                  <th className="py-3 px-4 text-center">Remove</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : sublabels.length > 0 ? (
                  sublabels.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`text-sm ${
                        isDark
                          ? "border-b border-gray-700"
                          : "border-b border-gray-200"
                      }`}
                    >
                      <td className="py-3 px-4">{index + 1}</td>

                      <td className="py-3 px-4">{item.name}</td>

                      <td className="py-3 px-4 capitalize">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.membershipStatus === "active"
                              ? isDark
                                ? "bg-green-500/20 text-green-300"
                                : "bg-green-100 text-green-700"
                              : isDark
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.membershipStatus}
                        </span>
                      </td>

                      {/* <td className="py-3 px-4 text-center">
                        <Switch
                          checked={item.isDefault}
                          onCheckedChange={(v) => handleToggle(item.id, v)}
                        />
                      </td> */}

                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() =>
                            setDeleteDialog({ open: true, id: item.id })
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-400">
                      No sublabels assigned.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Remove Confirmation */}
          {deleteDialog.open && (
            <ConfirmDialog
              theme={theme}
              title="Remove Sublabel From User?"
              message="This will unassign the sublabel from the selected User."
              confirmLabel="Remove"
              onCancel={() => setDeleteDialog({ open: false, id: null })}
              onConfirm={handleRemove}
            />
          )}

          {/* Assign Sublabel Modal */}
          <AssignSublabelModal
            isOpen={isAssignModalOpen}
            onClose={() => setIsAssignModalOpen(false)}
            theme={theme}
            userId={userId}
            onAssigned={() => fetchUserAssignedSublabels()}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
