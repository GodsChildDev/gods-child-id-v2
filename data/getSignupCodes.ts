"use server"

import { db } from "@/db";
import { groupCode, signupDetails } from "@/db/schema";
import { and, eq } from "drizzle-orm";
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
  return user?.emailAddresses[0]?.emailAddress;
}

export async function getUserPhone() {
  const user = await currentUser();
  return user?.phoneNumbers[0]?.phoneNumber;
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

export async function setBlockTimestamp() {
    const userId = await auth();
    
    if (!userId) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    console.log('JD timestamp: ' + format(new Date(new Date().getTime() + (60 * 60 * 1000)), "M/dd/yy"));
  
    try {
      console.log('attempting');
    await db.update(signupDetails).set({
            blockedTimestamp: format(new Date(new Date().getTime() + (60 * 60 * 1000)), "Pp")
    }).where(and(eq(signupDetails.user, userId.userId!)));
    } catch(e) {
      console.log(e);
  }
};

export async function isBlockedUser() {
  const userId = await auth();
    
    if (!userId) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }
  const [signin_details] = await db.select().from(signupDetails)
    .where(eq(signupDetails.user, userId.userId!))
    .limit(1);
    console.log('JDH blocked with stamp: ' + signin_details?.blockedTimestamp);
   if (signin_details != null) {
      const isAfterBlock = !signin_details.blockedTimestamp || (new Date() > new Date(signin_details.blockedTimestamp!));
      return !isAfterBlock;
    } else {
      return true;
   }
}


