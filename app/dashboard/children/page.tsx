// "use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getChildrenData } from "@/data/getChildrenData";
import Image from "next/image";
import Link from "next/link";
import plusImage from "@/public/plus-icon.jpg";
import ChildBox from "./child-box";
import BottomBanner from "../bottom-banner";
import MainNavBar from "@/app/main-navbar";
import './childrenPage.css';
// import { useUser } from "@clerk/nextjs";
// import { useEffect, useRef } from "react";

export default async function ChildrenPage() {
    const children = await getChildrenData()
    // const HAS_RUN_KEY = 'has_post_login_effect_run';

    // const { isSignedIn, isLoaded, user } = useUser();
    // // Use a ref to track if the effect has already executed in the current session
    // const hasEffectRun = useRef(false);

    // useEffect(() => {
    //     if (isLoaded && isSignedIn && !hasEffectRun.current) {
    //         // Check if we've already done this action in a previous render/load
    //         if (sessionStorage.getItem(HAS_RUN_KEY)) {
    //             return; 
    //         }

    //         console.log("Running post-login action for the first time in this session.");
            
    //         // Set flags to prevent re-runs
    //         hasEffectRun.current = true;
    //         sessionStorage.setItem(HAS_RUN_KEY, 'true');
    //         sessionStorage.setItem('signIn', 'inprogress');

    //         // Perform your one-time actions here
    //     }

    //     // Optional Cleanup: if user signs out within the same session
    //     return () => {
    //         if (!isSignedIn) {
    //             sessionStorage.removeItem(HAS_RUN_KEY);
    //         }
    //     }

    // }, [isLoaded, isSignedIn]);

    return (
        <div className="max-w-screen-xl mx-auto">
            <MainNavBar activeItem={'children'} />
            <Card className="mt-4" style={{ background: 'lightyellow' }}>
                <CardHeader>
                    <CardTitle style={{color: 'darkgoldenrod'}}>ATTENTION Parent / Guardian: <br/>
                        <span style={{fontWeight: 'lighter'}}>After adding your family members below, you may generate shareable flyers. This action will ask you to enter your loved one&apos;s name and some details about their disappearance. Note: while this site is primarily poised for protecting children, it may also be used to protect your elderly. Please add up to 8 family members.
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {!children?.length && (<p className="text-center py-10 text-lg text-muted-foreground">You don`t have any children added. Use the button above to add a child to your profile</p>)}
                    {!!children?.length && (
                        <div className="grid childColumns gap-5 max-w-full">
                            {children?.map((child, i) => (
                                <ChildBox child={child} key={child.id} i={i} />
                            ))}
                            <Card>
                                <CardHeader className="text-center mt-5">
                                    <CardTitle className="text-3xl">Add Child</CardTitle>
                                </CardHeader>
                                <CardFooter className="mt-25 flex items-center justify-center">
                                    <Link href="/dashboard/children/new">
                                        <Image height={150} width={150} src={plusImage} alt="add child button" />
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                    )}
                </CardContent>
            </Card>
            <BottomBanner />

        </div>
    )
}