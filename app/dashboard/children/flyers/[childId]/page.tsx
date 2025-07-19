import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getChild } from "@/data/getChild";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import placeholder from "@/public/placeholder-image.jpg";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default async function ChildFlyerPage({
    params
}: {
    params: Promise<{childId: string}>
}){
    const paramsValues = await params;
    
        const childId = Number(paramsValues.childId);
    
        if(isNaN(childId)){
            notFound();
        }
    
        const child = await getChild(childId);
        if(!child){
            notFound();
        }
    return(
        <div className="max-w-screen-lg mx-auto py-10 mt-10">
        <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/children">Children</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Flyers</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        <Card className="mt-4">
            <CardHeader className="bg-red-600 py-5">
                <CardTitle className="text-6xl text-white text-center">Missing</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify center text-3xl">
                <Image src={placeholder} alt="placeholder" className="border border-solid border-black mb-5" />
                <p>Gender: {child.gender} | Age: {child.age}</p>
                <p>Date Of Birth: {format(child.dateOfBirth, "MMM do yyyy")}</p>
                <p>Height: {child.height} | Weight: {child.weight}</p>
                <p>Hair Color: {child.hairColor} | Eye Color: {child.eyeColor}</p>
                <p>Identifying Characteristics: {child.identifiers}</p>
                <p>Medical Conditions: {child.medicalConditions}</p>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify center text-3xl">
                <Button className="w-full text-3xl py-10 px-10 bg-red-600" size="lg">Share Flyer</Button>
            </CardFooter>
        </Card>
        </div>
    )
}