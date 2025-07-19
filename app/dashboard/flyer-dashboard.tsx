import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export default async function FlyerDashboard(){
    return(
        <Card className="w-[450px] h-full mr-0">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <span>My Flyers</span>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href="/dashboard/children/flyers">View All</Link>
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center py-8 text-lg text-muted-foreground">You have no flyers created yet. Start by hitting the flyer button in the childrens table to create your first flyer.</p>
            </CardContent>
        </Card>
    )
}