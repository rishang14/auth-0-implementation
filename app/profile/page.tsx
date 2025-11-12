import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

const Profile = async () => {
  const session = await auth0.getSession();

  if (!session?.user) {
    return redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });
  return <div>Profile </div>;
};

export default Profile;
