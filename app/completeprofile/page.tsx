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
    where: {
      email: session.user.email,
    },
  });

  if (user?.phone) {
    return redirect("/profile");
  }
  return (
    <div className=" shadow-md border flex items-center justify-center h-screen w-full  rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 bg-gray-80mborder-gray-700">
      <form className="space-y-6" action="#">
        <h3 className="text-xl font-medium  text-white">
          You are almost there{" "}
        </h3>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium  block mb-2 text-gray-300"
          >
            Your Phone No
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className=" border   sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="name@company.com"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white   focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          continue
        </button>
      </form>
    </div>
  );
};

export default Profile;
