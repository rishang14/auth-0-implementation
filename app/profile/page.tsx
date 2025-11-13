import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Profile = async () => {
  const session = await auth0.getSession();
  const cookieStore=await cookies(); 

  const deviceId=cookieStore.get("deviceId")?.value;
  if (!session?.user) {
    return redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: { email: session?.user.email }, 
    include:{sessions:true}
  }); 
  if (!user?.phone) {
    return redirect("/completeprofile");
  }   

  if(deviceId){


    const userLogsession=user.sessions.filter(s=>s.deviceId ===deviceId); 

    if(userLogsession[0].status==="Logout"  || userLogsession[0].forecedreason){

  return (
    <>
    <div>
       <h1 className="text-3xl text-gray-300">You are forced to logout from this device</h1>  

      <Link className="text-blue-500" href={"/logout"}>Logout</Link>
    </div>
    </>
  )
    }
  }


  return (
    <>
      <div className="flex items-center justify-center bg-neutral-900 h-screen  gap-2 w-full">
        <div className="md:w-xl   w-lg md:mx-4  mx-2   bg-zinc-800 shadow-xl rounded-lg text-white">
          <div className="rounded-t-lg bg-slate-400 h-32 overflow-hidden"></div>
          <div className="mx-auto w-32 h-32 relative bg-slate-700 -mt-16 border-4 border-white rounded-full overflow-hidden">
            {session?.user.picture ? (
              <img
                className="object-cover object-center h-32"
                src={session.user.picture}
                alt="profile picture"
              />
            ) : (
              <h1 className=" absolute text-center top-[25%] left-[32%] text-blue-800 text-6xl">
                {user.name.charAt(0).toUpperCase()}
              </h1>
            )}
          </div>
          <div className="text-center mt-2">
            <h2 className="font-semibold">Name : {user.name}</h2>
            <p className="text-gray-500">Phone: {user.phone}</p>
          </div>

          <div className="p-4 border-t mx-8 mt-2">
            <Link
              href={"/logout"}
              className="w-1/2 block mx-auto text-center rounded-full cursor-pointer bg-slate-700 hover:shadow-lg font-semibold text-white px-6 py-2"
            >
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
