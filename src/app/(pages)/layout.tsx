import AppHeader from "@/components/app-header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppHeader />
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
