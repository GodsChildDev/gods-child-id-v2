import MainNavBar from "@/app/main-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import BottomBanner from "../../bottom-banner";
import NewChildForm from "./new-child-form";
import tree from "@/public/tree-drawing.png";
import Image from "next/image";
import '../[childId]/child-edit.css';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function NewChildPage(){
    return(
        <div className="max-w-screen-xl mx-auto py-10">
            <MainNavBar activeItem={'children'} />
            <div style={{display: 'inline-flex'}}>
            <Card className="mt-4 max-w-screen-md" style={{ background: 'lightyellow' }}>
                <CardHeader>
                    <CardTitle  className="flex justify-between">
                        <span>NEW CHILD</span>
                        <Button size="icon" style={{background: 'transparent', color: 'black', cursor: 'pointer'}} asChild aria-label="Close">
                            <Link href="/dashboard/children">
                                <X />
                            </Link>
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <NewChildForm />
                </CardContent>
            </Card>
            <Image src={tree} alt="call" width={520} height={600} quality={100} 
                className={'treeBox'} />
            </div>
            <BottomBanner />
        </div>
    )
}