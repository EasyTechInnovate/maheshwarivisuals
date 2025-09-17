import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export default function SyncLicenseReviewModal({ isOpen, onClose, data = {}, theme = "dark" }) {
  const isDark = theme === "dark";
  const textColor = isDark ? "text-gray-300" : "text-gray-900";
  const bgColor = isDark ? "bg-gray-900 text-gray-200" : "bg-white text-[#151F28]";

  const [reviewNotes, setReviewNotes] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setReviewNotes("");
    }
  }, [isOpen]);

  const handleApprove = () => {
    console.log("Approved with notes:", reviewNotes);
    // Placeholder for future API integration
    onClose();
  };

  const handleReject = () => {
    console.log("Rejected with notes:", reviewNotes);
    // Placeholder for future API integration
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl rounded-lg ${bgColor}`}>
        <DialogHeader>
          <DialogTitle>
            Sync License Request - {data.trackName || "Unknown Track"}
          </DialogTitle>
          <p className="text-sm text-gray-400">
            Review and manage synchronization license request
          </p>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p><strong>Track Name:</strong><br />{data.trackName}</p>
            <p><strong>Project Name:</strong><br />{data.projectName}</p>
            <p><strong>License Type:</strong><br />
              <Badge variant="destructive">{data.licenseType}</Badge>
            </p>
            <p><strong>Territory:</strong><br />{data.territory}</p>
            <p><strong>Start Date:</strong><br />{data.startDate}</p>
            <p><strong>Contact Email:</strong><br />{data.contactEmail}</p>
            <p><strong>Usage:</strong><br />{data.usage}</p>
          </div>

          <div>
            <p><strong>Artist:</strong><br />{data.artistName}</p>
            <p><strong>Project Type:</strong><br />{data.projectType}</p>
            <p><strong>License Value:</strong><br />{data.licenseValue}</p>
            <p><strong>Duration:</strong><br />{data.duration}</p>
            <p><strong>End Date:</strong><br />{data.endDate}</p>
            <p><strong>Status:</strong><br />
              <Badge variant="secondary">{data.status}</Badge>
            </p>
            <p><strong>Description:</strong><br />{data.description}</p>
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium">Add Review Notes</label>
          <Textarea
            placeholder="Enter your review notes..."
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="secondary" onClick={handleReject} className="bg-red-600 hover:bg-red-500 text-white">
            ✕ Reject
          </Button>
          <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-500 text-white">
            ✓ Approve License
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
