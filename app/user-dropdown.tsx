"use client";

import { UserButton } from "@clerk/nextjs";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserDropdown(){
    const router = useRouter();
    return(
        <UserButton showName>
            <UserButton.MenuItems>
                <UserButton.Action label="Dashboard" labelIcon={<HomeIcon size={16} />} onClick={() =>{
                    router.push("/dashboard");
                }} />
                {/* <Link href="/law-enforcement" className="text-black font-semibold text-lg">Law Enforcement</Link> */}
            </UserButton.MenuItems>
        </UserButton>
    )
}