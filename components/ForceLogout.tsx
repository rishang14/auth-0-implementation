"use client";
import { handleForceLogout } from "@/lib/action/check";
import { redirect } from "next/navigation";
import React, { useState } from "react";

type prop = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  deviceId: string;
  userAgent?: string | null;
  ipAddress?: string | null;
  status: "LogIn" | "Logout";
};

interface Session {
  activeSession: prop[];
  newdeviceid: string; 
  email:string
}

const ForceLogout = ({ activeSession, newdeviceid,email }: Session) => {
  const [loading, setLoading] = useState<boolean>(false);

  if (activeSession.length === 0) {
    return (
      <h1 className=" text-3xl text-gray-300">There is no active session</h1>
    );
  }

  const handleLogoutClick = async (oldDeviceId: string) => {
    setLoading(true);
    try {
      await handleForceLogout(oldDeviceId, newdeviceid,email);  
    } catch (error){ 
      console.log(error,"error");  
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-gray-200  text-xl ">You are alomost there</p>
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
      {activeSession.map((session) => (
        <div
          key={session.id}
          className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
        >
          <div className="bg-lienar-to-r from-primary/5 to-accent/5 p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">
                {session.deviceId.substring(0, 3) + "..."}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {session.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Active since:{" "}
              {session.createdAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="p-4 space-y-3">
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <span className="text-sm font-medium text-muted-foreground min-w-fit">
                  Device:
                </span>
                <span className="text-sm text-foreground text-pretty">
                  {session.userAgent || "Unknown Device"}
                </span>
              </div>

              {session.ipAddress && (
                <div className="flex items-start gap-3">
                  <span className="text-sm font-medium text-muted-foreground min-w-fit">
                    IP Address:
                  </span>
                  <span className="text-sm text-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                    {session.ipAddress ?? "Not Available right Now"}
                  </span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Last Updated */}
            <p className="text-xs text-muted-foreground">
              Last active:{" "}
              {session.updatedAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Card Footer with Logout Button */}
          <div className="bg-muted/30 px-4 py-3 border-t border-border">
            <button
              className="w-full cursor-pointer   px-4 py-2.5 bg-red-800/90 hover:bg-red-700 text-white font-medium rounded-md transition-all duration-200 text-sm group-hover:shadow-md"
              onClick={() => handleLogoutClick(session.deviceId)}
            >
              Logout from this Device
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForceLogout;
