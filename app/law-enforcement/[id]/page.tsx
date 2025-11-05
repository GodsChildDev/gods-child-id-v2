
import { getPureChild } from "@/data/getChild";
import { getFlyerByCode } from "@/data/getFlyer";
import React from "react";
import BottomBanner from "../../dashboard/bottom-banner";
import Flyer from "../../dashboard/children/flyers/flyer";
import MainNavBar from "../../main-navbar";
import FlyerSearchBox from "../flyer-search-box";
import "../law-enforcement.css";

export default async function LawEnforcementSpecificPage({ params }: {
    params: Promise<{ id: string }>
}) {

    const paramsValues = await params;
    const id = paramsValues.id;
    const flyer = await getFlyerByCode(id);
    const child = !flyer ? null : await getPureChild(Number.parseInt(flyer.childId));
    const error = flyer ? (flyer?.error ? flyer.error : '') : '-> Incorrect unique identifier <- ';

    return(
        <div className="max-w-screen-lg mx-auto py-10 mt-10">
            <MainNavBar activeItem={'law'} />
            <FlyerSearchBox codeX={id} />
            <br/>
            {error ? <p className='error'>{error}</p> : null}
            <br/>
            {!child ? null : <Flyer child={child} flyer={flyer}/>}
            <BottomBanner />
        </div>
    )
}