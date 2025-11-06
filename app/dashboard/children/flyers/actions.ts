"use server";

import { db } from "@/db";
import { flyerTable } from "@/db/schema";
import { flyerSchema } from "@/validation/flyerSchema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { format } from "date-fns";

const updateFlyerSchema = flyerSchema.and(z.object({
    id: z.number(),
}))

export async function updateFlyer(data: {
        id: number;
        childId: number;
        childName: string;
        lastSeenAt: string;
        lastSeenWearing: string;
        lawEnforcementId: string;
}){
    const userId = await auth();
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
            childId: data.childId,
            childName: data.childName,
            lastSeenAt: data.lastSeenAt,
            lastSeenWearing: data.lastSeenWearing,
            lawEnforcementId: data.lawEnforcementId
    }).where(and(
        eq(flyerTable.id, data.id)
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
        eq(flyerTable.id, flyerId)
    ));
};

export const createFlyer = async (data: {
        childId: number;
        childName: string;
        lastSeenAt: string;
        lastSeenWearing: string;
        lawEnforcementId: string;
}) => {
    console.log('data: ' + JSON.stringify(data));
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

    const [flyer] = await db.insert(flyerTable).values({
        childId: data.childId,
        childName: data.childName,
        lastSeenAt: data.lastSeenAt,
        lastSeenWearing: data.lastSeenWearing,
        lawEnforcementId: data.lawEnforcementId,
        createdTimestamp: format(new Date(), "M/dd/yy")
    }).returning();

    return {
        id: flyer.id
    }

}