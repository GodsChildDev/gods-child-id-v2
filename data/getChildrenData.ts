'use server';

import { db } from "@/db";
import { childrenTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { asc, eq } from "drizzle-orm";
import "server-only";

export async function getChildrenData() {
    // const { userId } = auth;

    // if(!userId){
    //     return null;
    // }
    const userId = 'user_30vXSlvLUCHzhajvUezN85Oa1Km';

    const children = await db.select().from(childrenTable).where(eq(childrenTable.userId, userId)).orderBy(asc(childrenTable.age));

    return children;
}