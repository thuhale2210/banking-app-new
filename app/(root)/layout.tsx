import React from "react";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import SessionManager from "@/components/SessionManager";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) redirect("/sign-in");

  return (
    // <SessionManager>
      <main className='flex h-screen w-full font-inter bg-gradient-to-br from-black-3 to-purple-700'>
        <Sidebar user={loggedIn} />
        <div className='flex flex-col bg-white overflow-hidden w-5/6 my-5 mr-4 rounded-[25px] items-center'>
          <div className='root-layout'>
            <h1 className='sidebar-logo_mobile'>Finance Finesse</h1>
            <div>
              <MobileNav user={loggedIn} />
            </div>
          </div>
          {children}
        </div>
      </main>
    // </SessionManager>
  );
}
