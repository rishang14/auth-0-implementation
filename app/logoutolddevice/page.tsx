import ForceLogout from "@/components/ForceLogout";
import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: { newDeviceId?: string };
}

const LogoutOthersDevice = async ({ searchParams }: Props) => {
  const session = await auth0.getSession();

  if (!session?.user) {
    return redirect("/");
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
    include: {
      sessions: true,
    },
  });

  const activeSession = user?.sessions.filter(s => s.status === "LogIn");
  const {newDeviceId}= await searchParams
  return (
    <div className="min-h-screen bg-linear-to-br from-background to-muted/10 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Active Sessions
          </h1>
          <p className="text-gray-300">
            Manage your active sessions across devices
          </p>
        </div>

        <ForceLogout activeSession={activeSession ?? []} newdeviceid={newDeviceId ?? ""} />
      </div>
    </div>
  );
};
export default LogoutOthersDevice;
