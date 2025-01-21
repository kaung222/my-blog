import DeleteUser from "@/components/delete-user";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Page() {
  const users = await prisma.user.findMany();
  return (
    <div className="">
      <h3>Dashboad / Users </h3>
      {users.map((user) => {
        return (
          <div className="" key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            {user.id}
            <p>{user.password}</p>
            <DeleteUser userId={user.id} />
          </div>
        );
      })}

      <Link href={"/dashboard/users/new"}>Add new user</Link>
    </div>
  );
}
