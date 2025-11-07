
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
                        TBD
                    </CardContent>
                </Card>
            </Card>
            <BottomBanner />
        </div>
    )
}