'use client'
import React, { useState } from "react";
import { FiHome, FiUser, FiBriefcase, FiFileText, FiClipboard } from "react-icons/fi";
import { MdArrowRight } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", icon: FiHome, to: "/admin/dashboard" },
  { name: "Course Enquired", icon: FiUser, to: "/admin/course-enquired" },
  { name: "Feedback", icon: FiHome, to: "/admin/feedback" },
  { name: "Job Posts", icon: FiBriefcase, to: "/admin/job-posts" },
  { name: "Blog Posts", icon: FiFileText, to: "/admin/blog-posts" },
  { name: "Internships", icon: FiClipboard, to: "/admin/internships" },
  { name: "Job Applications", icon: FiBriefcase, to: "/admin/job-applications" },
  { name: "Consulting Job Posts", icon: FiBriefcase, to: "/admin/consulting-job-posts" },
  { name: "Consulting Job Applications", icon: FiClipboard, to: "/admin/consulting-job-applications"},
];

export default function AdminSidebar({
  open,
  mobileOpen,
  onCloseMobile,
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const pathname = usePathname();

  const Item = ({ item, idx, dense = false }) => {
    const isActive = pathname.startsWith(item.to);
    const basePad = dense ? "py-3" : "py-3.5";
    const textSize = dense ? "text-[14px]" : "text-[15px]";

    return (
      <li key={item.name}>
        <Link
          href={item.to}
          aria-current={isActive ? "page" : undefined}
          className={`
            flex items-center justify-between
            ${basePad}
            ${textSize}
            rounded-xl font-medium transition
            ${dense ? "gap-4 px-5" : open ? "gap-4 px-5" : "justify-center"}
            ${
              isActive
                ? "bg-[#eceeff] text-[#7c6cff] font-semibold"
                : hoveredIdx === idx
                ? "bg-[#eceeff] text-[#7c6cff] font-semibold"
                : "hover:bg-[#f6f7fb] text-[#222e3a]"
            }
          `}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
          onClick={dense ? onCloseMobile : undefined}
        >
          {/* Left: Icon + Name */}
          <span className="flex items-center">
            <item.icon size={22} />
            <span
              className={`whitespace-nowrap transition-all duration-300 ${
                dense ? "ml-2" : open ? "block ml-2" : "hidden"
              }`}
            >
              {item.name}
            </span>
          </span>

          {/* Right: Arrow */}
          {(dense || open) && (
            <MdArrowRight className="text-gray-300 text-2xl ml-4" />
          )}
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* ========== Desktop sidebar ========== */}
      <aside
        className={`
          hidden md:flex flex-col bg-white
          fixed left-0 top-[72px] z-30
          shadow-[0_8px_32px_0_rgba(60,72,102,0.13)]
          transition-all duration-300
          ${open ? "w-[260px]" : "w-[72px]"}
          h-[calc(100vh-72px)]
          overflow-y-auto scrollbar-hide
        `}
      >
        <div className="flex-1 flex flex-col py-8 px-2">
          <span
            className={`text-xs font-semibold text-gray-400 px-5 mb-3 tracking-wider ${
              !open && "text-center px-0"
            }`}
          >
            {open ? "MAIN MENU" : ""}
          </span>
          <ul className="flex flex-col gap-1 pr-1">
            {menu.map((item, idx) => (
              <Item key={item.name} item={item} idx={idx} />
            ))}
          </ul>
        </div>
      </aside>

      {/* ========== Mobile backdrop (click to close) ========== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-[72px] bg-black/30 z-40 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* ========== Mobile sidebar (drawer) ========== */}
      <aside
        className={`
          fixed top-[72px] left-0 z-50 bg-white
          shadow-[0_8px_32px_0_rgba(60,72,102,0.13)]
          h-[calc(120vh-120px)]
          w-[260px]
          transition-transform duration-300
          md:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          overflow-y-auto scrollbar-hide
        `}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col py-8 px-2 h-full">
          <span className="text-xs font-semibold text-gray-400 px-5 mb-3 tracking-wider">
            MAIN MENU
          </span>
          <ul className="flex flex-col gap-1 pr-1">
            {menu.map((item, idx) => (
              <Item key={item.name} item={item} idx={idx} dense />
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
