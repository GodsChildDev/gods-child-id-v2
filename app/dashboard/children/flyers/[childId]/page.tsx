import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getChild } from "@/data/getChild";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import Flyer from "../flyer";
import MainNavBar from "@/app/main-navbar";
import BottomBanner from "@/app/dashboard/bottom-banner";
import { getFlyerByChild } from "@/data/getFlyer";

export default async function ChildFlyerPage({params}: {params: Promise<{childId: string}>}){
    const paramsValues = await params;
    const childId = Number(paramsValues.childId);
    
    if (isNaN(childId)) {
        notFound();
    }
    
    const child = await getChild(childId);
    const flyer = await getFlyerByChild(childId);
    if (!child) {
        notFound();
    }
    return(
        <div className="max-w-screen-lg mx-auto py-10 mt-10">
            <MainNavBar activeItem={'children'} />
            <Flyer child={child} flyer={flyer}/>
            <BottomBanner />
        </div>
    )
}