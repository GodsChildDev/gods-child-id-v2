
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import BottomBanner from "../dashboard/bottom-banner";
import "./terms.css";

export default async function Terms() {

    return (
        <div className="max-w-screen-xl mx-auto py-10">
            <Card className="mt-4" style={{ background: 'gainsboro', padding: '15px' }}>
                <CardTitle style={{ color: 'black' }}>God&apos;s Child Id - TERMS & CONDITIONS</CardTitle>
                <Card className="mt-4" style={{ background: 'lightyellow' }}>
                    <CardContent>
                        <div className="row">
            
1. God&apos;s Child Id will service your needs as you protect your children. In the process, you will receive SMS messages to complete the 2 factor login authenication.  You will also receive links to your child&apos;s flyer when you request it.
<br/><br/>
2. You can cancel the SMS service at any time. Just text &quot;STOP&quot; to the short code. After you send the SMS message &quot;STOP&quot; to us, we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us. If you want to join again, just sign up as you did the first time and we will start sending SMS messages to you again.
<br/><br/>
3. If you are experiencing issues with the messaging program you can reply with the keyword HELP for more assistance, or you can get help directly at support@godschildid.com.
<br/><br/>
4. Carriers are not liable for delayed or undelivered messages
<br/><br/>
5. As always, message and data rates may apply for any messages sent to you from us and to us from you. You will receive messages as you enteract with God&apos;s Child Id site, specifically when you login and request flyer texts. If you have any questions about your text plan or data plan, it is best to contact your wireless provider.
<br/><br/>
6. If you have any questions regarding privacy, please read our privacy policy: link to privacy policy                       </div>
                    </CardContent>
                </Card>
            </Card>
            <BottomBanner />
        </div>
    )
}