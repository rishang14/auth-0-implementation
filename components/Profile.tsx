"use client";

import { useUser } from "@auth0/nextjs-auth0";

export default function Profile() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-text">Loading user profile...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="">
      {user.picture && (
        <img
          src={user.picture}
          alt={user.name || 'User profile'}
          className="profile-picture"
        />
      )} 

      <h2 className="w-[110px] h-[110px] rounded-[50%] transform-[0.3s] ease-in-out object-cover ">{user.name}</h2>
      <p className="profile-email">{user.email}</p>
    </div>
  );
}