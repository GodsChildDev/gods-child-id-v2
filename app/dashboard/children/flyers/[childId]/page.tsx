import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getChild } from "@/data/getChild";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import Flyer from "../flyer";

export default async function ChildFlyerPage({params}: {params: Promise<{childId: string}>}){
    const paramsValues = await params;
    const childId = Number(paramsValues.childId);
    
    if (isNaN(childId)) {
        notFound();
    }
    
    const child = await getChild(childId);
    if (!child) {
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
            <Flyer child={child}/>
        </div>
    )
}