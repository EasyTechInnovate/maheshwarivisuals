import React from "react";
import { Calendar, Paperclip, Send, Download, User } from "lucide-react";

// TicketDetailPanel.jsx
// Single-file React component that reproduces the provided Figma design.
// - Tailwind classes are used for layout and spacing.
// - Theme-aware via `theme` prop: "dark" (default) or "light".
// - Uses CSS variables for the two main colors you provided:
//    --bg-main: #111A22 (page background)
//    --bg-surface: #151F28 (card / inner surfaces)
// - Replace icons or tweak styles to match your project tokens.

export default function TicketDetailPanel({ theme = "dark" }) {
  const isDark = theme === "dark";

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

  const styleVars = Object.entries(vars)
    .map(([k, v]) => `${k}: ${v}`)
    .join(";");

  // Mock data - replace with your props / API
  const ticket = {
    id: "MVS-2024-001",
    user: {
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      avatar: null,
    },
    createdAt: "3/15/2024",
    category: "Technical",
    subject: "Upload issues with large audio files",
    tags: ["upload", "audio", "timeout"],
    conversation: [
      {
        id: 1,
        author: "Rajesh Kumar",
        role: "user",
        time: "3/15/2024, 10:00:00 AM",
        message:
          "I'm unable to upload my new track. The upload keeps failing at 50%. I've tried multiple times with different browsers but the same issue persists. File size is about 120MB in WAV format.",
      },
      {
        id: 2,
        author: "Support Agent",
        role: "agent",
        time: "3/15/2024, 10:30:00 AM",
        message:
          "Thank you for contacting us. We're looking into this issue. The 100MB limit is currently in place for technical reasons. We're working on increasing this limit. In the meantime, you can compress your file or contact us for a manual upload.",
      },
      {
        id: 3,
        author: "Rajesh Kumar",
        role: "user",
        time: "3/15/2024, 2:00:00 PM",
        message:
          "When will the limit be increased? I have several tracks that are over 100MB and this is blocking my release schedule.",
      },
    ],
    status: "Open",
    priority: "High",
    assignee: "Tech Team",
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: "var(--bg-main)", color: "var(--text)", ...(Object.fromEntries(Object.entries(vars))) }}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-6">
        {/* Header / Back */}
        <div className="col-span-12 flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button
              className="text-sm px-3 py-2 rounded-md"
              style={{ background: "transparent", color: "var(--muted)" }}
            >
              ← Back to Support Tickets
            </button>
            <h2 className="text-lg font-semibold">Ticket #{ticket.id}</h2>
            <p className="text-sm ml-3" style={{ color: "var(--muted)" }}>
              Upload issues with large audio files
            </p>
          </div>
          <div>
            <button
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm"
              style={{ background: "transparent", color: "var(--muted)" }}
            >
              <Download size={16} /> Download Thread
            </button>
          </div>
        </div>

        {/* Main content and sidebar */}
        <div className="col-span-8">
          {/* Ticket Information Card */}
          <div
            className="rounded-2xl p-6 mb-6 shadow-sm"
            style={{ background: "var(--bg-surface)" }}
          >
            <h3 className="text-md font-medium mb-4">Ticket Information</h3>
            <div className="grid grid-cols-3 gap-4 items-start">
              <div className="col-span-1 flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <div className="font-semibold">{ticket.user.name}</div>
                  <div className="text-sm" style={{ color: "var(--muted)" }}>
                    {ticket.user.email}
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <div className="text-sm text-muted flex items-center gap-2">
                  <Calendar size={14} /> <span style={{ color: "var(--muted)" }}>{ticket.createdAt}</span>
                </div>
              </div>

              <div className="col-span-1 text-right">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium" style={{ background: "rgba(124,58,237,0.12)", color: "var(--accent)" }}>
                  {ticket.category}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-muted">Subject</div>
              <div className="font-semibold">{ticket.subject}</div>
            </div>

            <div className="mt-4 flex gap-2">
              {ticket.tags.map((t) => (
                <span key={t} className="px-2 py-1 rounded-md text-xs" style={{ background: "var(--chip-bg)", color: "var(--muted)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Conversation Card */}
          <div
            className="rounded-2xl p-6 mb-6 shadow-sm"
            style={{ background: "var(--bg-surface)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium">Conversation ({ticket.conversation.length})</h3>
              <button className="text-sm" style={{ color: "var(--muted)" }}>
                Collapse
              </button>
            </div>

            <div className="space-y-4">
              {ticket.conversation.map((c) => (
                <MessageBubble key={c.id} message={c} />
              ))}
            </div>

            <div className="mt-6">
              <label className="text-sm text-muted block mb-2">Add Reply</label>
              <textarea
                className="w-full rounded-lg p-3 resize-none"
                rows={3}
                placeholder="Type your message here..."
                style={{ background: isDark ? "#0F1720" : "#F3F4F6", color: "var(--text)" }}
              />

              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-3">
                  <button className="px-3 py-2 rounded-md text-sm" style={{ background: "transparent", color: "var(--muted)" }}>
                    <Paperclip size={14} /> Attach File
                  </button>
                </div>
                <div>
                  <button
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{ background: "var(--accent)", color: "white" }}
                  >
                    <div className="flex items-center gap-2">
                      <Send size={14} /> Send Reply
                    </div>
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

            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted">Status</label>
                <div className="mt-2 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-sm font-semibold">{ticket.status}</span>
                    <span className="inline-block text-xs px-2 py-1 rounded-full" style={{ background: "var(--danger)", color: "white", opacity: 0.15 }}>
                      Open
                    </span>
                  </div>
                  <select className="rounded-md p-2 text-sm" style={{ background: "transparent", color: "var(--text)" }} defaultValue={ticket.status}>
                    <option>Open</option>
                    <option>Pending</option>
                    <option>Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted">Priority</label>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm font-semibold">{ticket.priority}</div>
                  <select className="rounded-md p-2 text-sm" style={{ background: "transparent", color: "var(--text)" }} defaultValue={ticket.priority}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted">Assigned To</label>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm">{ticket.assignee}</div>
                  <select className="rounded-md p-2 text-sm" style={{ background: "transparent", color: "var(--text)" }}>
                    <option>Tech Team</option>
                    <option>Support Agent</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.06)" }}>
                <div className="flex items-center justify-between text-sm text-muted">
                  <div>Attachments</div>
                  <div className="text-sm">1</div>
                </div>
                <div className="mt-3 p-3 rounded-md text-sm" style={{ background: "var(--chip-bg)" }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Paperclip size={14} /> <span className="text-sm">track.wav</span>
                    </div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>120MB</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}


function MessageBubble({ message }) {
  const isAgent = message.role === "agent";
  return (
    <div className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-xl p-4 shadow-sm text-sm leading-relaxed`
        }
        style={{
          background: isAgent ? "linear-gradient(90deg,#7C3AED,#6D28D9)" : "var(--bg-surface)",
          color: isAgent ? "white" : "var(--text)",
          border: isAgent ? "none" : "1px solid rgba(255,255,255,0.02)",
        }}
      >
        <div className="text-xs text-muted mb-1" style={{ color: isAgent ? "rgba(255,255,255,0.85)" : "var(--muted)" }}>{message.author} • {message.time}</div>
        <div>{message.message}</div>
      </div>
    </div>
  );
}
