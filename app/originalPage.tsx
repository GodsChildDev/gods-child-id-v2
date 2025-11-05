'use client';

import Image from "next/image";
import background from "../public/Gods-Child-Background-2.jpg";
import logo from "../public/Logo-GodsChildID-wo-tag.png";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <main className="min-h-[400px] h-[calc(100vh-120px)] flex items-center justify-center bg-white relative">
      <Image src={background} fill alt="background-image" className="pt-5 object-contain opacity-50" />
      <div className="relative z-10 text-center items-center flex flex-col gap-4">
        <Image src={logo} alt="logo-wo-tag" width={425} />
        {/* <Button onClick={enforce2FAForAllUsers}>Update Users</Button> */}
        <SignedIn>
          <Button asChild className="w-sm">
            <Link href="/dashboard">Go To Your Dashboard</Link>
          </Button>
        </SignedIn>
        <SignedOut>
          <div className="flex gap-2 items-center justify-center">
            <Button asChild className="w-3xs">
               <SignInButton /> 
            </Button>
            <Button asChild className="w-3xs">
               <SignUpButton /> 
            </Button>
          </div>
        </SignedOut>
        </div>
    </main>
  );

}
