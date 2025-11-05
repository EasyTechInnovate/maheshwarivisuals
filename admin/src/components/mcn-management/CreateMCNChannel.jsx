import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";

export default function CreateMCNChannelModal({
  isOpen,
  onClose,
  onSuccess,
  theme = "dark",
}) {
  const isDark = theme === "dark";

  const [requests, setRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [channelName, setChannelName] = useState("");
  const [channelLink, setChannelLink] = useState("");
  const [revenueShare, setRevenueShare] = useState("");
  const [channelManager, setChannelManager] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const bgColor = isDark ? "bg-[#111A22]" : "bg-white";
  const inputStyle = isDark
    ? "bg-[#151F28] border border-gray-800 text-gray-200"
    : "bg-gray-50 border border-gray-300 text-gray-900";

  useEffect(() => {
    if (isOpen) {
      fetchApprovedRequests();
    }
  }, [isOpen]);


  const fetchApprovedRequests = async () => {
    try {
      const res = await GlobalApi.getMcnRequests(1, 100);


      const maybeRequests =
        res?.data?.data?.requests ??
        res?.data?.data ??
        res?.data ??
        [];


      const requestsArray = Array.isArray(maybeRequests)
        ? maybeRequests
        :
        Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
            ? res.data
            : [];

      if (!Array.isArray(requestsArray)) {
        console.warn("CreateMCNChannelModal: requests is not an array, using empty list", {
          maybeRequests,
          res,
        });
        setRequests([]);
        return;
      }

      const approved = requestsArray.filter((r) => String(r.status).toLowerCase() === "approved");
      setRequests(approved);
    } catch (err) {
      console.error("❌ Error fetching MCN requests:", err);
      toast.error("Failed to load MCN requests");
      setRequests([]);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedRequestId("");
      setChannelName("");
      setChannelLink("");
      setRevenueShare("");
      setChannelManager("");
      setNotes("");
    }
  }, [isOpen]);


  const handleSubmit = async () => {
    if (!selectedRequestId) {
      toast.error("Please select an approved request first.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        channelName,
        channelLink,
        revenueShare: Number(revenueShare),
        channelManager,
        notes,
      };

      const res = await GlobalApi.createMcnChannel(selectedRequestId, payload);

      toast.success("MCN Channel created successfully!");
      onClose(res.data?.data || null);
    } catch (err) {
      console.error("❌ Channel creation error:", err);
      toast.error(err.response?.data?.message || "Failed to create MCN Channel");
    } finally {
      setLoading(false);
    }
  };



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-lg rounded-2xl border border-gray-800 shadow-md ${bgColor} ${isDark ? "text-gray-200" : "text-gray-900"
          }`}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Create New MCN Channel</DialogTitle>
          <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Set up a new MCN channel linked to an approved request
          </p>
        </DialogHeader>

        <div className="mt-5 space-y-4">

          <div>
            <label className={`block text-sm mb-1 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Approved Request
            </label>
            <Select value={selectedRequestId} onValueChange={setSelectedRequestId}>
              <SelectTrigger className={`w-full ${inputStyle} focus-visible:ring-0`}>
                <SelectValue placeholder="Select approved request" />
              </SelectTrigger>
              <SelectContent className={`${isDark ? "bg-[#151F28] text-gray-100" : ""}`}>
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <SelectItem key={req._id ?? req.id} value={req._id ?? req.id}>
                      {req.userAccountId ?? req.userAccount ?? "-"} — {req.youtubeChannelName ?? req.youtubeChannelId ?? "-"}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-sm text-gray-400">No approved requests found</div>
                )}
              </SelectContent>
            </Select>
          </div>


          <div>
            <label className={`block text-sm mb-1 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Channel Name
            </label>
            <Input
              placeholder="Enter channel name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className={`${inputStyle} focus-visible:ring-0`}
            />
          </div>


          <div>
            <label className={`block text-sm mb-1 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Channel Link
            </label>
            <Input
              placeholder="https://youtube.com/channel/UC1234567890"
              value={channelLink}
              onChange={(e) => setChannelLink(e.target.value)}
              className={`${inputStyle} focus-visible:ring-0`}
            />
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm mb-1 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Revenue Share (%)
              </label>
              <Input
                type="number"
                placeholder="e.g. 70"
                value={revenueShare}
                onChange={(e) => setRevenueShare(e.target.value)}
                className={`${inputStyle} focus-visible:ring-0`}
              />
            </div>
            <div>
              <label className={`block text-sm mb-1 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Channel Manager
              </label>
              <Input
                placeholder="Enter manager name"
                value={channelManager}
                onChange={(e) => setChannelManager(e.target.value)}
                className={`${inputStyle} focus-visible:ring-0`}
              />
            </div>
          </div>


          <div>
            <label className={`block text-sm mb-1 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Notes</label>
            <Textarea
              placeholder="Channel setup details or notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${inputStyle} min-h-[90px] focus-visible:ring-0`}
            />
          </div>


          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="secondary"
              onClick={onClose}
              className={`${isDark ? "bg-[#151F28] border border-gray-800 text-gray-300 hover:bg-[#1C2732]" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
              {loading ? "Creating..." : "Create Channel"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
