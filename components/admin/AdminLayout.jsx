'use client'
import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const handleMobileOverlay = () => setMobileSidebar(false);

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <AdminHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        mobileOpen={mobileSidebar}
        onOpenMobileSidebar={() => setMobileSidebar(true)}
        onCloseMobileSidebar={() => setMobileSidebar(false)}
      />
      <div className="flex">
        <AdminSidebar
          open={sidebarOpen}
          mobileOpen={mobileSidebar}
          onCloseMobile={handleMobileOverlay}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
        <main
          className={`flex-1 min-h-[calc(100vh-72px)] p-6 transition-all duration-300 pt-[72px] ${
            sidebarOpen ? "md:ml-[260px]" : "md:ml-[72px]"
          }`}
        >
          {children}
        </main>
      </div>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/30 md:hidden transition-opacity duration-200 ${
          mobileSidebar ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleMobileOverlay}
      ></div>
    </div>
  );
}
