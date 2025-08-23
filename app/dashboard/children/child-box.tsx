'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { BookHeartIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { CldImage } from 'next-cloudinary';

export default function ChildBox({child}) {
    
    function calculate_age(dob) {
        return Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e+10)
    }

    return (<Card>
        <CardHeader>
            <CldImage
                src="https://res.cloudinary.com/dgxm6nzpd/image/upload/v1755136373/Nate_in_hoodie2_apmpjy.jpg"
                width="400" height="300" alt="Nate" />
            <CardTitle className="text-center text-2xl">Age: {calculate_age(child.dateOfBirth)} | {format(child.dateOfBirth, "MMM do yyyy")}</CardTitle>
            <CardDescription className="text-center text-lg text-black font-medium">
                <p>Gender: {child.gender}</p>
                <p>Eye Color: {child.eyeColor} | Hair Color: {child.hairColor}</p>
                <p>Height: {child.height} | Weight: {child.weight}</p>
            </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-md text-black font-medium">
            <p>Identifying Characteristics: {child.identifiers}</p>
            <p>Medical Conditions: {child.medicalConditions}</p>
        </CardContent>
        <CardFooter className="items-center justify-center gap-2.5">
            <Button variant="outline" size="icon" aria-label="Edit Child" asChild>
                <Link href={`/dashboard/children/${child.id}`}>
                    <PencilIcon />
                </Link>
            </Button>
            <Button variant="outline" size="icon" aria-label="Create Flyer" asChild>
                <Link href={`/dashboard/children/flyers/${child.id}`}>
                    <BookHeartIcon />
                </Link>
            </Button>
        </CardFooter>
    </Card>);
}