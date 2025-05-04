import AppHeader from "@/components/app-header";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
