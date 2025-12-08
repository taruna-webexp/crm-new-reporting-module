"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const hideLayout = pathname === "/login";

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onToggleSidebar={() => setOpen(!open)} />

      <div className="flex">
        <Sidebar open={open} onClose={() => setOpen(false)} />

        <main
          className={`p-6 w-full transition-all ${
            open ? "md:ml-[260px]" : "md:ml-0"
          }`}
        >
          {children}
        </main>
      </div>

      <div
        className={`w-full transition-all mt-0 ${
          open ? "md:ml-[260px]" : "md:ml-0"
        }`}
      >
        <Footer />
      </div>
    </div>
  );
};

export default AppShell;