import React, { useState } from "react";
import { Calendar, Paperclip, Send, Download, User, SquarePen, Tag } from "lucide-react";
import EditTicketModal from "./EditTicketModal";
import AssignTicketModal from "./AssignTicketModal";
import GlobalApi from "@/lib/GlobalApi";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { toast } from "sonner";
import AttachmentModal from "./AttachmentModal";

export default function TicketDetailPanel({ theme = "dark", ticket, onBack }) {
  const isDark = theme === "dark";
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(ticket);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
const [draftAttachments, setDraftAttachments] = useState([]);
const [sendingReply, setSendingReply] = useState(false);
const [showAttachmentModal, setShowAttachmentModal] = useState(false);
const [isInternal, setIsInternal] = useState(false);


const handleSendReply = async () => {
  if (!replyMessage.trim()) {
    toast.error("Reply message cannot be empty");
    return;
  }

  try {
    setSendingReply(true);

   const payload = {
  message: replyMessage,
  isInternal: isInternal,
  attachments: draftAttachments.map((file) => ({
    fileName: file.fileName,
    fileUrl: file.fileUrl,
    fileSize: file.fileSize
  }))
};


    const res = await GlobalApi.addAdminResponse(currentTicket.ticketId, payload);

    // Update UI thread
 setCurrentTicket((prev) => ({
  ...prev,
  responses: [
    ...prev.responses,
    {
      // For frontend UI only
      senderType: "admin",

      // Actual backend fields
      message: replyMessage,
      isInternal: isInternal,
      createdAt: new Date().toISOString(),
      attachments: payload.attachments
    }
  ]
}));


    setReplyMessage("");
    setDraftAttachments([]);

    toast.success("Reply sent successfully");

  } catch (err) {
    console.error("Reply send error:", err);
    toast.error("Failed to send reply");
  } finally {
    setSendingReply(false);
  }
};


const handleEscalateTicket = async () => {
  try {
    setLoading(true);

    const updated = await GlobalApi.escalateSupportTicket(ticket.ticketId, {});    
    setCurrentTicket((prev) => ({
      ...prev,
      escalationLevel: (prev.escalationLevel ?? 0) + 1,
    }));

    setShowDialog(false);
    toast.success("Ticket escalated successfully");
  } catch (error) {
    console.error("Escalation failed:", error);
    toast.error("Failed to escalate ticket");
  } finally {
    setLoading(false);
  }
};

  if (!ticket) return null;

  const vars = isDark
    ? {
      "--bg-main": "#111A22",
      "--bg-surface": "#151F28",
      "--text": "#DDE6EE",
      "--muted": "#96A0AB",
      "--accent": "#7C3AED",
      "--chip-bg": "rgba(255,255,255,0.04)",
      "--danger": "#FF5A5F",
    }
    : {
      "--bg-main": "#F7FAFC",
      "--bg-surface": "#FFFFFF",
      "--text": "#0B1720",
      "--muted": "#5A6B73",
      "--accent": "#6B46C1",
      "--chip-bg": "rgba(0,0,0,0.04)",
      "--danger": "#E53E3E",
    };

  return (
    <div
      className="min-h-screen p-8"
      style={{
        backgroundColor: "var(--bg-main)",
        color: "var(--text)",
        ...Object.fromEntries(Object.entries(vars)),
      }}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-6">
        {/* Header */}
        <div className="col-span-12 flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button
              className="text-sm px-3 py-2 rounded-md border border-gray-800"
              onClick={onBack}
              style={{ background: "transparent", color: "var(--muted)" }}
            >
              ← Back to Support Tickets
            </button>
            <div className="flex-col">
              <h2 className="text-lg font-semibold">Ticket #{currentTicket.ticketId}</h2>

              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {currentTicket.subject}
              </p>
            </div>
          </div>

          <button
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm"
            style={{ background: "transparent", color: "var(--muted)" }}
          >
            <Download size={16} /> Download Thread
          </button>
        </div>

        {/* Main content and sidebar */}
        <div className="col-span-8">
          {/* TICKET INFORMATION */}
          <div
            className="rounded-2xl p-6 mb-6 shadow-sm"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Ticket Information</h3>

              <button
                onClick={() => setShowEditModal(true)}
                className="px-3 py-1.5 text-xs rounded-md flex items-center gap-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "var(--muted)"
                }}
              >
                <SquarePen size={14} />
                Edit
              </button>
            </div>

            {/* ROW 1 — FIXED ALIGNMENT */}
            <div className="grid grid-cols-3 gap-8">

              {/* USER — LEFT */}
              <div className="flex flex-col items-start">
                <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>User</div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0F1720] flex items-center justify-center">
                    <User size={18} style={{ color: "var(--muted)" }} />
                  </div>

                  <div>
                    <div className="font-semibold leading-tight">
                      {(ticket?.userId?.firstName || "") + " " + (ticket?.userId?.lastName || "")}
                    </div>

                    <div className="text-sm leading-tight mt-0.5" style={{ color: "var(--muted)" }}>
                      {ticket?.userId?.emailAddress || "—"}
                    </div>
                  </div>
                </div>
              </div>

              {/* CREATED — CENTER */}
              <div className="flex flex-col items-center text-center">
                <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>Created</div>

                <div className="flex items-center gap-2 text-sm mt-1">
                  <Calendar size={16} style={{ color: "var(--muted)" }} />
                  <span className="font-medium">
                    {ticket?.createdAt ? new Date(currentTicket.createdAt).toLocaleDateString() : "—"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end text-right w-full">
                <div className="text-xs mb-1 pr-[22px]" style={{ color: "var(--muted)" }}>
                  Category
                </div>

                <div className="w-full flex justify-end">
                  <span
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full mt-1"
                    style={{
                      background: "rgba(124,58,237,0.18)",
                      color: "var(--accent)",
                    }}
                  >
                    {ticket?.category || "—"}
                  </span>
                </div>


              </div>
            </div>

            {/* ROW 2 — NO CHANGE NEEDED */}
            <div className="grid grid-cols-3 gap-8 mt-10">

              {/* SUBJECT — LEFT */}
              <div>
                <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>Subject</div>

                <div className="text-base font-semibold leading-tight">
                  {ticket?.subject || "—"}
                </div>
              </div>

              {/* TAGS — CENTER */}
              <div className="flex flex-col items-center text-center">
                <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>Tags</div>

                {ticket?.tags?.length > 0 ? (
                  <div className="flex gap-2 justify-center">
                    {currentTicket.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 px-4 py-1 rounded-full text-xs font-medium border"
                        style={{
                          background: "var(--chip-bg)",
                          borderColor: "rgba(255,255,255,0.08)",
                          color: "var(--muted)",
                        }}
                      >
                        <Tag size={12} /> {tag}
                      </span>
                    ))}
                  </div>

                ) : (
                  <div className="text-sm" style={{ color: "var(--muted)" }}>—</div>
                )}
              </div>

              {/* EMPTY RIGHT COLUMN */}
              <div>

                {/* ESCALATION LEVEL */}
                <div className="flex flex-col items-end text-right">
                  <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>
                    Escalation Level
                  </div>

                  <span
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full mt-1"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "var(--accent)",
                    }}
                  >
                    Level {currentTicket.escalationLevel || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Conversation */}
          <div
            className="rounded-2xl p-6 mb-6 shadow-sm"
            style={{ background: "var(--bg-surface)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium">
                Conversation ({currentTicket.responses?.length || 0})
              </h3>
            </div>

            <div className="space-y-4">
              {currentTicket.responses?.map((chat, index) => (
                <MessageBubble
                  key={index}
                  message={{
                    id: index,
                    author:
                      chat.senderType === "admin"
                        ? "Support Agent"
                        : currentTicket.userId?.firstName,
                    role: chat.senderType === "admin" ? "agent" : "user",
                    time: new Date(chat.createdAt).toLocaleString(),   // ✅ FIXED HERE
                    message: chat.message,
                  }}
                />
              ))}

            </div>

            {/* Reply Box */}
            <div className="mt-6">
            

             <textarea
  className="w-full rounded-lg p-3 resize-none"
  rows={3}
  placeholder="Type your message here..."
  value={replyMessage}
  onChange={(e) => setReplyMessage(e.target.value)}
  style={{
    background: isDark ? "#0F1720" : "#F3F4F6",
    color: "var(--text)",
  }}
/>
<div className="flex items-center gap-2 mt-3">
  <input
    type="checkbox"
    id="internal-note"
    checked={isInternal}
    onChange={(e) => setIsInternal(e.target.checked)}
  />
  <label htmlFor="internal-note" className="text-sm">
    Internal Message
  </label>
</div>


              <div className="flex items-center justify-between mt-3">

                {/* LEFT SIDE — Attach */}
               <Button
  className="px-4 py-2 rounded-lg text-xs font-medium"
  style={{
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "var(--muted)"
  }}
  onClick={() => setShowAttachmentModal(true)}
>
  Add Files
</Button>


                {/* RIGHT BUTTON GROUP */}
                <div className="flex items-center gap-3">

                  {/* INTERNAL NOTE (SUBTLE GRAY BUTTON) */}
                  <button
                    className="px-4 py-2 rounded-lg text-xs font-medium transition"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "var(--muted)",
                    }}
                  >
                    Add Internal Note
                  </button>

                  {/* ESCALATE TICKET (PURPLE OUTLINE — THEME RESPONSIVE) */}
                  <Button
                    onClick={() => setShowDialog(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Escalate Ticket
                  </Button>



                  {/* SEND BUTTON */}
                  <button
  onClick={handleSendReply}
  disabled={sendingReply}
  className="px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
  style={{
    background: "var(--accent)",
    color: "white",
    opacity: sendingReply ? 0.6 : 1
  }}
>
  <Send size={14} />
  {sendingReply ? "Sending..." : "Send Reply"}
</button>


                </div>
              </div>


            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="col-span-4">
          <div
            className="rounded-2xl p-6 sticky top-8"
            style={{ background: "var(--bg-surface)" }}
          >
            <h4 className="text-md font-medium mb-4">Ticket Status</h4>

            <div className="space-y-6">

              {/* STATUS */}
              <div>
                <label className="text-xs" style={{ color: "var(--muted)" }}>
                  Status
                </label>

                <div className="mt-2">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      background:
                        currentTicket.status === "open"
                          ? "rgba(255, 87, 87, 0.15)"
                          : currentTicket.status === "pending"
                            ? "rgba(255, 196, 0, 0.15)"
                            : currentTicket.status === "resolved"
                              ? "rgba(52, 211, 153, 0.15)"
                              : "rgba(148, 163, 184, 0.15)",
                      color:
                        currentTicket.status === "open"
                          ? "#FF5A5F"
                          : currentTicket.status === "pending"
                            ? "#FACC15"
                            : currentTicket.status === "resolved"
                              ? "#34D399"
                              : "#94A3B8",
                    }}
                  >
                    {currentTicket.status.toUpperCase()}
                  </span>
                </div>
              </div>


              {/* PRIORITY */}
              <div>
                <label className="text-xs" style={{ color: "var(--muted)" }}>
                  Priority
                </label>

                <div className="mt-2">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      background:
                        currentTicket.priority === "critical"
                          ? "rgba(220, 38, 38, 0.20)"
                          : currentTicket.priority === "high"
                            ? "rgba(239, 68, 68, 0.20)"
                            : currentTicket.priority === "medium"
                              ? "rgba(234,179,8,0.20)"
                              : "rgba(37, 99, 235, 0.20)",
                      color:
                        currentTicket.priority === "critical"
                          ? "#F87171"
                          : currentTicket.priority === "high"
                            ? "#EF4444"
                            : currentTicket.priority === "medium"
                              ? "#FACC15"
                              : "#60A5FA",
                    }}
                  >
                    {currentTicket.priority.toUpperCase()}
                  </span>
                </div>
              </div>


              {/* ASSIGNED TO */}
              <div>
                <label className="text-xs" style={{ color: "var(--muted)" }}>Assigned To</label>

                {/* BADGE */}
                {/* ASSIGNED TO BADGE */}
                <div className="mt-2">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      background: "rgba(124, 58, 237, 0.20)",
                      color: "var(--accent)",
                    }}
                  >
                    {currentTicket.assignedTo
                      ? typeof currentTicket.assignedTo === "object"
                        ? `${currentTicket.assignedTo.firstName ?? ""} ${currentTicket.assignedTo.lastName ?? ""}`.trim()
                        : currentTicket.assignedTo
                      : "Unassigned"}
                  </span>
                </div>


                {/* SELECT + BUTTON */}
                {/* SELECT + BUTTON */}
                <div className="mt-2 flex items-center gap-3">
                  <select
                    className="rounded-lg px-3 py-2 text-sm flex-1"
                    style={{
                      background: isDark ? "var(--bg-main)" : "var(--bg-surface)",
                      color: "var(--text)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    value={currentTicket.assignedDepartment || ""}      // ✅ FIX
                    onChange={(e) =>
                      setCurrentTicket((prev) => ({
                        ...prev,
                        assignedDepartment: e.target.value,              // ✅ FIX
                      }))
                    }
                  >
                    {["Management", "Content", "Technology", "Marketing", "Support"].map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                      border: isDark
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(0,0,0,0.1)",
                      color: "var(--text)"
                    }}
                    onClick={() => setShowAssignModal(true)}   // ← OPEN MODAL
                  >
                    Assign
                  </button>

                </div>

              </div>
            </div>
          </div>
        </aside>

      </div>
      <EditTicketModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        ticket={currentTicket}
        theme={theme}
        onSave={(updatedTicket) => {
          setCurrentTicket(updatedTicket);   // <— FIXES UI not updating
        }}
      />


      <AssignTicketModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        ticket={currentTicket}
        theme={theme}
        onAssigned={(updated) => setCurrentTicket(updated)}
      />


      {showDialog && (
        <ConfirmDialog
          title="Escalate Ticket"
          message="Are you sure you want to escalate this ticket? This action cannot be undone."
          theme={theme}
          onCancel={() => setShowDialog(false)}
          onConfirm={handleEscalateTicket}
          loading={loading}
        />
      )}

      <AttachmentModal
  isOpen={showAttachmentModal}
  onClose={() => setShowAttachmentModal(false)}
  theme={theme}
  onSaveDraft={(files) => setDraftAttachments(files)}
/>

    </div>
  );
}

// 💬 Chat message UI component
function MessageBubble({ message }) {
  const isAgent = message.role === "agent";

  return (
    <div className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[82%] rounded-xl p-4 shadow-sm text-sm leading-relaxed"
        style={{
          background: isAgent
            ? "linear-gradient(90deg,#7C3AED,#6D28D9)"
            : "var(--bg-surface)",
          color: isAgent ? "white" : "var(--text)",
        }}
      >
        <div
          className="text-xs mb-1"
          style={{
            color: isAgent
              ? "rgba(255,255,255,0.85)"
              : "var(--muted)",
          }}
        >
          {message.author} • {message.time}
        </div>

        <div>{message.message}</div>
      </div>


    </div>
  );
}

