import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const AppHeader = () => {
  return (
    <div>
      <Link href={"/"}>
        <Button>Home</Button>
      </Link>
      <Link href="/blogs">
        <Button>Blogs</Button>
      </Link>
      <Link href={"/contact-us"}>
        <Button>Contact</Button>
      </Link>
    </div>
  );
};

export default AppHeader;
