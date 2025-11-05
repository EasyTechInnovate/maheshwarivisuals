"use client";
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
import { Pencil } from "lucide-react";
import CreateSublabelModal from "./CreateSublabelModal";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";

export default function ManageLabelsModal({
  isOpen,
  onClose,
  theme,
  userId,
  userName,
}) {
  const isDark = theme === "dark";
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sublabels, setSublabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
  });

  // Fetch sublabels
  const fetchSublabels = async (currentPage = 1) => {
    try {
      setLoading(true);
      const res = await GlobalApi.getAllSubLabels(currentPage, 10);
      const { sublabels, pagination } = res.data.data;
      setSublabels(sublabels || []);
      setPagination(pagination || { totalPages: 1, totalItems: 0 });
    } catch (err) {
      console.error("❌ Error fetching sublabels:", err);
      toast.error("Failed to load sublabels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchSublabels(page);
  }, [isOpen, page]);

  const handleOpenCreate = () => setIsCreateModalOpen(true);
  const handleCloseCreate = (shouldRefresh = false) => {
    setIsCreateModalOpen(false);
    if (shouldRefresh) fetchSublabels(page);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-5xl rounded-2xl p-6 ${
          isDark
            ? "bg-[#111A22] text-white border border-gray-800"
            : "bg-white text-gray-900 border border-gray-200"
        }`}
      >
        {/* Header Section */}
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-lg font-semibold">
              Manage Sublabels
            </DialogTitle>
            <DialogDescription
              className={`mt-1 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              View and manage label assignments for this user.
            </DialogDescription>
          </div>
          <Button
            onClick={handleOpenCreate}
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90"
          >
            Add New Label
          </Button>
        </DialogHeader>

        {/* Table Section */}
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
                <th className="py-3 px-4 text-left">Membership Status</th>
                <th className="py-3 px-4 text-center">Assigned Users</th>
                <th className="py-3 px-4 text-center">Action</th>
                <th className="py-3 px-4 text-center">Display</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-400 text-sm"
                  >
                    Loading sublabels...
                  </td>
                </tr>
              ) : sublabels.length > 0 ? (
                sublabels.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`text-sm ${
                      isDark
                        ? "border-b border-gray-700"
                        : "border-b border-gray-200"
                    }`}
                  >
                    <td className="py-3 px-4">{index + 1 + (page - 1) * 10}</td>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          item.membershipStatus === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.membershipStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.assignedUsersCount || 0}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        className="hover:text-purple-400"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Switch checked={item.isActive} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-400 text-sm"
                  >
                    No sublabels found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <p className="text-gray-400">
            Showing {(page - 1) * 10 + 1}–
            {Math.min(page * 10, pagination.totalItems)} of{" "}
            {pagination.totalItems}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              disabled={page >= pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* Create Sublabel Modal */}
      <CreateSublabelModal
        open={isCreateModalOpen}
        onClose={handleCloseCreate}
        theme={theme}
        userId={userId}
        userName={userName}
      />
    </Dialog>
  );
}
