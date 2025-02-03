"use client";
import { deleteUser } from "@/api/user";
import { Button } from "./ui/button";

const DeleteUser = ({ userId }: { userId: number }) => {
  return (
    <Button variant={"destructive"} onClick={() => deleteUser(userId)}>
      Delete
    </Button>
  );
};
export default DeleteUser;
