import React, { useState } from "react";
import { X, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadToImageKit } from "@/lib/imageUpload"; // your upload tool

export default function AttachmentModal({
  isOpen,
  onClose,
  theme = "dark",
  onSaveDraft,
}) {
  const isDark = theme === "dark";
  const [files, setFiles] = useState([]); // ← final uploaded attachments

  const vars = isDark
    ? {
        "--bg-main": "#111A22",
        "--text": "#DDE6EE",
        "--muted": "#96A0AB",
        "--surface": "#151F28",
      }
    : {
        "--bg-main": "#FFFFFF",
        "--text": "#0B1720",
        "--muted": "#5A6B73",
        "--surface": "#F3F4F6",
      };

  if (!isOpen) return null;

  /** Convert ImageKit response → backend schema */
  const convertIKToAttachment = (ik) => {
    return {
      fileName: ik.name,
      fileUrl: ik.url,
      fileSize: ik.size,
    };
  };

  /** Handle upload */
  const handleFileSelect = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    for (let file of selectedFiles) {
      try {
        // Upload to ImageKit
        const uploaded = await uploadToImageKit(file, "ticket-attachments");

        // Convert to backend-ready attachment
        const formatted = convertIKToAttachment(uploaded);

        // Save to state
        setFiles((prev) => [...prev, formatted]);

      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSaveDraft(files); // send uploaded attachments to parent
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-[999]"
      style={vars}
    >
      <div
        className="w-[450px] rounded-2xl p-6 shadow-xl"
        style={{ background: "var(--surface)", color: "var(--text)" }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Attachments</h2>

          <button onClick={onClose}>
            <X size={20} style={{ color: "var(--muted)" }} />
          </button>
        </div>

        {/* FILE INPUT */}
        <div
          className="border border-dashed rounded-xl p-6 flex flex-col items-center cursor-pointer"
          style={{
            borderColor: "var(--muted)",
            background: isDark ? "#0F1720" : "#FFFFFF",
          }}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <Paperclip size={22} style={{ color: "var(--muted)" }} />
          <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
            Click to upload files
          </p>

          <input
            id="fileInput"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {/* FILE LIST */}
        {files.length > 0 && (
          <div className="mt-4 space-y-3 max-h-[200px] overflow-y-auto pr-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-3 py-2 rounded-md text-sm"
                style={{
                  background: isDark ? "#0F1720" : "#F7FAFC",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span>{file.fileName}</span>

                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-sm"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm"
          >
            Save Draft
          </Button>
        </div>
      </div>
    </div>
  );
}
