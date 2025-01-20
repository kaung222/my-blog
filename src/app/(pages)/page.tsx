import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="h2">Home Page </div>
      <li>Recommand posts</li>
      <li>Lates posts</li>
      <li>Popular posts</li>
      <Link href="/blogs">Blogs</Link>
      <Link href={"/contact-us"}>Contact Author</Link>
    </div>
  );
};

export default Page;
