import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getChildrenData } from "@/data/getChildrenData";
import { BookHeartIcon } from "lucide-react";
import Link from "next/link";

export default async function ChildDashboard(){
    const children = await getChildrenData();
    return(
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <span>My Children</span>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href="/dashboard/children">View All</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/dashboard/children/new">Add Child</Link>
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {!children?.length && (
                    <p className="text-center py-10 text-lg text-muted-foreground">You have no children created yet. Start by hitting &quot;Create New&quot; to create your first child.</p>
                )}
                {!!children?.length && (
                    <Table className="mt-4">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Age</TableHead>
                                    <TableHead>Gender</TableHead>
                                    <TableHead>Height</TableHead>
                                    <TableHead>Weight</TableHead>
                                    <TableHead>Hair Color</TableHead>
                                    <TableHead>Eye Color</TableHead>
                                    <TableHead />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {children.map((child) => (
                                    <TableRow key={child.id}>
                                        <TableCell>{child.age}</TableCell>
                                        <TableCell>{child.gender}</TableCell>
                                        <TableCell>{child.height}</TableCell>
                                        <TableCell>{child.weight}</TableCell>
                                        <TableCell>{child.hairColor}</TableCell>
                                        <TableCell>{child.eyeColor}</TableCell>
                                        <TableCell className="text-right justify-between">
                                            <Button variant="outline" size="icon" aria-label="Create Flyer" asChild>
                                                <Link href={`/dashboard/children/flyers/${child.id}`}>
                                                    <BookHeartIcon />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                )}
            </CardContent>
        </Card>
    )
}