"use server";

import { db } from "@/db";
import { childrenTable } from "@/db/schema";
import { childSchema } from "@/validation/childSchema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const updateChildSchema = childSchema.and(z.object({
    id: z.number(),
}))

export async function updateChild(data: {
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
}){
    console.log('submitting: '+ JSON.stringify(data));
    let userId = await auth();
    if (!userId) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    // const validation = updateChildSchema.safeParse(data);

    // if(!validation.success){
    //     return {
    //         error: true,
    //         message: validation.error.issues[0].message,
    //     };
    // }

    var x = db.update(childrenTable).set({
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        height: data.height,
        weight: data.weight.toString(),
        eyeColor: data.eyeColor,
        hairColor: data.hairColor,
        identifiers: data.identifiers,
        medicalConditions: data.medicalConditions,
        imageUrl: data.imageUrl,
        race: data.race
    }).where(and(
        eq(childrenTable.id, data.id),
        eq(childrenTable.userId, userId)
    ));
    console.log('JDH after: ' + JSON.stringify(x?.error));
    return x;
};

export async function deleteChild(childId: number){
    const {userId} = await auth();

    if(!userId){
        return {
            error: true,
            message: "Unauthorized."
        }
    }

    await db.delete(childrenTable).where(and(
        eq(childrenTable.id, childId),
        eq(childrenTable.userId, userId)
    ));
}