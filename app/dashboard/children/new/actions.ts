"use server";

import { db } from "@/db";
import { childrenTable } from "@/db/schema";
import { childSchema } from "@/validation/childSchema";
import { auth } from "@clerk/nextjs/server";




export const createChild = async (data: {
    age: number;
    dateOfBirth: string;
    height: string;
    weight: number;
    eyeColor: string;
    hairColor: string;
    identifiers: string;
    medicalConditions: string;
    gender: string;
}) => {
    // const {userId} = await auth();
    const userId = 'user_30vXSlvLUCHzhajvUezN85Oa1Km';

    if (!userId){
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    console.log('JDH: ' + JSON.stringify(data));
    const validation = childSchema.safeParse(data);
    console.log('JDH 2: ' + JSON.stringify(validation));
    if(!validation.success){
        return {
            error: true,
            message: validation.error.issues[0].message
        }
    }

    const [child] = await db.insert(childrenTable).values({
        userId,
        age: data.age.toString(),
        dateOfBirth: data.dateOfBirth,
        height: data.height,
        weight: data.weight,
        eyeColor: data.eyeColor,
        hairColor: data.hairColor,
        identifiers: data.identifiers,
        medicalConditions: data.medicalConditions,
        gender: data.gender
    }).returning();

    return {
        id: child.id
    }

}