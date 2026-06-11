
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BottomBanner from "../dashboard/bottom-banner";
import { Link } from 'lucide-react';
import MainNavBar from "../main-navbar";
import "./links.css";

export default async function Links() {

    return (
        <div className="max-w-screen-xl mx-auto">
            <MainNavBar activeItem={'links'} />
            <Card className="mt-4" style={{ background: 'gainsboro', padding: '15px' }}>
            <CardTitle style={{ color: 'black' }}>IMPORTANT LINKS</CardTitle>
            <p>Important Links is a work in progress, and we welcome your input. If you identify a website or article, you think would be helpful in keeping our children safe and healthy, please send it via our email address at <a href="mailto: rhett.barbaree@yahoo.com">rhett.barbaree@yahoo.com</a> and also share it on our Facebook page, God’s Child ID. Below are some important links I encourage you view.</p>
           
            <Card className="mt-4" style={{ background: 'lightyellow' }}>
                <CardContent>
                    <div>
                        <a href="https://www.nsopw.gov/">National Sex Offender Public Website</a><br/>
                        <a href="http://www.criminalwatchdog.com/neighborhood-watch/default.aspx">Criminal Watch Dog</a>
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-4" style={{ background: 'lightyellow' }}>
                <CardHeader>
                    <CardTitle style={{ color: 'darkgoldenrod' }}>
                    <span className="sessionText"><Link style={{color: 'brown'}} />
                    &nbsp;&nbsp;Starting a Neighborhood Watch Group is a great idea and can help protect not only your property but the lives of your children. Below is a link that will show you how to get started.
                    </span></CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="row">
                        <br/><br/>
                    <a href="https://www.nnw.org/">National Neighborhood Watch</a>                    
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-4" style={{ background: 'lightyellow' }}>
                <CardHeader>
                    <CardTitle style={{ color: 'darkgoldenrod' }}>
                    <span className="sessionText"><Link style={{color: 'brown'}} />
                    &nbsp;&nbsp;Teaching younger children about Stranger Danger is a must here’s one website that lays it out for you.                    
                    </span></CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="row">
                        <br/>
                    <a href="https://schoolbeat.cymru/en/parents/know-what-could-affect-your-child/personal-safety/what-you-need-to-know/stranger-danger/">
                        What is Stranger Danger?</a><br/><br/>
                        <iframe width="100%" height="300" src="https://www.youtube.com/embed/SY7RhBszp0k" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-4" style={{ background: 'lightyellow' }}>
                <CardHeader>
                    <CardTitle style={{ color: 'darkgoldenrod' }}>
                    <span className="sessionText"><Link style={{color: 'brown'}} />
                    &nbsp;&nbsp;Helping a teenager to be aware of their surroundings and how to be safe                    
                    </span></CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="row">
                        <br/>
                    <a href="https://www.thebettermom.com/blog/2017/5/17/10-tips-to-teach-your-teenagers-about-safety">
                        The Better Mom Blog</a>
                    </div>
                </CardContent>
            </Card>
            </Card>
            <BottomBanner />
        </div>
    )
}