import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function MCNRequestViewModal({
  open,
  onClose,
  data,
  theme = "dark",
  onApprove,
  onReject,
  processing,
}) {
  const [adminNotes, setAdminNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    if (data) {
      setAdminNotes(data.adminNotes || "");
      setRejectionReason(data.rejectionReason || "");
    } else {
      setAdminNotes("");
      setRejectionReason("");
    }
  }, [data]);

  if (!data) return null;

 
  const status = (data.status || "").toLowerCase();
  const isPending = status === "pending";
  const isApproved = status === "approve" || status === "approved";
  const isRejected = status === "reject" || status === "rejected";

  const isApproveMode = data.mode === "approve";
  const isRejectMode = data.mode === "reject";

  const bgColor = theme === "dark" ? "bg-[#151F28]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-800";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const mutedText = theme === "dark" ? "text-gray-400" : "text-gray-500";

  const handleApproveClick = () => {
    if (onApprove && data._id) {
      onApprove(data._id, adminNotes);
    }
  };

  const handleRejectClick = () => {
    if (onReject && data._id) {
      onReject(data._id, adminNotes, rejectionReason);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-lg rounded-xl ${bgColor} border ${borderColor} p-6`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-lg font-semibold ${
              isApproved
                ? "text-green-400"
                : isRejected
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {isApproved
              ? "Approved MCN Request"
              : isRejected
              ? "Rejected MCN Request"
              : isApproveMode
              ? "Approve MCN Request"
              : isRejectMode
              ? "Reject MCN Request"
              : "MCN Request Details"}
          </DialogTitle>
        </DialogHeader>

        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className={mutedText}>Channel Name</span>
            <span className={textColor}>{data.youtubeChannelName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className={mutedText}>Channel ID</span>
            <span className={textColor}>{data.youtubeChannelId}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className={mutedText}>Account ID</span>
            <span className={textColor}>{data.userAccountId}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className={mutedText}>Subscribers</span>
            <span className={textColor}>
              {data.subscriberCount?.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className={mutedText}>Status</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isApproved
                  ? "bg-green-500/20 text-green-400"
                  : isRejected
                  ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {isApproved
                ? "Approved"
                : isRejected
                ? "Rejected"
                : "Pending Review"}
            </span>
          </div>
        </div>

       
        <div className="mt-5 space-y-4">
          <div>
            <label className={`block text-sm mb-1 ${mutedText}`}>
              Admin Notes
            </label>
            <Textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              disabled={isApproved || isRejected || processing}
              placeholder="Enter admin notes..."
              className={`${bgColor} ${textColor} border ${borderColor}`}
            />
          </div>

          {(isRejectMode || isRejected) && (
            <div>
              <label className={`block text-sm mb-1 ${mutedText}`}>
                Rejection Reason
              </label>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                disabled={isApproved || isRejected || processing}
                placeholder="Enter reason for rejection..."
                className={`${bgColor} ${textColor} border ${borderColor}`}
              />
            </div>
          )}
        </div>

        
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={processing}>
            Close
          </Button>

         
          {isApproveMode && (
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={handleApproveClick}
              disabled={processing}
            >
              {processing ? "Processing..." : "Approve"}
            </Button>
          )}

          
          {isRejectMode && (
            <Button
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={handleRejectClick}
              disabled={processing}
            >
              {processing ? "Processing..." : "Reject"}
            </Button>
          )}

          
          {!isApproveMode && !isRejectMode && isPending && (
            <>
              <Button
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={handleApproveClick}
                disabled={processing}
              >
                {processing ? "Processing..." : "Approve"}
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={handleRejectClick}
                disabled={processing}
              >
                {processing ? "Processing..." : "Reject"}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
