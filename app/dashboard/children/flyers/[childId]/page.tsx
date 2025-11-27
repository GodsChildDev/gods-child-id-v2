import { getChild } from "@/data/getChild";
import { notFound } from "next/navigation";
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
        <div className="max-w-screen-lg mx-auto">
            <MainNavBar activeItem={'children'} />
            <Flyer child={child} flyer={flyer}/>
            <BottomBanner />
        </div>
    )
}