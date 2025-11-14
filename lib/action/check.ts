"use server";
import { v4 as uuidv4 } from "uuid";
import { auth0 } from "../auth0";
import prisma from "../prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const checkPage = async () => {
  const session = await auth0.getSession();
  const randomId = uuidv4(); // random id

  const cookiestore = await cookies();
  if (!session?.user) {
    return redirect("/");
  }

  if (!session?.user.email || !session?.user.name) return;

  const usreExist = await prisma.user.findUnique({
    where: { email: session?.user.email },
    include: {
      sessions: true,
    },
  });

  cookiestore.set({
    name: "deviceId",
    value: randomId, 
    httpOnly:true,
    secure:true,
    sameSite:'lax'
  });

  if (!usreExist) {
    const usercreated = await prisma.user.create({
      data: {
        name: session.user.name,
        email: session.user.email,
        verified: session.user.email_verified ?? false,
        auth0Id: session.user.sub,
      },
    });

    return redirect("/completeprofile");
  }
  if (usreExist.sessions) {
    const getActiveSession = usreExist.sessions.filter(
      (s) => s.status === "LogIn"
    );
    console.log("session of users",usreExist.sessions);
    console.log(process.env.MAX_DEVICE);  
    console.log("length of active session",getActiveSession.length)
    if (getActiveSession.length >= Number(process.env.MAX_DEVICE)!) {
      return redirect(`/logoutolddevice?newDeviceId=${randomId}`);
    }
  }

  const sessionCreated = await prisma.session.create({
    data: {
      userId: usreExist.id,
      deviceId: randomId,
      status: "LogIn",
    },
  });

  return redirect("/profile");
};

export const handleForceLogout = async (
  olddevice: string,
  newDeviceId: string,
  email:string
) => {
    if (!olddevice || !newDeviceId || !email) {
      return ;
    }  

    console.log("i am clicked")
    const Logout = await prisma.session.update({
      where: {
        deviceId: olddevice,
      },
      data: {
        status: "Logout",
        forecedreason: "Maximum Device Limit reached You are forced to logout",
      },
    });
    console.log("Logout device",Logout)
 
    const user = await prisma.user.findFirst({
      where: { email },
    });
   const updatedsession= await prisma.session.create({
      data: {
        userId: user?.id as string,
        deviceId: newDeviceId,
        status: "LogIn",
      },
    });
     console.log("updatedsession",updatedsession);
    return redirect("/profile");
};
