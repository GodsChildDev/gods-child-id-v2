import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getChildrenData } from "@/data/getChildrenData";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import plusImage from "@/public/plus-icon.jpg";
import ChildBox from "./child-box";
import BottomBanner from "../bottom-banner";
import MainNavBar from "@/app/main-navbar";

export default async function ChildrenPage() {
    const children = await getChildrenData()

    return (
        <div className="max-w-screen-xl mx-auto py-10">
            <MainNavBar activeItem={'children'} />
            <Card className="mt-4" style={{ background: 'lightyellow' }}>
                <CardHeader>
                    <CardTitle style={{color: 'darkgoldenrod'}}>ATTENTION Parent / Guardian: <br/>
                        <span style={{fontWeight: 'lighter'}}>After adding your family members below, you may generate shareable flyers. This action will ask you to enter your loved one's name and some details about their disappearance. Note: while this site is primarily poised for protecting children, it may also be used to protect your elderly. Please add up to 8 family members.
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {!children?.length && (<p className="text-center py-10 text-lg text-muted-foreground">You don`t have any children added. Use the button above to add a child to your profile</p>)}
                    {!!children?.length && (
                        <div className="grid grid-cols-3 gap-5 max-w-full">
                            {children?.map((child, i) => (
                                <ChildBox child={child} key={child.id} i={i} />
                            ))}
                            <Card>
                                <CardHeader className="text-center mt-5">
                                    <CardTitle className="text-3xl">Add Child</CardTitle>
                                </CardHeader>
                                <CardFooter className="mt-25 flex items-center justify-center">
                                    <Link href="/dashboard/children/new">
                                        <Image height={150} width={150} src={plusImage} alt="add child button" />
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                    )}
                </CardContent>
            </Card>
            <BottomBanner />

        </div>
    )
}