import React from "react";
import HeaderSection from "@/components/shared/HeaderSection";
import FooterSection from "@/components/shared/FooterSection";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
    
      <HeaderSection />

      <main className="flex-1">{children}</main>
      <FooterSection />
    </div>
  );
};

export default Layout;