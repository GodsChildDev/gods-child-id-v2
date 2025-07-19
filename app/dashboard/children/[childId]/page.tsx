import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditChildForm from "./edit-child-form";
import { getChild } from "@/data/getChild";
import { notFound } from "next/navigation";
import DeleteChildDialog from "./delete-child-dialog";

export default async function EditChildPage({
    params
}: {
    params: Promise<{childId: string}>
}){
    const paramsValues = await params;

    const childId = Number(paramsValues.childId);

    if(isNaN(childId)){
        notFound();
    }

    const child = await getChild(childId);
    if(!child){
        notFound();
    }

    return(
            <Card className="mt-4 max-w-screen-md">
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        <span>Edit Child</span>
                        <DeleteChildDialog childId={child.id} />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <EditChildForm child={child} />
                </CardContent>
            </Card>
    )
}