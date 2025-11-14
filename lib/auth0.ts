import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";

export const auth0 = new Auth0Client({ 
  async onCallback(error, context, session) { 
    if(error){  
      console.log(error)
    }
    if (session) { 
      console.log("i am triggred")    
        return NextResponse.redirect(new URL(`${process.env.APP_BASE_URL}/check`));
      }
    

    return NextResponse.json({ message: "User logged in Successfully" })
  },
});
