"use server";
import { cookies } from "next/headers";
import prisma from "../prisma";
import { auth0 } from "../auth0"; 
import dotenv from "dotenv"; 


dotenv.config();

export const handleLogout = async () => {
  try {
    const session = await auth0.getSession();

    if (!session?.user) return;

    const cookiestore = await cookies();
    const deviceId = cookiestore.get("deviceId")?.value;
    if (deviceId) {
      const updatesession = await prisma.session.update({
        where: {
          deviceId: deviceId,
        },
        data: {
          status: "Logout",
        },
      });
    }
   
  } catch (error) {
    console.log(error);
  }
};
