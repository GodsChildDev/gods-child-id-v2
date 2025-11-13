'use client'

import { Card, CardTitle } from "@/components/ui/card";
import BottomBanner from "../dashboard/bottom-banner";
import MainNavBar from "../main-navbar";
import "./contact.css";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/textarea";
import { sendEmail } from "@/lib/notifications";
import { toast } from "sonner";

export default function Contact() {

    const [message, setmessage] = React.useState('');
    const [email, setemail] = React.useState('');
    const [subject, setsubject] = React.useState('');
    const handleSubmit = async () => {
        await sendEmail(email, subject, message);
        toast.success("Email Sent", {style: {backgroundColor: "green", color: "greenyellow"}})
        setemail('');
        setmessage('');
        setsubject('');
    }

    return (
        <div className="max-w-screen-xl mx-auto py-10">
            <MainNavBar activeItem={'contact'} />
            <Card className="mt-4" style={{ background: 'gainsboro', padding: '15px' }}>
                <CardTitle style={{ color: 'black' }}>CONTACT US</CardTitle>
                <Card className="mt-4" style={{ background: 'lightyellow', padding: '15px' }}>

                    <h2 style={{ color: 'black', marginBottom: '-20px' }}>Email address</h2>
                    <Input className='w-100' style={{ color: 'black', background: 'white' }} type="text"
                        value={email} onChange={(e) => setemail(e.target.value)} />

                    <h2 style={{ color: 'black', marginBottom: '-20px' }}>Subject</h2>
                    <Input className='w-100' style={{ color: 'black', background: 'white' }} type="text" value={subject} onChange={(e) => setsubject(e.target.value)} />

                    <h2 style={{ color: 'black', marginBottom: '-20px' }}>Message</h2>
                    <TextArea value={message} style={{ color: 'black', background: 'white', height: '100px' }}  onChange={(e) => setmessage(e.target.value)} />

                    <Button variant="outline" onClick={handleSubmit} style={{ width: '100px', background: 'midnightblue', color: 'white', cursor: 'pointer' }}>
                        Send Message
                    </Button>

                </Card>
            </Card>
            <BottomBanner />
        </div>
    )
}