'use client'; 

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link'; 
import React from 'react';

export default function FlyerSearchBox({ codeX } : { codeX : string }) {
    const [code, setCode] = useState(codeX || '');
    const disabled = !code;

    React.useEffect(() => {}, [code]);

    return (
        <div className='searchBox'>
            <label className='my-2' style={{fontWeight: 500, color: 'midnightblue'}}>Enter the unique child identifier:</label>
            <Input className='w-100' type="text" value={code} onChange={(e) => setCode(e.target.value)} style={{background: '#e6e6f1'}}/>
            <Button variant="outline" disabled={disabled} style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }} asChild>
                <Link href={`/law-enforcement/${code}`}>
                    Submit
                </Link>
            </Button>
        </div>
    );
}