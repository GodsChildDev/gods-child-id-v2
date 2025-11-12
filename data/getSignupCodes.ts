"use server"

import { db } from "@/db";
import { groupCode, signupDetails } from "@/db/schema";
import { eq } from "drizzle-orm";
import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";


export async function isValidSignupCode(code: string) {
  const [group_code] = await db.select().from(groupCode)
    .where(eq(groupCode.codeValue, code))
    .limit(1);
  return group_code != null;
}

export async function getUser() {
  const { userId } = await auth();
  return userId;
}

export async function getUserEmail() {
  const user = await currentUser();
  return user?.emailAddresses?.[0]?.emailAddress;
}

export const saveUserSignupCode = async (user: string, signupCode: string) => {
  const [signupDetail] = await db.insert(signupDetails).values({
    user: user,
    signupCode: signupCode,
    createdTimestamp: format(new Date(), "M/dd/yy")
  }).returning();

  return {
    id: signupDetail.id
  }

}

