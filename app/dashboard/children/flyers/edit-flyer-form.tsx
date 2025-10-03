"use client";

import FlyerForm, { flyerFormSchema } from "@/components/flyer-form";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { createFlyer, updateFlyer } from "./actions";

export default function EditFlyerForm({flyer, isNew}: {
    flyer : {
        childName: string;
        id: number;
        childId: number;
        lastSeenAt: string;
        lastSeenWearing: string;
        lawEnforcementId: string;
        parentName: string;
        parentPhone: string;
        emergencyName: string;
        emergencyType: string;
        emergencyPhone: string;
    }, isNew : boolean
}){
    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof flyerFormSchema>) => {
        // const actionPresent = isNew ? 'Creating' : 'Editing',
        //     actionPast = isNew ? 'Created' : 'Edited';
        // const result = isNew ? 
        // await createFlyer({
        //     childId: flyer.childId,
        //     childName: data.childName,
        //     lastSeenAt: data.lastSeenAt,
        //     lastSeenWearing: data.lastSeenWearing,
        //     lawEnforcementId: data.lawEnforcementId,
        //     parentName: data.parentName,
        //     parentPhone: data.parentPhone,
        //     emergencyName: data.emergencyName,
        //     emergencyType: data.emergencyType,
        //     emergencyPhone: data.emergencyPhone
        // }) :
        // await updateFlyer({
        //     id: flyer.id,
        //     childName: data.childName,
        //     lastSeenAt: data.lastSeenAt,
        //     lastSeenWearing: data.lastSeenWearing,
        //     lawEnforcementId: data.lawEnforcementId,
        //     parentName: data.parentName,
        //     parentPhone: data.parentPhone,
        //     emergencyName: data.emergencyName,
        //     emergencyType: data.emergencyType,
        //     emergencyPhone: data.emergencyPhone
        // });

        // if (result?.error) {
        //     toast.error(`Error ${actionPresent} Flyer.`, {
        //         style: {backgroundColor: "red"}
        //     })
        //     return;
        // }

        const actionPast = 'Created'

        toast.success(`Flyer Successfully ${actionPast}!`, {
            style: {backgroundColor: "green"}
        });
        router.push(`/dashboard/children/flyers/${flyer.childId}`);
    };


    return (
        <FlyerForm defaultValues={{
            childName: flyer.childName,
            lastSeenAt: flyer.lastSeenAt,
            lastSeenWearing: flyer.lastSeenWearing,
            lawEnforcementId: flyer.lawEnforcementId
        }} onSubmit={handleSubmit} />
    )
}