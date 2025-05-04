import React from "react";
import { z } from "zod";

type Props = {
  error: z.ZodIssue[] | undefined;
  name: string;
};

const ZodErrorMessage = ({ error, name }: Props) => {
  return (
    <>
      {error && error.find((e) => e.path[0] == name) && (
        <p className=" text-red-400 text-xs ">
          {error.find((e) => e.path[0] == name)?.message}
        </p>
      )}
    </>
  );
};

export default ZodErrorMessage;
