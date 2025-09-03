"use client";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Sidebar({ isCollapsed = false, theme }) {
  const isDark = theme === "dark";

  return (
    <div
      className={[
        "h-screen overflow-y-auto overflow-x-hidden pb-20 flex flex-col p-3 text-sm transition-all duration-300 custom-scrollbar",
        isDark ? "bg-[#151F28] text-gray-300" : "bg-white text-gray-900",
      ].join(" ")}
    >
      {/* Header */}
      <div className="mb-4 pb-2">
        {!isCollapsed && (
          <>
            <h1 className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              Admin Panel
            </h1>
            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"} hidden sm:block`}>
              Master Control Dashboard
            </p>
          </>
        )}
      </div>

      {/* Dashboard link */}
{!isCollapsed && (
  <div className="mb-4">
    <Link
      to="/admin/dashboard"
      className={`flex items-center gap-2 w-full px-2 py-2 rounded-lg transition ${
        isDark ? "hover:bg-[#334155] text-gray-300" : "hover:bg-gray-200 text-gray-900"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"
        />
      </svg>
      <span className={`font-medium text-sm ${isDark ? "text-gray-100" : "text-gray-900"}`}>
        Dashboard
      </span>
    </Link>
  </div>
)}


      {/* Accordion sections */}
      {!isCollapsed && (
        <Accordion
          type="multiple"
          defaultValue={[
            "user-release",
            "analytics",
            "mcn",
            "marketing",
            "communications",
            "content",
            "config",
          ]}
          className="space-y-2"
        >
          {[
            {
              value: "user-release",
              label: "USER & RELEASE MANAGEMENT",
              links: [
                "User Management",
                "Release Management",
                "Bonus Management",
                "KYC Management",
              ],
            },
            {
              value: "analytics",
              label: "DATA & ANALYTICS",
              links: [
                "Analytics Management",
                "Month Management",
                "Royalty Management",
                "Wallet & Transactions",
              ],
            },
            {
              value: "mcn",
              label: "MCN & BUSINESS",
              links: [
                "MCN Management",
                "MCN Royalty",
                "Team Management",
                "Subscription Plans",
              ],
            },
            {
              value: "marketing",
              label: "MARKETING",
              links: [
                "Playlist Pitching",
                "Advertisement Plans",
                "Synchronization (ZYNC)",
                "Merch Store Management",
              ],
            },
            {
              value: "communications",
              label: "COMMUNICATIONS",
              links: ["Notifications", "Newsletter", "Help & Support"],
            },
            {
              value: "content",
              label: "CONTENT MANAGEMENT",
              links: [
                "Testimonials",
                "Trending Artists",
                "Trending Labels",
                "FAQ Management",
                "Blog Management",
              ],
            },
            {
              value: "config",
              label: "CONFIGURATION",
              links: ["Social Links", "Contact Details"],
            },
          ].map((section) => (
            <AccordionItem key={section.value} value={section.value}>
              <AccordionTrigger
                className={`text-[11px] font-semibold tracking-wide py-1 transition ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {section.label}
              </AccordionTrigger>
              <AccordionContent className="space-y-1 mt-1 pl-2">
                {section.links.map((link) => (
                  <Link
                    key={link}
                    to={`admin/${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`block px-2 py-1 rounded-md transition ${
                      isDark
                        ? "hover:bg-gray-800 text-gray-300"
                        : "hover:bg-gray-200 text-gray-800"
                    }`}
                  >
                    {link}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
