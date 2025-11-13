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

  if(!user?.phone){
    return  redirect("/completeprofile")
  }
  return (
<>
<div className="flex items-center justify-center bg-neutral-900 h-screen  gap-2 w-full">
 <div className="flex max-w-2xl flex-col  min-w-l  bg-neutral-600 border-neutral-400 rounded-md  p-3">
   <h3 className=" text-center text-gray-200">Your Profile</h3> 
   <div className="flex flex-col gap-4">
    <p>{user.name}</p>  
    <p>{user.phone}</p>
   </div>
 </div>
</div>
</>

  );
};

export default Profile;
