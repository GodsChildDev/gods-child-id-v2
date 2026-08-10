'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BottomBanner from "./dashboard/bottom-banner";
import MainNavBar from "@/app/main-navbar";
import "./home.css";
import { Siren, Settings, ShieldAlert, LockKeyhole, Glasses } from 'lucide-react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import dadPic from "../public/father-hugging.png";
import callPic from "../public/call-emergency.png";
import Image from "next/image";
import ReactPlayer from 'react-player';
import { useRef } from "react";

export default function Home() {

    const carouselRef = useRef(null);

    function onChange() {

    };

    function onClickItem() {

    };

    function onClickThumb() {

    };

    function onVideoStart() {
        console.log('JDH Here');
        // moveCarousel = false;
        // if (carouselRef.current) {
        //     // ts-expect-error: We know 'current' might be null, but we're bypassing for now.
        //     carouselRef?.current?.clearAutoPlay();
        //   }
    }

    function onVideoEnd() {
        console.log('JDH Here 2');
        // moveCarousel = true;
        // if (carouselRef.current) {
        //     // ts-expect-error: We know 'current' might be null, but we're bypassing for now.
        //     carouselRef?.current?.autoPlay();
        //   }
    }

    return (
        <div className="max-w-screen-xl mx-auto">
            <MainNavBar activeItem={'home'} />

            <Card className="mt-4" style={{ background: 'lightyellow' }}>
                <CardHeader><CardTitle className="slogan">Protect your Children and if the Unthinkable Happens...
                    Facilitate your Child&apos;s Rescue</CardTitle></CardHeader>

                <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} showStatus={false}
                    onClickThumb={onClickThumb} className="main-scroller" showThumbs={false}
                    ref={carouselRef}>
                    <div>
                        <CardHeader className="firstViewHeader">
                            <CardTitle className="watchVideoText">
                                FIRST TIME? &nbsp; <Glasses color={'gray'} style={{fontWeight:700}} className="glasses"/> &nbsp; WATCH THIS VIDEO:
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="row text-center flex justify-center items-center" style={{ background: 'darkgray' }}>
                                {/* <iframe src="https://player.vimeo.com/video/780782645?h=8f47286b99" width="640" height="360" frameBorder="0" allowFullScreen></iframe> */}
                                <ReactPlayer src='https://player.vimeo.com/video/780782645?h=8f47286b99' 
                                    width="640px" height="360px" onStart={onVideoStart} onEnded={onVideoEnd} controls />
                            </div>
                        </CardContent>
                    </div>
                    <div>
                        <CardHeader className="protectHeader">
                            <CardTitle style={{ color: 'darkgreen', display: 'inline-flex', fontWeight: 700 }}>
                                <Settings style={{ color: 'green' }} />&nbsp;&nbsp;
                                HOW IT WORKS
                            </CardTitle>
                        </CardHeader>
                        <div className="protectBox">
                            <Image src={dadPic} alt="call" width={2500} height={5} quality={100} className={'protectImg'}/>
                            <CardContent className="textBox text-left">
                                <p>At God’s Child ID, we have strived to make everything simple and easy. This includes signing up to become a member, adding information about your children and being able to quickly share that information to Law Enforcement etc. Below are the steps you will need to get started.</p>
                                <br />
                                <ol>
                                    <li><div><LockKeyhole color={'gold'} size={20} /></div>Register for a new account via the signup button above.</li>
                                    <li><div><LockKeyhole color={'gold'} size={20} /></div><span>Once you have logged in, you will be prompt to enter an access code delivered to your primary contact method of choice. Once entered, the access code will automatically be verified. If your code is entered correctly, you will be allowed to continue to your account. <b>You have 3 chances to enter the access code; after that, you will be locked out for an hour.</b></span></li>
                                    <li><div><LockKeyhole color={'gold'} size={20} /></div>Setup two-factor authentication to enable additional security measures via email or text keeping your childrens information safe and secure.</li>
                                    <li><div><LockKeyhole color={'gold'} size={20} /></div>You will receive an email from God’s Child ID three times a year reminding you to update your children’s information.</li>
                                </ol>
                            </CardContent>
                        </div></div>
                        <div>
                        <CardHeader className="actionHeader">
                            <CardTitle style={{ color: 'darkred', display: 'inline-flex', fontWeight: 700 }}>
                                <ShieldAlert style={{ color: 'red' }} />&nbsp;&nbsp;
                                WHAT TO DO IF YOUR CHILD IS LOST OR ABDUCTED
                            </CardTitle>
                        </CardHeader>
                        <div className="actionBox">
                            <Image src={callPic} alt="call" width={250} height={15} quality={100} className={'actionImg'}/>
                            <CardContent className="textBox text-left">
                                <ol>
                                    <li><div><Siren color={'red'} size={20} /></div>Contact Law Enforcement by dialing 911. Inform them of your situation and let them know you have a digital ID Kit with your child’s picture and their information. Ask them if you should text or email it to them.</li>
                                    <li><div><Siren color={'red'} size={20} /></div>Go to that child’s information under your Children’s page and click on the Flier button underneath that child’s info. Add your child’s name and information such as what they are wearing, where last seen etc.</li>
                                    <li><div><Siren color={'red'} size={20} /></div>Once you have entered the information, click the Submit button. This will save the info and direct you to a generated flyer. There at the bottom, you can choose Text, Email, or Print. (You can always come back and choose the other options after its first sent to Law Enforcement). Make sure that you give law enforcement your unique child identifier which is listed on the flier once generated. If you choose text, it will autopopulate your phone number, but you can change it to another phone number. Submitting that will send a text message with the link to the flier.</li>
                                    <li><div><Siren color={'red'} size={20} /></div>If you’re at an amusement park, state or national park quickly find their security or park rangers and text the Flier to them so their entire team can BOLO for your child.</li>
                                </ol>
                                <strong>Note: Be sure and read the information under Important Links on our homepage.</strong>

                            </CardContent>
                        </div>
                    </div>
                </Carousel> 
            </Card>
            <BottomBanner />

        </div>
    )
}