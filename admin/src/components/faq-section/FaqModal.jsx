import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { Switch } from "@/components/ui/switch";
import GlobalApi from "@/lib/GlobalApi";

const CATEGORY_OPTIONS = [
  "Upload Process",
  "Distribution",
  "Royalties",
  "Release Management",
  "Technical Support",
];

export default function FaqStatsModal({
  open,
  onClose,
  onCreated,
  onUpdated,
  theme,
  initialFaq = null,
  isEdit = false, 
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [status, setStatus] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");


  useEffect(() => {
    if (open && initialFaq && isEdit) {
      setQuestion(initialFaq.question || "");
      setAnswer(initialFaq.answer || "");
      setCategory(initialFaq.category || CATEGORY_OPTIONS[0]);
      setStatus(initialFaq.status ?? true);
      setDisplayOrder(initialFaq.displayOrder ?? 1);
      setFormError("");
    } else if (open && !isEdit) {
    
      setQuestion("");
      setAnswer("");
      setCategory(CATEGORY_OPTIONS[0]);
      setStatus(true);
      setDisplayOrder(1);
      setFormError("");
    }
  }, [open, initialFaq, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return setFormError("Question is required");
    if (!answer.trim()) return setFormError("Answer is required");

    setLoading(true);
    setFormError("");

    const payload = {
      question,
      answer,
      category,
      status,
      displayOrder: Number(displayOrder),
    };

    try {
      if (isEdit && initialFaq?._id) {
        
        const res = await GlobalApi.updateFaq(initialFaq._id, payload);
        const updatedFaq = res?.data?.data?.faq || res?.data?.data || payload;
        if (onUpdated && updatedFaq) onUpdated(updatedFaq);
      } else {
        
        const res = await GlobalApi.createFaq(payload);
        const createdFaq =
          res?.data?.data?.faq ||
          res?.data?.data?.faqs?.[0] ||
          res?.data?.data ||
          res?.data;
        if (onCreated && createdFaq) onCreated(createdFaq);
      }

      onClose();
    } catch (err) {
      console.error("❌ Error submitting FAQ:", err);
      setFormError(
        err?.response?.data?.message ||
          err?.response?.data?.errors?.[0]?.message ||
          (isEdit ? "Failed to update FAQ." : "Failed to create FAQ.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-2xl rounded-xl border ${
          theme === "dark"
            ? "bg-[#151F28] border-gray-700 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {isEdit ? "Edit FAQ" : "Create New FAQ"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div>
            <label className="text-sm block mb-1">Question</label>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter question"
              required
              className={
                theme === "dark"
                  ? "bg-[#1f2a37] text-white border-gray-700"
                  : ""
              }
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Answer</label>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter answer"
              rows={4}
              required
              className={
                theme === "dark"
                  ? "bg-[#1f2a37] text-white border-gray-700"
                  : ""
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm block mb-1">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  className={
                    theme === "dark"
                      ? "bg-[#1f2a37] text-white border-gray-700"
                      : ""
                  }
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent
                  className={
                    theme === "dark"
                      ? "bg-[#1f2a37] text-white border-gray-700"
                      : ""
                  }
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm block mb-1">Display Order</label>
              <Input
                type="number"
                min={1}
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                className={
                  theme === "dark"
                    ? "bg-[#1f2a37] text-white border-gray-700"
                    : ""
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Switch
                checked={status}
                onCheckedChange={setStatus}
                id="faq-status"
              />
              <label htmlFor="faq-status" className="text-sm">
                {status ? "Published" : "Draft"}
              </label>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={loading}
                className={
                  theme === "dark"
                    ? "text-gray-300 hover:bg-[#1f2a37]"
                    : "text-gray-700"
                }
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {loading
                  ? isEdit
                    ? "Updating..."
                    : "Creating..."
                  : isEdit
                  ? "Update FAQ"
                  : "Create FAQ"}
              </Button>
            </div>
          </div>

          {formError && <p className="text-red-500 text-sm">{formError}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
