"use server"

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

// what i am doing here is
// checking user exist or not if not exist then save in db and send him to complete the profile mean attend the profile info
// if exist then create a session and in complete profile i will create a session first and then complete the profile
// set the cookie for device id and then send it to the profile section

const CheckPage = async () => {
  const session = await auth0.getSession();
  const randomId = uuidv4(); // random id
  const cookiestore = await cookies();

  if (!session?.user) {
    return redirect("/");
  }

  const usreExist = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });

  cookiestore.set({
    name: "deviceId",
    value: randomId,
    httpOnly: true,
  });

  if (!usreExist) {
    await prisma.user.create({
      data: {
        name: session.user.name ?? "",
        email: session.user.email ?? " ",
        verified: session.user.email_verified ?? false,
        auth0Id: session.user.sub,
      },
    });
    return redirect("/completeprofile");
  }

  await prisma.session.create({
    data: {
      userId: usreExist.id,
      deviceId: randomId,
      status: "LogIn",
    },
  });

  return redirect("/profile");
};
export default CheckPage;
