"use client"

import React from "react";
import BottomBanner from "../dashboard/bottom-banner";
import MainNavBar from "../main-navbar";
import FlyerSearchBox from "./flyer-search-box";
import "./law-enforcement.css";

export default function LawEnforcementPage() {



    return(
        <div className="max-w-screen-lg mx-auto py-10 mt-10">
            <MainNavBar activeItem={'law'} />
            <FlyerSearchBox codeX={null} />
            <br/>
            <br/>
            <BottomBanner />
        </div>
    )
}