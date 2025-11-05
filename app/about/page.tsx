
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BottomBanner from "../dashboard/bottom-banner";
import MainNavBar from "../main-navbar";
import "./about.css";
import Image from "next/image";
import branch from "@/public/dove-w-olive-branch.png";
import divider from "@/public/blue_divider.png";

export default async function About() {

    return (
        <div className="max-w-screen-xl mx-auto py-10">
            <MainNavBar activeItem={'about'} />
            <Card className="mt-4" style={{ background: 'gainsboro', padding: '15px' }}>
            <CardTitle className="mainTitle">
                <Image src={branch} alt="divider" width={100} height={20} className="dove"/>
                <div style={{flex: 1, paddingLeft: '15px'}}>ABOUT US
                <br/>
                <Image src={divider} alt="divider" width={140} height={20}/>
                </div>
            </CardTitle>
            <Card className="mt-1" style={{ background: 'lightyellow' }}>
                <CardHeader>
                    <CardTitle style={{ color: 'darkgoldenrod' }}>
                        <span style={{position: 'absolute', display: 'inline-flex', width: '72vw'}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gods Child ID is a faith-based company created by a parent just like you. The need for an online ID Kit which can be updated as your children grow is really a must especially in the times, we now live in. Add to this the speed in which a child’s information can be texted or emailed to law enforcement and shared with others via social media is a huge advantage compared to the ID Kits that have been given to parents in the past. It saves precious time and takes the guess work out of remembering important aspects about your child during a stressful situation. 
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <br/><br/><br/><br/><br/><br/>
                    <div className="row">
                    This service is offered to you for free! We offer you much more than an Online ID Kit. We invite you to join our community, God’s Child ID on Facebook, where you can view ideas and share articles on how we can make it a safer and healthier world for all our children. See you there!
                    </div>
                </CardContent>
            </Card>
            </Card>
            <BottomBanner />
        </div>
    )
}