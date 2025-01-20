import Link from "next/link";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="">
        <Link href={"/dashboard/"}>Home</Link>
        <Link href={"/dashboard/posts"}>Posts</Link>
        <Link href={"/dashboard/users"}>Users</Link>
        <Link href={"/dashboard/categories"}>categories</Link>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default DashboardLayout;
