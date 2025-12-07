'use client';

import { Button } from "@/components/ui/button";
import { getUser, getUserEmail, getUserPhone, isBlockedUser, saveUserSignupCode } from "@/data/getSignupCodes";
import { checkReminderEmails, sendWelcomeEmail } from "@/lib/notifications";
import { SignedIn, SignedOut, SignInButton, SignUpButton, useClerk, useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import SigninCodePopup from "./signin-code-popup";
import SignupCodePopup from "./signup-code-popup";
import UserDropdown from "./user-dropdown";
import './user-links.css';
import { toast } from "sonner";

export default function UserLinks() {

    const signUpBtn = useRef(null);
    const signInBtn = useRef(null);
    const {signOut} = useClerk();
    const {isLoaded, isSignedIn} = useUser();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);
    const [isFirst, setIsFirst] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);
    // const handleOpen2 = () => setIsModal2Open(true);
    const handleClose2 = () => setIsModal2Open(false);
    const handleSignUp = () => {
        setIsVerified(true);
    }

    useEffect(() => {
        const handleSignUpInProgress = async () => {
            const signupCode = sessionStorage.getItem('signupCode');
            const signInSaved = sessionStorage.getItem('signIn');
            const userId = await getUser();
            const emailX = await getUserEmail();
            const phoneX = await getUserPhone();
            setPhone(phoneX!);
            setEmail(emailX!);
            console.log('JDH Signup Code: ' + signupCode);
            if (signupCode != null && !isVerified) {
                setIsVerified(true);
            }
            if (isVerified && signUpBtn.current && !userId && signupCode) {
                // @ts-expect-error: We know 'current' might be null, but we're bypassing for now.
                signUpBtn?.current?.click();
            } else if (isVerified && userId && signupCode) {
                await saveUserSignupCode(userId, signupCode);
                sessionStorage.setItem('signupCode', '');
                if (email?.length) {
                    sendWelcomeEmail(email);
                }
            } else if (signInSaved?.length && isSignIn && signInBtn.current && !userId) {
                // @ts-expect-error: We know 'current' might be null, but we're bypassing for now.
                signInBtn?.current?.click();
            } else if (signInSaved?.length && userId && isLoaded && isSignedIn) {
            // } else if (userId && isLoaded && isSignedIn) {
                if (await isBlockedUser()) {
                    toast.error('User not found or blocked for an hour', {style: {backgroundColor: "red"}});
                    sessionStorage.setItem('signIn', '');
                    signOut({ redirectUrl: '/' });
                } else {
                    setIsModal2Open(true);
                }
            }

            if (!isSignedIn && signInSaved?.length) {
                setIsSignIn(false);
            }
        };

        if (isFirst) {
            setIsFirst(false);
            setIsVerified(false);
            setIsSignIn(false);
        }
        handleSignUpInProgress();
        checkReminderEmails();

    }, [isVerified, isSignIn, isLoaded, isSignedIn]);

    const signIn = () => {
        sessionStorage.setItem('signIn', 'inprogress');
        setIsSignIn(true);
    }

    return (
        <div>
            <SignedOut>
                <div className="block">
                    {/* <Link href="/law-enforcement" className="text-black font-semibold text-lg">Law Enforcement</Link> */}
                    <div className="flex block">
                        {isSignIn ?
                            <SignInButton mode="modal">
                                <button className="clickBtn" ref={signInBtn}>Sign In</button>
                            </SignInButton> :
                            <Button variant="outline" onClick={signIn} style={{ width: '100px', background: 'invisible', color: 'blue', cursor: 'pointer' }}>
                                Sign In
                            </Button>
                        }
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {isVerified ?
                            <SignUpButton mode="modal">
                                <button className="clickBtn" ref={signUpBtn}>Sign Up</button>
                            </SignUpButton> :
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
            <SigninCodePopup phone={phone} email={email} show={isModal2Open} handleClose={handleClose2} />
        </div>
    );
}

