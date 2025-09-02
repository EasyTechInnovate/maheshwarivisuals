"use client";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Sidebar({ isCollapsed = false }) {
  return (
    <div
      className={[
        // full height scrollable panel
        "h-screen overflow-y-auto overflow-x-hidden pb-20",
        // styling
        " text-gray-300 flex flex-col p-3 text-sm",
        // smooth internal changes
        "transition-all duration-300",
      ].join(" ")}
    >
      {/* Header (sticky so it stays visible while scrolling) */}
      <div className="mb-4 pb-2">
        {!isCollapsed && (
          <>
            <h1 className="text-base font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-gray-400 hidden sm:block">
              Master Control Dashboard
            </p>
          </>
        )}
      </div>

      {/* Dashboard link */}
      <div className="mb-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 w-full px-2 py-2 rounded-lg  hover:bg-[#334155] transition"
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
          {!isCollapsed && <span className="font-medium text-sm">Dashboard</span>}
        </Link>
      </div>

      {/* Sections: hidden when collapsed (icon-only mode) */}
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
          {/* User & Release Management */}
          <AccordionItem value="user-release">
            <AccordionTrigger className="text-[11px] font-semibold tracking-wide text-gray-400 hover:text-white transition py-1">
              USER & RELEASE MANAGEMENT
            </AccordionTrigger>
            <AccordionContent className="space-y-1 mt-1 pl-2">
              <Link to="/user-management" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                User Management
              </Link>
              <Link to="/release-management" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Release Management
              </Link>
              <Link to="/bonus-management" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Bonus Management
              </Link>
              <Link to="/kyc-management" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                KYC Management
              </Link>
            </AccordionContent>
          </AccordionItem>

          {/* Data & Analytics */}
          <AccordionItem value="analytics">
            <AccordionTrigger className="text-[11px] font-semibold tracking-wide text-gray-400 hover:text-white transition py-1">
              DATA & ANALYTICS
            </AccordionTrigger>
            <AccordionContent className="space-y-1 mt-1 pl-2">
              <Link to="/analytics-management" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Analytics Management
              </Link>
              <Link to="/month-management" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Month Management
              </Link>
              <Link to="/royalty-management" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Royalty Management
              </Link>
              <Link to="/wallet-transactions" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Wallet & Transactions
              </Link>
            </AccordionContent>
          </AccordionItem>

          {/* MCN & Business */}
          <AccordionItem value="mcn">
            <AccordionTrigger className="text-[11px] font-semibold tracking-wide text-gray-400 hover:text-white transition py-1">
              MCN & BUSINESS
            </AccordionTrigger>
            <AccordionContent className="space-y-1 mt-1 pl-2">
              <Link to="/mcn-management" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                MCN Management
              </Link>
              <Link to="/mcn-royalty" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                MCN Royalty
              </Link>
              <Link to="/team-management" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Team Management
              </Link>
              <Link to="/subscription-plans" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Subscription Plans
              </Link>
            </AccordionContent>
          </AccordionItem>

          {/* Marketing */}
          <AccordionItem value="marketing">
            <AccordionTrigger className="text-[11px] font-semibold tracking-wide text-gray-400 hover:text-white transition py-1">
              MARKETING
            </AccordionTrigger>
            <AccordionContent className="space-y-1 mt-1 pl-2">
              <Link to="/playlist-pitching" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Playlist Pitching
              </Link>
              <Link to="/advertisement-plans" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Advertisement Plans
              </Link>
              <Link to="/synchronization" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Synchronization (ZYNC)
              </Link>
              <Link to="/merch-store" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Merch Store Management
              </Link>
            </AccordionContent>
          </AccordionItem>

          {/* Communications */}
          <AccordionItem value="communications">
            <AccordionTrigger className="text-[11px] font-semibold tracking-wide text-gray-400 hover:text-white transition py-1">
              COMMUNICATIONS
            </AccordionTrigger>
            <AccordionContent className="space-y-1 mt-1 pl-2">
              <Link to="/notifications" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Notifications
              </Link>
              <Link to="/newsletter" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Newsletter
              </Link>
              <Link to="/help-support" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Help & Support
              </Link>
            </AccordionContent>
          </AccordionItem>

          {/* Content Management */}
          <AccordionItem value="content">
            <AccordionTrigger className="text-[11px] font-semibold tracking-wide text-gray-400 hover:text-white transition py-1">
              CONTENT MANAGEMENT
            </AccordionTrigger>
            <AccordionContent className="space-y-1 mt-1 pl-2">
              <Link to="/testimonials" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Testimonials
              </Link>
              <Link to="/trending-artists" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Trending Artists
              </Link>
              <Link to="/trending-labels" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Trending Labels
              </Link>
              <Link to="/faq-management" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                FAQ Management
              </Link>
              <Link to="/blog-management" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Blog Management
              </Link>
            </AccordionContent>
          </AccordionItem>

          {/* Configuration */}
          <AccordionItem value="config">
            <AccordionTrigger className="text-[11px] font-semibold tracking-wide text-gray-400 hover:text-white transition py-1">
              CONFIGURATION
            </AccordionTrigger>
            <AccordionContent className="space-y-1 mt-1 pl-2">
              <Link to="/social-links" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Social Links
              </Link>
              <Link to="/contact-details" className="block px-2 py-1 rounded-md hover:bg-gray-800">
                Contact Details
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
