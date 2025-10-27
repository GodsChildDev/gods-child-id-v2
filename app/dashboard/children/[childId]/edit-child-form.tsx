"use client";

import ChildForm, { childFormSchema } from "@/components/child-form";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { updateChild } from "./actions";

export default function EditChildForm({
    child
}: {
    child: {
        id: number;
        gender: "male" | "female";
        dateOfBirth: string;
        height: string;
        weight: number;
        eyeColor: string;
        hairColor: string;
        identifiers: string;
        medicalConditions: string;
        imageUrl: string;
        race: "American Indian or Alaska Native" | "Asian" | "Black or African American" | "Hispanic or Latino" | "Middle Eastern or North African" | "Native Hawaiian or Pacific Islander" | "White";
    }
}){
    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof childFormSchema>) => {
        const result = await updateChild({
            id: child.id,
            dateOfBirth: data.dateOfBirth.toISOString().substring(0,10),
            height: data.height,
            weight: Number(data.weight),
            eyeColor: data.eyeColor,
            hairColor: data.hairColor,
            identifiers: data.identifiers,
            medicalConditions: data.medicalConditions,
            gender: data.childGender,
            imageUrl: data.imageUrl,
            race: data.race
        })

        console.log('JDH:' + JSON.stringify(result));

        if (result?.error) {
            toast.error("Error Editing Child.", {
                style: {backgroundColor: "red"}
            })
            return;
        }

        toast.success("Child Successfully Edited!", {
            style: {backgroundColor: "green"}
        });
        router.push("/dashboard/children");
    };

    return (
        <ChildForm defaultValues={{
            childGender: child.gender,
            dateOfBirth: new Date(child.dateOfBirth),
            height: child.height,
            weight: Number(child.weight),
            eyeColor: child.eyeColor,
            hairColor: child.hairColor,
            identifiers: child.identifiers,
            medicalConditions: child.medicalConditions,
            imageUrl: child.imageUrl,
            race: child.race
        }} id={child.id} onSubmit={handleSubmit} />
    )
}