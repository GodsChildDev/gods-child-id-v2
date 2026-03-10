'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { CldImage } from 'next-cloudinary';
import FlyerInfoPopup from "./flyers/flyer-info-popup";
import divider from "@/public/blue_divider.png";
import DeleteChildDialog from './[childId]/delete-child-dialog';
import { calculate_age, capitalize, format_height } from '@/lib/utils';
import placeholder from "@/public/placeholder-image.jpg";
import "./childrenPage.css";


export default function ChildBox({ child, i } : {
    child: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    i: number
}) { 

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    return (<Card>
        <CardHeader>
            <div className='childBox'>
                <div>
                    <div style={{
                        position: 'absolute', paddingLeft: '60px', background: '#3f51b5b8',
                        width: '175px', color: 'white', fontWeight: 'bold'
                    }}>Child {i + 1}</div>
                    { child.imageUrl ? <CldImage src={child.imageUrl} width="175" height="100" alt="Child pic" /> :
                        <Image src={placeholder} alt="placeholder" width="175" height="100" className="border border-solid border-black mb-5"/>
                    }
                </div>
                <div style={{ flex: 1, width: '100%' }}>
                    <CardDescription className="text-left text-lg text-black font-medium" style={{ paddingLeft: '20px', display: 'grid' }}>
                        <p className='ageRow'>AGE: &nbsp;&nbsp;<p style={{fontWeight: 100, flex: 1}}>{calculate_age(child.dateOfBirth)}</p>
                            <p><DeleteChildDialog childId={child.id} type={'x'} /></p>
                        </p>
                        <p style={{display: 'flex'}}>GENDER: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{capitalize(child.gender)}</p></p>
                        <p style={{display: 'flex'}}>HEIGHT: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{format_height(child.height)}</p></p>
                        <p style={{display: 'flex'}}>WEIGHT: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{child.weight} lbs</p></p>
                        <p style={{display: 'flex'}}>HAIR: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{capitalize(child.hairColor)}</p></p>
                        <p style={{display: 'flex'}}>EYES: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{capitalize(child.eyeColor)}</p></p>
                        <Image src={divider} alt="divider" width={100} height={20} 
                            style={{transform: 'rotateX(180deg)', marginTop: '15px'}}/>
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="text-left text-md text-black font-medium">
            <p className='childBox'>MEDICAL CONDITIONS: &nbsp;&nbsp;<p style={{fontWeight: 100}}>{capitalize(child.medicalConditions)}</p></p>
            <p className='childBox'><p style={{minWidth: '240px'}}>IDENTIFYING CHARACTERISTICS:</p> &nbsp;&nbsp;<p style={{fontWeight: 100}}>{capitalize(child.identifiers)}</p></p>
        </CardContent>
        <CardFooter className="items-center justify-center gap-2.5">
            <Button variant="outline" size="icon" aria-label="Edit Child" style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }} asChild>
                <Link href={`/dashboard/children/${child.id}`}>
                    Edit
                </Link>
            </Button>
            <Button variant="outline" onClick={handleOpen} style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow', cursor: 'pointer' }}>
                Flyer
            </Button>
        </CardFooter>
        <FlyerInfoPopup show={isModalOpen} handleClose={handleClose} childId={child.id} />
    </Card>);
}