'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "../../../lib/AuthStore";
import AdminLayout from "../../../components/admin/AdminLayout";

export default function ProtectedLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/admin/login");
    }
  }, [router]);

  if (typeof window !== "undefined" && !isLoggedIn()) {
    return null;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
