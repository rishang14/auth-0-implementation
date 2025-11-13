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

  if (!user?.phone) {
    return redirect("/completeprofile");
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
            <button className="w-1/2 block mx-auto rounded-full cursor-pointer bg-slate-700 hover:shadow-lg font-semibold text-white px-6 py-2">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
