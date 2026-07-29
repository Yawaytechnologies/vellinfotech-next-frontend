"use client";

import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./Footer";
import Whatsapp from "./Whatsapp";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}

      <main className="flex-1 bg-transparent pt-0 md:pt-0">{children}</main>

      {!isAdmin && <Footer />}
      {!isAdmin && <Whatsapp phone="+91 9600593838" variant="float" />}
    </>
  );
}
