
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import BottomBanner from "../dashboard/bottom-banner";
import "./privacy.css";

export default async function Privacy() {

    return (
        <div className="max-w-screen-xl mx-auto py-10">
            <Card className="mt-4" style={{ background: 'gainsboro', padding: '15px' }}>
                <CardTitle style={{ color: 'black' }}>Privacy Policy</CardTitle>
                <Card className="mt-4" style={{ background: 'lightyellow' }}>
                    <CardContent>
                        At God&apos;s Child ID, we consider our members&apos; privacy to be a very serious matter. Rest
                        assured that we will not share, sell or use any information you have submitted to us with
                        any outside individuals or companies. This includes your email address, phone number
                        or pictures you have submitted to complete your children&apos;s profiles. Please keep in mind
                        that when you initially create your children&apos;s profiles there is no space provided for their
                        name. Their name can only be added when their profile is turned into a flyer, with Your
                        intention to share it with Law Enforcement and to the Public.
                        <br /><br />
                        Please note that God&apos;s Child ID will email you three times per year reminding you to
                        update the information on your children.
                        <br /><br />
                        <i><b>Rhett Barbaree</b></i><br />
                        <i>Creator and Owner of Gods&apos; Child ID</i>
                    </CardContent>
                </Card>
            </Card>
            <BottomBanner />
        </div>
    )
}