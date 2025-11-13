"use server";
import { cookies } from "next/headers";
import { auth0 } from "../auth0";
import prisma from "../prisma";
export const updatePhoneNo = async (number: number) => {
  try {
    const session = await auth0.getSession();
    if (!session?.user) {
      return { error: "Unauthenticated Request", success: false };
    }
    const PhoneNo = number;
    if (PhoneNo < 1000000000) {
      return { success: false, error: "Number Should be 10 Digit" };
    }
    const cookiestore = await cookies();
    const deviceId = cookiestore.get("deviceId")?.value;

    const updatePhone = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        phone: PhoneNo.toString(),
      },
    });

    if (deviceId) {
      const user = await prisma.user.findFirst({
        where: { email: session.user.email },
      });
      if (user) {
        await prisma.session.create({
          data: {
            userId: user?.id as string,
            deviceId: deviceId,
            status: "LogIn",
          },
        });
      }
    }
    return { success: true, message: "Phone-no updated Successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Internal Server Error" };
  }
};
