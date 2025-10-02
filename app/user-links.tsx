'use client';

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import UserDropdown from "./user-dropdown";

export default function UserLinks() {
    return (
        <div>
            <SignedOut>
                <div className="block">
                    {/* <Link href="/law-enforcement" className="text-black font-semibold text-lg">Law Enforcement</Link> */}
                    <div className="flex block">
                        <SignInButton style={{color: 'black', cursor: 'pointer'}}/> 
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <SignUpButton style={{color: 'black', cursor: 'pointer'}}/>
                    </div>
                </div>
                {/* <UserDropdown /> */}
            </SignedOut>
            <SignedIn>
                <UserDropdown />
            </SignedIn>
        </div>
    );
}
