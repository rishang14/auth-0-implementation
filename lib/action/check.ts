"use server"
import {v4 as uuidv4} from "uuid"
import { auth0 } from "../auth0"; 
import prisma from "../prisma"; 
import { cookies} from "next/headers"; 
import { redirect } from "next/navigation";

export const checkPage=async()=>{
     const session = await auth0.getSession();
  const randomId = uuidv4(); // random id  

console.log("i am triggreded")
  const cookiestore = await cookies();
  if (!session?.user) {
    return redirect("/");
  }
  console.log(session.user,"sssion in checkpage")
  if(!session?.user.email || !session?.user.name)return;
  const usreExist = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });
   
  cookiestore.set({
    name: "deviceId",
    value: randomId,
  });

  if (!usreExist) {
 const  usercreated=await prisma.user.create({
      data: {
        name: session.user.name ,
        email: session.user.email ,
        verified: session.user.email_verified ?? false,
        auth0Id: session.user.sub,
      },
    }); 

    console.log("user created",usercreated); 
    return redirect("/completeprofile");
  }
  
const sessionCreated=await prisma.session.create({
    data: {
      userId: usreExist.id,
      deviceId: randomId,
      status: "LogIn",
    }, 
  }); 

  console.log("Created Sessiom In the Check",sessionCreated);

  return redirect("/profile");
}