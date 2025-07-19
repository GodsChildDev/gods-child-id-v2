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
            </UserButton.MenuItems>
        </UserButton>
    )
}