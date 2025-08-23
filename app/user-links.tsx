'use client';

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import UserDropdown from "./user-dropdown";

export default function UserLinks() {
    return (
        <div>
            <SignedOut>
                <div className="flex items-center">
                    <Link href="/law-enforcement" className="text-black font-semibold text-lg">Law Enforcement</Link>
                </div>
            </SignedOut>
            <SignedIn>
                <UserDropdown />
            </SignedIn>
        </div>
    );
}
