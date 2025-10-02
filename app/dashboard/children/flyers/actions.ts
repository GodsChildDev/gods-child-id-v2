"use server";

import { db } from "@/db";
import { flyerTable } from "@/db/schema";
import { flyerSchema } from "@/validation/flyerSchema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const updateFlyerSchema = flyerSchema.and(z.object({
    id: z.number(),
}))

export async function updateFlyer(data: {
        id: number;
        childName: string;
        lastSeenAt: string;
        lastSeenWearing: string;
        lawEnforcementId: string;
        parentName: string;
        parentPhone: string;
        emergencyName: string;
        emergencyType: string;
        emergencyPhone: string;
}){
    let userId = await auth();
    if (!userId) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    const validation = updateFlyerSchema.safeParse(data);

    if (!validation.success) {
        return {
            error: true,
            message: validation.error.issues[0].message,
        };
    }

    await db.update(flyerTable).set({
            childName: data.childName,
            lastSeenAt: data.lastSeenAt,
            lastSeenWearing: data.lastSeenWearing,
            lawEnforcementId: data.lawEnforcementId,
            parentName: data.parentName,
            parentPhone: data.parentPhone,
            emergencyName: data.emergencyName,
            emergencyType: data.emergencyType,
            emergencyPhone: data.emergencyPhone
    }).where(and(
        eq(flyerTable.id, data.id),
        eq(flyerTable.userId, userId)
    ));
};

export async function deleteFlyer (flyerId: number) {
    const {userId} = await auth();

    if (!userId) {
        return {
            error: true,
            message: "Unauthorized."
        }
    }

    await db.delete(flyerTable).where(and(
        eq(flyerTable.id, flyerId),
        eq(flyerTable.userId, userId)
    ));
};

export const createFlyer = async (data: {
    childId: number;
        childName: string;
        lastSeenAt: string;
        lastSeenWearing: string;
        lawEnforcementId: string;
        parentName: string;
        parentPhone: string;
        emergencyName: string;
        emergencyType: string;
        emergencyPhone: string;
}) => {
    const {userId} = await auth();

    if (!userId){
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    const validation = flyerSchema.safeParse(data);
    if (!validation.success) {
        return {
            error: true,
            message: validation.error.issues[0].message
        }
    }

    const [flyer] = await db.insert(flyerSchema).values({
        childId: data.childId,
        childName: data.childName,
        lastSeenAt: data.lastSeenAt,
        lastSeenWearing: data.lastSeenWearing,
        lawEnforcementId: data.lawEnforcementId,
        parentName: data.parentName,
        parentPhone: data.parentPhone,
        emergencyName: data.emergencyName,
        emergencyType: data.emergencyType,
        emergencyPhone: data.emergencyPhone
    }).returning();

    return {
        id: flyer.id
    }

}