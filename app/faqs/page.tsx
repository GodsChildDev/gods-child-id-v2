
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BottomBanner from "../dashboard/bottom-banner";
import { CircleQuestionMark } from 'lucide-react';
import MainNavBar from "../main-navbar";
import "./faqs.css";

export default async function FAQs() {

    return (
        <div className="max-w-screen-xl mx-auto py-10">
            <MainNavBar activeItem={'faqs'} />
            <Card className="mt-4" style={{ background: 'gainsboro', padding: '15px' }}>
            <CardTitle style={{ color: 'black' }}>Frequently Asked Questions</CardTitle>
            <Card className="mt-4" style={{ background: 'lightyellow' }}>
                <CardHeader>
                    <CardTitle style={{ color: 'darkgoldenrod' }}>
                        <span style={{position: 'absolute', display: 'inline-flex'}}><CircleQuestionMark className="questionBubble" />
                        &nbsp;&nbsp;Does God’s Child ID determine if an Amber Alert should be issued for an abducted child?
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="row">
                        No. Each state has their on criteria to determine if an Amber Alert should be issued.
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-4" style={{ background: 'lightyellow' }}>
                <CardHeader>
                    <CardTitle style={{ color: 'darkgoldenrod' }}>
                    <span style={{position: 'absolute', display: 'inline-flex'}}><CircleQuestionMark className="questionBubble" />
                    &nbsp;&nbsp;What advantages does God’s Child ID offer to a parent if their child becomes lost or abducted?
                    </span></CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="row">
                    It offers a quicker way to get your child’s information to the police (via email or text) and is formatted so it can be shared with others on patrol. It can also be shared by you to various Social Media outlets so others can BOLO also.
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-4" style={{ background: 'lightyellow' }}>
                <CardHeader>
                    <CardTitle style={{ color: 'darkgoldenrod' }}>
                    <span style={{position: 'absolute', display: 'inline-flex'}}><CircleQuestionMark className="questionBubble" />
                    &nbsp;&nbsp;At what age do you recommend I start adding my children’s information to the Profile Page?                    
                    </span></CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="row">
                        I strongly suggest you add them as a toddler and then update their information till they reach responsible age of say 20-22.
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-4" style={{ background: 'lightyellow' }}>
                <CardHeader>
                    <CardTitle style={{ color: 'darkgoldenrod' }}>
                    <span style={{position: 'absolute', display: 'inline-flex'}}><CircleQuestionMark className="questionBubble" />
                    &nbsp;&nbsp;How can I cancel my subscription to God’s Child ID?                    
                    </span></CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="row">
                        It's simple. Just navigate to your profile page and click the manage my subscription button. Here you can cancel your subscription. 
                    </div>
                </CardContent>
            </Card>
            </Card>
            <BottomBanner />
        </div>
    )
}