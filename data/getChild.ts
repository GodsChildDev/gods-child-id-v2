'use server';

import { db } from "@/db";
import { childrenTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import "server-only";
import { clerkClient } from '@clerk/nextjs/server';

export async function getChild(childId: number){
    const { userId } = await auth();
    console.log('userId: ' + userId);
    if (!userId) {
        return null;
    }
    // const userId = 'user_30vXSlvLUCHzhajvUezN85Oa1Km';

    const [child] = await db.select().from(childrenTable).where(and(
        eq(childrenTable.id, childId),
        eq(childrenTable.userId, userId)
    ));
    return child;
}

export async function enforce2FAForAllUsers() {
    console.log(`FIND User List`);
    const cl = await clerkClient();
    // console.log('cl:' + JSON.stringify(cl));
    const usersResponse = cl.users;
    // console.log('usersResponse: ' + JSON.stringify(usersResponse));
    const users = usersResponse.data;
    // console.log('users: ' + JSON.stringify(users));
  console.log(`User List ACQUIRED`);
    for (const user of users) {
        console.log(`ATTEMPTING 2FA enforced for user: ${user.id}`); 
      await clerkClient.users.updateUser(user.id, {
        requireSecondFactor: true,
      });
      console.log(`2FA enforced for user: ${user.id}`);
    }
  }