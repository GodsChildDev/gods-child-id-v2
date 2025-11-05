"use client";

import FlyerForm, { flyerFormSchema } from "@/components/flyer-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { createFlyer } from "./actions";

export default function EditFlyerForm({flyer, childId}: {
    flyer : {
        childName: string;
        id: number;
        childId: number;
        lastSeenAt: string;
        lastSeenWearing: string;
        lawEnforcementId: string;
    }, childId : any // eslint-disable-line @typescript-eslint/no-explicit-any
}){
    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof flyerFormSchema>, childId) => {
        debugger;
        const isNew = true,
            actionPresent = isNew ? 'Creating' : 'Editing',
            actionPast = isNew ? 'Created' : 'Edited';
            console.log('childId: ' + childId);
        const result = await createFlyer({
            childId: Number.parseInt(childId),
            childName: data.childName,
            lastSeenAt: data.lastSeenAt,
            lastSeenWearing: data.lastSeenWearing,
            lawEnforcementId: data.lawEnforcementId
        });

        console.log('JDH: ' + result);
        if (result?.error) {
            toast.error(`Error ${actionPresent} Flyer.`, {
                style: {backgroundColor: "red"}
            })
            return;
        }

        // const actionPast = 'Created'

        toast.success(`Flyer Successfully ${actionPast}!`, {
            style: {backgroundColor: "green"}
        });
        router.push(`/dashboard/children/flyers/${childId}`);
    };


    return (
        <FlyerForm defaultValues={{
            childId: childId,
            childName: flyer.childName,
            lastSeenAt: flyer.lastSeenAt,
            lastSeenWearing: flyer.lastSeenWearing,
            lawEnforcementId: flyer.lawEnforcementId
        // }} onSubmit={handleSubmit} />
        }} onSubmit={(data) => handleSubmit(data, childId)} />
    )
}