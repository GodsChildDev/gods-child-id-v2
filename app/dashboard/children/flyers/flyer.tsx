'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CldImage } from 'next-cloudinary';
import { format } from "date-fns";
import Image from "next/image";
import placeholder from "@/public/placeholder-image.jpg";
import { Button } from "@/components/ui/button";
// import ReactToPrint from 'react-to-print';
import { useRef, useState } from 'react';
import { useReactToPrint } from "react-to-print";
import { Mail, Twitch, Printer } from "lucide-react";

export default function Flyer({ child }) {

    const flyerRef = useRef<HTMLDivElement>(null),
        flyerDocName = 'Nate Missing Flyer',
        reactToPrintFn = useReactToPrint({ contentRef: flyerRef, documentTitle: flyerDocName });

    const [isEditing, setIsEditing] = useState(false);

    function handleIsEditing() {
        setIsEditing(!isEditing);
    }

    function calculate_age(dob) {
        return Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e+10)
    }

    return (
        <Card className="mt-4" ref={flyerRef}>
            <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</Button>
            <CardHeader className="bg-red-600 py-5">
                <CardTitle className="text-6xl text-white text-center">Missing</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify center text-3xl">
                <CldImage
                    src="https://res.cloudinary.com/dgxm6nzpd/image/upload/v1755136373/Nate_in_hoodie2_apmpjy.jpg"
                    className="border border-solid border-black mb-5" alt="Nate" width="400" height="300" />
                <p>Gender: {child.gender} | Age: {calculate_age(child.dateOfBirth)}</p>
                <p>Date Of Birth: {format(child.dateOfBirth, "MMM do yyyy")}</p>
                <p>Height: {child.height} | Weight: {child.weight}</p>
                <p>Hair Color: {child.hairColor} | Eye Color: {child.eyeColor}</p>
                <p>Identifying Characteristics: {child.identifiers}</p>
                <p>Medical Conditions: {child.medicalConditions}</p>
                <br />
                <p style={{ fontWeight: 'bold' }}>Call 911 or your local police</p>
            </CardContent>
            <CardFooter className="flex items-center justify center text-3xl">
                <Button style={{ flex: 1, margin: 7, cursor: 'pointer', background: 'red' }}>
                    <Twitch /> Text 911</Button>
                <Button style={{ flex: 1, margin: 7, cursor: 'pointer', background: 'red' }}>
                    <Mail /> Email 911</Button>
                <Button style={{ flex: 1, margin: 7, cursor: 'pointer', background: 'red' }}
                    onClick={reactToPrintFn}>
                    <Printer />Print</Button>
            </CardFooter>
        </Card>
    );
}