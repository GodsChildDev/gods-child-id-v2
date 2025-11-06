"use server";

import { db } from "@/db";
import { childrenTable } from "@/db/schema";
import { childSchema } from "@/validation/childSchema";
import { auth } from "@clerk/nextjs/server";


export const createChild = async (data: {
    dateOfBirth: string;
    height: string;
    weight: number;
    eyeColor: string;
    hairColor: string;
    identifiers: string;
    medicalConditions: string;
    gender: string;
    imageUrl: string;
    race: string;
}) => {
    const {userId} = await auth();

    if (!userId){
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    const validation = childSchema.safeParse(data);
    if (!validation.success) {
        return {
            error: true,
            message: validation.error.issues[0].message
        }
    }

    const [child] = await db.insert(childrenTable).values({
        userId,
        dateOfBirth: data.dateOfBirth,
        height: data.height,
        weight: Number(data.weight),
        eyeColor: data.eyeColor,
        hairColor: data.hairColor,
        identifiers: data.identifiers,
        medicalConditions: data.medicalConditions,
        gender: data.gender,
        imageUrl: data.imageUrl,
        race: data.race
    } as any // eslint-disable-line @typescript-eslint/no-explicit-any
    ).returning();

    return {
        id: child.id
    }

}