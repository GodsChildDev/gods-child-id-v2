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
        gender: "male" | "female";
        id: number;
        age: string;
        dateOfBirth: string;
        height: string;
        weight: string;
        eyeColor: string;
        hairColor: string;
        identifiers: string;
        medicalConditions: string;
    }
}){
    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof childFormSchema>) => {
        const result = await updateChild({
            id: child.id,
            age: data.childAge,
            dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
            height: data.height,
            weight: data.weight,
            eyeColor: data.eyeColor,
            hairColor: data.hairColor,
            identifiers: data.identifiers,
            medicalConditions: data.medicalConditions,
            gender: data.childGender,
        })

        if(result?.error){
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
            childAge: Number(child.age),
            dateOfBirth: new Date(child.dateOfBirth),
            height: child.height,
            weight: Number(child.weight),
            eyeColor: child.eyeColor,
            hairColor: child.hairColor,
            identifiers: child.identifiers,
            medicalConditions: child.medicalConditions,
        }} onSubmit={handleSubmit} />
    )
}