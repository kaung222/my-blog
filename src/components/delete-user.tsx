"use client";
import { deleteUser } from "@/api/user";

const DeleteUser = ({ userId }: { userId: number }) => {
  return (
    <button className=" bg-red-700" onClick={() => deleteUser(userId)}>
      DeleteUser{" "}
    </button>
  );
};
export default DeleteUser;
