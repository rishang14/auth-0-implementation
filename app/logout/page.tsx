"use client";
import { handleLogout } from "@/lib/action/profile";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    async function Logout() {
      await handleLogout();
      return redirect("/auth/logout");
    }
    Logout();
  }, []);

  return <div className="flex h-screen w-full items-center justify-center">
    <p className="text-2xl text-gray-300">You are alomst there</p>
  </div>;
};

export default Logout;
