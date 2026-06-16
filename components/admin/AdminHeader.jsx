'use client'
import {
  FiMenu, FiX, FiChevronsLeft, FiChevronsRight, FiLogOut
} from "react-icons/fi";
import { clearAuth } from "../../lib/AuthStore";
import { useRouter } from "next/navigation";

export default function AdminHeader({
  sidebarOpen,
  onToggleSidebar,
  onOpenMobileSidebar,
  onCloseMobileSidebar,
  mobileOpen,
}) {
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    router.push("/admin/login");
  };

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50 bg-white
        h-[72px] shadow-md
      "
    >
      <div
        className="
          mx-auto h-full
          flex items-center justify-between
          px-4 sm:px-7
        "
      >
        {/* --- LEFT: LOGO & CONTROLS --- */}
        <div className="flex items-center gap-3 sm:gap-4 h-full">
          <div className="flex items-center h-18">
            <img src="/images/infotech.png" alt="Logo" className="h-7 sm:h-8 w-auto object-contain" />
          </div>

          {/* Desktop sidebar toggle */}
          <button
            className="hidden md:flex text-2xl text-[#7c6cff] items-center justify-center"
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
          </button>

          {/* Mobile hamburger/close */}
          <button
            className="md:hidden text-2xl text-[#7c6cff]"
            onClick={mobileOpen ? onCloseMobileSidebar : onOpenMobileSidebar}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* --- RIGHT: PROFILE + LOGOUT --- */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Profile image */}
          <img
            src="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?q=80&w=500&auto=format&fit=crop"
            alt="Profile"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#eceeff]"
          />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-500 mr-5 hover:text-red-700 font-semibold"
          >
            <FiLogOut size={20} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
