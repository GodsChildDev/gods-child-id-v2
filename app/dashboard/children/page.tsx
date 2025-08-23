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
import ChildBox from "./child-box";

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
                <ChildBox child={child} key={child.id}/>
            ))}
            <Card>
                <CardHeader className="text-center mt-5">
                    <CardTitle className="text-3xl">Add Child</CardTitle>
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