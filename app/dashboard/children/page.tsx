import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getChildrenData } from "@/data/getChildrenData";
import { format } from "date-fns";
import { BookHeartIcon, PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import placeholder from "@/public/placeholder-image.jpg";
import plusImage from "@/public/plus-icon.jpg";

export default async function ChildrenPage() {

const children = await getChildrenData()


    return(
        <div className="max-w-screen-xl mx-auto py-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Children</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>View Your Family</CardTitle>
                </CardHeader>
                <CardContent>
                    {!children?.length && (<p className="text-center py-10 text-lg text-muted-foreground">You don`t have any children added. Use the button above to add a child to your profile</p>)}
                    {!!children?.length && (
                        <div className="grid grid-cols-3 gap-5 max-w-full">
            {children?.map((child) => (
                <Card key={child.id}>
                    <CardHeader>
                        <Image src={placeholder} alt="placeholder" className="border border-solid border-black mb-5" />
                        <CardTitle className="text-center text-2xl">Age: {child.age} | {format(child.dateOfBirth, "MMM do yyyy")}</CardTitle>
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
                </Card>
            ))}
            <Card>
                <CardHeader className="text-center mt-5">
                    <CardTitle className="text-3xl">Create New Child</CardTitle>
                </CardHeader>
                <CardFooter className="mt-25 flex items-center justify-center">
                    <Link href="/dashboard/children/new">
                        <Image height={150} width={150} src={plusImage} alt="add child button" />
                    </Link>
                </CardFooter>
            </Card>
            </div>
                    )}
                </CardContent>
            </Card>

            



        </div>
    )
}