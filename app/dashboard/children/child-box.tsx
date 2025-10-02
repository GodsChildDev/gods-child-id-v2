'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { BookHeartIcon, PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CldImage } from 'next-cloudinary';
import FlyerInfoPopup from "./flyers/flyer-info-popup";
import divider from "@/public/blue_divider.png";


export default function ChildBox({ child, i }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState([]);

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    function calculate_age(dob) {
        return Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e+10)
    }

    return (<Card>
        <CardHeader>
            <div style={{ display: 'inline-flex' }}>
                <div>
                    <div style={{
                        position: 'absolute', paddingLeft: '60px', background: '#3f51b5b8',
                        width: '175px', color: 'white', fontWeight: 'bold'
                    }}>Child {i + 1}</div>
                    <CldImage
                        src="https://res.cloudinary.com/dgxm6nzpd/image/upload/v1755136373/Nate_in_hoodie2_apmpjy.jpg"
                        width="175" height="100" alt="Nate" />
                </div>
                <div style={{ flex: 1 }}>
                    {/* <CardTitle className="text-center text-2xl">Age: {calculate_age(child.dateOfBirth)}</CardTitle> */}
                    {/* <CardTitle className="text-center text-2xl">Birthday: {format(child.dateOfBirth, "MMM do yyyy")}</CardTitle> */}
                    <CardDescription className="text-left text-lg text-black font-medium" style={{ paddingLeft: '20px' }}>
                        <p>AGE: {calculate_age(child.dateOfBirth)}</p>
                        <p>GENDER: {child.gender}</p>
                        <p>HEIGHT: {child.height}</p>
                        <p>WEIGHT: {child.weight} lbs</p>
                        <p>HAIR: {child.hairColor}</p>
                        <p>EYES: {child.eyeColor}</p>
                        <Image src={divider} alt="divider" width={100} height={20} 
                            style={{transform: 'rotateX(180deg)', marginTop: '15px'}}/>
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="text-left text-md text-black font-medium">
            <p>MEDICAL CONDITIONS: {child.medicalConditions}</p>
            <p>IDENTIFYING CHARACTERISTICS: {child.identifiers}</p>
        </CardContent>
        <CardFooter className="items-center justify-center gap-2.5">
            <Button variant="outline" size="icon" aria-label="Edit Child" 
            style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }} asChild>
                <Link href={`/dashboard/children/${child.id}`}>
                    Edit
                </Link>
            </Button>
            {/* <Button variant="outline" onClick={handleOpen} style={{ width: '100px' }}>
                Flyer
            </Button> */}
            <Button variant="outline" size="icon" aria-label="Create Flyer"  onClick={handleOpen}
            style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }} asChild>
                <Link href={`/dashboard/children/flyers/${child.id}`}>
                    Flyer
                </Link>
            </Button>
        </CardFooter>
        <FlyerInfoPopup show={isModalOpen} handleClose={handleClose} childId={child.id} />
    </Card>);
}