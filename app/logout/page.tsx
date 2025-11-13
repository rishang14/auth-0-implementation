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

  return <p>You are alomst there</p>;
};

export default Logout;
