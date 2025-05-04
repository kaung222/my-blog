import React from "react";
import { getCachedCategories } from "../page";
import NewPostPage from "./NewPostPage";

type Props = {};

const Page = async (props: Props) => {
  const categories = await getCachedCategories();

  return (
    <>
      <NewPostPage categories={categories} />
    </>
  );
};

export default Page;
