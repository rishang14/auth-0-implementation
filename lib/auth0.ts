import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";
import prisma from "./prisma";

export const auth0 = new Auth0Client({
  async onCallback(error, context, session) {
    if (session) {    

        return NextResponse.redirect(new URL(`/check?${session.user}`));
      }
    

    return NextResponse.json({ message: "User logged in Successfully" })
  },
});
