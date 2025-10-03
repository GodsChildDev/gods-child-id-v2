"use client";

import ChildForm, { childFormSchema } from "@/components/child-form";
import { z } from "zod";
import { createChild } from "./actions";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewChildForm(){

    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof childFormSchema>) => {
        const result = await createChild({
            dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
            height: data.height,
            weight: Number(data.weight),
            eyeColor: data.eyeColor,
            hairColor: data.hairColor,
            identifiers: data.identifiers,
            medicalConditions: data.medicalConditions,
            gender: data.childGender,
            imageUrl: data.imageUrl,
            race: data.race
        });

        if(result.error){
            console.log('JDH:' + JSON.stringify(result));
            toast.error("Error Creating Child.", {
                style: {backgroundColor: "red"}
            })
            return;
        }

        toast.success("Child Created", {
            style: {backgroundColor: "green"}
        });
        router.push("/dashboard/children");
    };


    return (
        <ChildForm onSubmit={handleSubmit} />
    )
}