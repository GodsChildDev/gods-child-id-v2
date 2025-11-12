'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CldImage } from 'next-cloudinary';
import { format } from "date-fns";
import Image from "next/image";
import logo from "@/public/Logo-no tag.png";
import { Button } from "@/components/ui/button";
// import ReactToPrint from 'react-to-print';
import { useRef, useState } from 'react';
import { useReactToPrint } from "react-to-print";
import { Mail, Twitch, Printer } from "lucide-react";
import './flyer.css';
import { calculate_age, capitalize, format_height } from "@/lib/utils";
import { sendFlyerEmail, sendtext } from "@/lib/notifications";
import { useUser } from '@clerk/nextjs';
import { toast } from "sonner";
import ContactPopup from "./contact-popup";

export default function Flyer({ child, flyer } : {
    child: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    flyer: any // eslint-disable-line @typescript-eslint/no-explicit-any
}) {

    const { user } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contactType, setContactType] = useState<"email" | "text">("email");
    const [contactValue, setContactValue] = useState("");

    const flyerRef = useRef<HTMLDivElement>(null),
        flyerDocName = 'Nate Missing Flyer',
        reactToPrintFn = useReactToPrint({ contentRef: flyerRef, documentTitle: flyerDocName });


    const handleContactPopupClose = (type : "email" | "text" | undefined, value : string | undefined) => {
        setIsModalOpen(false);
        if (type === 'email') {
            submitFlyerEmail(value);
        } else if (type === 'text') {
            sendFlyerText(value);
        } 
    }

    const startFlyerText = async () => {
        const phone = user?.primaryPhoneNumber?.phoneNumber || '';
        setContactType('text');
        setContactValue(phone);
        setIsModalOpen(true);
    }

    const sendFlyerText = async (phone : string | undefined) => {
        if (phone?.length) {
        const message = `http://localhost:3000/law-enforcement/${flyer.lawEnforcementId}`;
        console.log('JDH phone: ' + phone);
        const result = await sendtext(message, phone);
        console.log('JDH text result: ' + result);
        toast.success('Text sent to ' + phone, {
            style: {backgroundColor: "green", color: "greenyellow"}
        });
        }
    }

    const startFlyerEmail = async () => {
        const email = user?.primaryEmailAddress?.emailAddress || '';
        setContactType('email');
        setContactValue(email);
        setIsModalOpen(true);

    }

    const submitFlyerEmail = async (email : string | undefined) => {
        if (email?.length) {
            // const url = `http://localhost:3000/law-enforcement/${flyer.lawEnforcementId}`;
            const url = `https://gods-child-id-superjekka-superjekkas-projects.vercel.app/law-enforcement/${flyer.lawEnforcementId}`;
            const result = await sendFlyerEmail(email, url);
            console.log('JDH email result: ' + result);
            toast.success('Email sent ', {
                style: {backgroundColor: "green", color: "greenyellow"}
            });
        }
    }

    return (
        <>
        <Card className="mt-4">
            <div ref={flyerRef} style={{margin: '20px'}}>
            <CardHeader style={{background: '#486377', padding: '20px'}}>
                <CardTitle className="text-6xl text-white text-center">HAVE YOU SEEN ME?</CardTitle>
            </CardHeader>
            <div style={{ display: 'inline-flex', padding:'7px', border: 'thin solid black'}}>
                <div>
                    <CldImage
                        src="https://res.cloudinary.com/dgxm6nzpd/image/upload/v1755136373/Nate_in_hoodie2_apmpjy.jpg"
                        width="400" height="300" alt="Nate" />
                </div>
                <div style={{ flex: 1 }}>
                    {/* <CardTitle className="text-center text-2xl">Age: {calculate_age(child.dateOfBirth)}</CardTitle> */}
                    {/* <CardTitle className="text-center text-2xl">Birthday: {format(child.dateOfBirth, "MMM do yyyy")}</CardTitle> */}
                    <CardContent className="text-left text-lg text-black font-medium" style={{ paddingLeft: '20px' }}>
                        <p style={{display: 'inline-flex'}}>NAME: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{flyer.childName}</p></p>
                        <br/>
                        <p style={{display: 'inline-flex'}}>DATE OF BIRTH: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{format(child.dateOfBirth, "MMM dd, yyyy")}</p></p>
                        <br/>
                        <p style={{display: 'inline-flex'}}>AGE: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{calculate_age(child.dateOfBirth)}</p></p>
                        <br/>
                        <p style={{display: 'inline-flex'}}>RACE: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{capitalize(child.race)}</p></p>
                        <br/>
                        <p style={{display: 'inline-flex'}}>SEX: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{capitalize(child.gender)}</p></p>
                        <br/>
                        <p style={{display: 'inline-flex'}}>HEIGHT: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{format_height(child.height)}</p></p>
                        <br/>
                        <p style={{display: 'inline-flex'}}>WEIGHT: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{child.weight} lbs</p></p>
                        <br/>
                        <p style={{display: 'inline-flex'}}>EYES COLOR: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{capitalize(child.eyeColor)}</p></p>
                        <br/>
                        <p style={{display: 'inline-flex'}}>HAIR COLOR: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{capitalize(child.hairColor)}</p></p>
                        <br/>
                        <p style={{display: 'inline-flex'}}>WEARING: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{capitalize(flyer.lastSeenWearing)}</p></p>
                        <br/>
                        <p style={{display: 'inline-flex'}}>IDENTIFYING MARKS: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{capitalize(child.identifiers)}</p></p>
                        <br/>
                        <p style={{display: 'inline-flex'}}><p style={{minWidth: '95px'}}>LAST SEEN:</p>&nbsp;&nbsp;<p style={{fontWeight: 100}}>{flyer.lastSeenAt}</p></p>
                    </CardContent>
                </div>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-flex'}}>
                <div style={{flex: 3, background: 'yellow', padding: '20px', display: 'inline-flex'}} 
                    className="text-left text-lg text-black font-medium">IF YOU HAVE ANY INFORMATION, PLEASE CONTACT YOUR LOCAL LAW ENFORCEMENT WITH THIS CODE:
                    <p className="lawCode">{flyer.lawEnforcementId}</p>
                </div>
                <div style={{flex: 1, background: '#486377', color: 'white', padding: '20px'}} 
                    className="text-center text-lg text-black font-medium">Flyer Issued: <br/>{flyer.createdTimestamp}</div>
            </div>
            <br/><br/>
            <div style={{textAlign: 'center'}}>
                <Image src={logo} alt="site logo" width={250} style={{marginLeft: '35%'}} /> 
                <div style={{color: 'lightgray', fontFamily: 'cursive', fontStyle: 'italic', textShadow: '1px 1px dodgerblue, -1px 0px lightyellow', fontSize: 'x-large'}}>&quot;Protecting Life&apos;s Most Precious Assets... Our Children&quot;</div>
            </div>
            </div>
            <CardFooter className="flex items-center justify center text-3xl">
                <Button className="actionBtn" onClick={startFlyerText}><Twitch /> Text </Button>
                <Button className="actionBtn" onClick={startFlyerEmail}><Mail /> Email </Button>
                <Button className="actionBtn"onClick={reactToPrintFn}><Printer />Print</Button>
            </CardFooter>
        </Card>
        <ContactPopup show={isModalOpen} handleClose={handleContactPopupClose} type={contactType} value={contactValue}/>
        </>
    );
}