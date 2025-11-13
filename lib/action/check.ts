"use server"
import {v4 as uuidv4} from "uuid"
import { auth0 } from "../auth0"; 
import prisma from "../prisma"; 
import { cookies} from "next/headers"; 
import { redirect } from "next/navigation";
  

export const checkPage=async()=>{
     const session = await auth0.getSession();
  const randomId = uuidv4(); // random id  

  const cookiestore = await cookies();
  if (!session?.user) {
    return redirect("/");
  }
  
  if(!session?.user.email || !session?.user.name)return;
  const usreExist = await prisma.user.findUnique({
    where: { email: session?.user.email }, 
    include:{
      sessions:true
    }
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

    return redirect("/completeprofile");
  }   
  
  if(usreExist.sessions){
    const getActiveSession= usreExist.sessions.filter(s => s.status === "LogIn"); 

    if(getActiveSession.length >=3){
      return redirect(`/logoutolddevice?newDeviceId=${randomId}`);
    }
  }


  
const sessionCreated=await prisma.session.create({
    data: {
      userId: usreExist.id,
      deviceId: randomId,
      status: "LogIn",
    }, 
  }); 

  return redirect("/profile");
}