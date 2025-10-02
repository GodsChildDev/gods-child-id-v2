'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CldImage } from 'next-cloudinary';
import { format } from "date-fns";
import Image from "next/image";
import logo from "@/public/Logo-no tag.png";
import placeholder from "@/public/placeholder-image.jpg";
import { Button } from "@/components/ui/button";
// import ReactToPrint from 'react-to-print';
import { useRef, useState } from 'react';
import { useReactToPrint } from "react-to-print";
import { Mail, Twitch, Printer } from "lucide-react";
import BottomBanner from "../../bottom-banner";

export default function Flyer({ child }) {

    const flyerRef = useRef<HTMLDivElement>(null),
        flyerDocName = 'Nate Missing Flyer',
        reactToPrintFn = useReactToPrint({ contentRef: flyerRef, documentTitle: flyerDocName });

    function calculate_age(dob) {
        return Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e+10)
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
                        <p>NAME: Nathaniel Heston</p>
                        <p>DATE OF BIRTH: {format(child.dateOfBirth, "MMM dd, yyyy")}</p>
                        <p>AGE: {calculate_age(child.dateOfBirth)}</p>
                        <p>RACE: Caucasian</p>
                        <p>SEX: {child.gender}</p>
                        <p>HEIGHT: {child.height}</p>
                        <p>WEIGHT: {child.weight} lbs</p>
                        <p>EYES COLOR: {child.eyeColor}</p>
                        <p>HAIR COLOR: {child.hairColor}</p>
                        <p>WEARING: </p>
                        <br/>
                        <p>IDENTIFYING MARKS: {child.identifiers}</p>
                        <br/>
                        <p>LAST SEEN: </p>
                        <br/>
                        <p>OTHER INFORMATION: </p>
                    </CardContent>
                </div>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-flex'}}>
                <div style={{flex: 3, background: 'yellow', padding: '20px'}} 
                    className="text-left text-lg text-black font-medium">IF YOU HAVE ANY INFORMATION, PLEASE CONTACT YOUR LOCAL LAW ENFORCEMENT.</div>
                <div style={{flex: 1, background: '#486377', color: 'white', padding: '20px'}} 
                    className="text-center text-lg text-black font-medium">Flyer Issued: <br/>{format(new Date(), "M/dd/yy")}</div>
            </div>
            <br/><br/>
            <div style={{textAlign: 'center'}}>
                <Image src={logo} alt="site logo" width={250} style={{marginLeft: '35%'}} /> 
                <div style={{color: 'lightgray', fontFamily: 'cursive', fontStyle: 'italic', textShadow: '1px 1px dodgerblue, -1px 0px lightyellow', fontSize: 'x-large'}}>"Protecting Life's Most Precious Assets... Our Children"</div>
            </div>
            </div>
            <CardFooter className="flex items-center justify center text-3xl">
                <Button style={{ flex: 1, margin: 7, cursor: 'pointer', background: 'midnightblue', color: 'lightgoldenrodyellow' }}>
                    <Twitch /> Text 911</Button>
                <Button style={{ flex: 1, margin: 7, cursor: 'pointer', background: 'midnightblue', color: 'lightgoldenrodyellow' }}>
                    <Mail /> Email 911</Button>
                <Button style={{ flex: 1, margin: 7, cursor: 'pointer', background: 'midnightblue', color: 'lightgoldenrodyellow' }}
                    onClick={reactToPrintFn}>
                    <Printer />Print</Button>
            </CardFooter>
        </Card>
        <BottomBanner />
        </>
    );
}