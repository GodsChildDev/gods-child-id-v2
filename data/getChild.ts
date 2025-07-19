import { db } from "@/db";
import { childrenTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import "server-only";

export async function getChild(childId: number){
    const {userId} = await auth();
    if(!userId){
        return null;
    }

    const [child] = await db.select().from(childrenTable).where(and(
        eq(childrenTable.id, childId),
        eq(childrenTable.userId, userId)
    ));
    return child;
}