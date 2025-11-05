'use client';

import { Button } from "@/components/ui/button";
import { getUser, saveUserSignupCode } from "@/data/getSignupCodes";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import SignupCodePopup from "./signup-code-popup";
import UserDropdown from "./user-dropdown";

export default function UserLinks() {

    const signUpBtn = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFirst, setIsFirst] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);
    const handleSignUp = () => {
        setIsVerified(true);
    }

    useEffect(() => {
        const handleSignUpInProgress = async () => {
            const signupCode = sessionStorage.getItem('signupCode');
            const userId = await getUser();
            console.log('JDH Signup Code: ' + signupCode);
            if (signupCode != null && !isVerified) {
                setIsVerified(true);
            }
            if (isVerified && signUpBtn.current && !userId && signupCode) {
                signUpBtn.current.click();
            } else if (isVerified && userId && signupCode) {
                await saveUserSignupCode(userId, signupCode);
                sessionStorage.setItem('signupCode', '');   
            }
        };

        if (isFirst) {
            setIsFirst(false);
            setIsVerified(false);
        }
        handleSignUpInProgress();

    }, [isVerified]);

    return (
        <div>
            <SignedOut>
                <div className="block">
                    {/* <Link href="/law-enforcement" className="text-black font-semibold text-lg">Law Enforcement</Link> */}
                    <div className="flex block">
                        <SignInButton style={{ color: 'black', cursor: 'pointer' }} />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {isVerified ? <SignUpButton style={{ color: 'black', cursor: 'pointer' }} ref={signUpBtn} /> :
                            <Button variant="outline" onClick={handleOpen} style={{ width: '100px', background: 'invisible', color: 'blue', cursor: 'pointer' }}>
                                Sign Up
                            </Button>
                        }
                    </div>
                </div>
                {/* <UserDropdown /> */}
            </SignedOut>
            <SignedIn>
                <UserDropdown />
            </SignedIn>
            <SignupCodePopup show={isModalOpen} complete={handleSignUp} handleClose={handleClose} />
        </div>
    );
}
