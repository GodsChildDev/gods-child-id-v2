"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPureChild } from "@/data/getChild";
import { getFlyerByCode } from "@/data/getFlyer";
import React from "react";
import BottomBanner from "../dashboard/bottom-banner";
import Flyer from "../dashboard/children/flyers/flyer";
import MainNavBar from "../main-navbar";
import "./law-enforcement.css";

export default function LawEnforcementPage() {

    const [code, setCode] = React.useState("");
    const [child, setChild] = React.useState(null);
    const [flyer, setFlyer] = React.useState(null);
    const [error, setError] = React.useState('');
    const disabled = true ? !code : false;

    React.useEffect(() => {}, [child, flyer])

    const getInfo = async () => {
        debugger;
        setFlyer(null);
        setChild(null);
        try {
            const flyerX = await getFlyerByCode(code);
            if (flyerX?.error) {
                setError(flyerX.error);
            } else if (flyerX != null) {
                const childX = await getPureChild(Number.parseInt(flyerX.childId));
                setChild(childX);
                setFlyer(flyerX);
                setError('');
            } else {
                console.log('test:' + JSON.stringify(flyerX));
                setError('Incorrect unique identifier');
            }


        } catch (error) {
            console.error('An unexpected error happened occurred:', error)
        }
    }
    
    const handleSubmit = async () => {
        console.log(code);
        setCode("");
        await getInfo();
    }

    return(
        <div className="max-w-screen-lg mx-auto py-10 mt-10">
            <MainNavBar activeItem={'law'} />
                <div className='searchBox'>
                    <label className='my-2'>Enter the unique child identifier:</label>
                    <Input className='w-100' type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                    {/* <button disabled={disabled} className='w-100 bg-primary my-3 py-1 text-light' onClick={handleSubmit}>Submit</button> */}
                    <Button variant="outline" disabled={disabled} onClick={handleSubmit} style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }}>
                        Submit
                    </Button>
                </div>
                <br/>
                {error ? <p className='error'>{error}</p> : null}
                <br/>
                {!child ? null : <Flyer child={child} flyer={flyer}/>}
            <BottomBanner />
        </div>
    )
}