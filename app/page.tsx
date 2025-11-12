import { auth0 } from "@/lib/auth0";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import Profile from "@/components/Profile";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div className="h-screen flex items-center flex-col justify-center w-full">
      <h1 className="mb-4 md:text-2xl text-xl font-extrabold leading-none tracking-tight text-gray-900  dark:text-white">
        Welcome! Please log in to access your protected content.
      </h1>
      <LoginButton />  

      {
        user && <LogoutButton/>
      }
    </div>
  );
}
