'use server';

import { db } from "@/db";
import { flyerTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, desc } from "drizzle-orm";
import "server-only";

export async function getFlyer(flyerId: number) {
    const [flyer] = await db.select().from(flyerTable).where(and(
        eq(flyerTable.id, flyerId),
    ));
    return flyer;
}

export async function getFlyerByChild(childId : number) {
  const [flyer] = await db.select().from(flyerTable)
    .where(eq(flyerTable.childId, childId))
    .orderBy(desc(flyerTable.id))
    .limit(1);
  return flyer;
}

export async function getFlyerByCode(code : string) {
  const [flyer] = await db.select().from(flyerTable)
    .where(eq(flyerTable.lawEnforcementId, code))
    .orderBy(desc(flyerTable.id))
    .limit(1);
  return flyer;
}
