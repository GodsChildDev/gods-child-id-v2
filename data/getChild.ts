 'use server';

import { db } from "@/db";
import { childrenTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import "server-only";

type RaceType = 
  | "American Indian or Alaska Native"
  | "Asian"
  | "Black or African American"
  | "Hispanic or Latino"
  | "Middle Eastern or North African"
  | "Native Hawaiian or Pacific Islander"
  | "White";

  const translateRace = (raceString: string | null): RaceType => {
    const validRaces: RaceType[] = [
      "American Indian or Alaska Native",
      "Asian",
      "Black or African American",
      "Hispanic or Latino",
      "Middle Eastern or North African",
      "Native Hawaiian or Pacific Islander",
      "White",
    ];
  
    if (raceString && validRaces.includes(raceString as RaceType)) {
      return raceString as RaceType;
    }
    
    return "White"; 
  };

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
    return  {
      ...child,
      weight: parseFloat(child.weight),
      imageUrl: child.imageUrl || '', 
      race: translateRace(child.race)
    };
}

export async function getPureChild(childId: number){
  const [child] = await db.select().from(childrenTable).where(eq(childrenTable.id, childId));
  return child;
}

// export async function enforce2FAForAllUsers() {
//     console.log(`FIND User List`);
//     const cl = await clerkClient();
//     // console.log('cl:' + JSON.stringify(cl));
//     const usersResponse = cl.users;
//     // console.log('usersResponse: ' + JSON.stringify(usersResponse));
//     const users = usersResponse.data;
//     // console.log('users: ' + JSON.stringify(users));
//   console.log(`User List ACQUIRED`);
//     for (const user of users) {
//         console.log(`ATTEMPTING 2FA enforced for user: ${user.id}`); 
//       await clerkClient.users.updateUser(user.id, {
//         requireSecondFactor: true,
//       });
//       console.log(`2FA enforced for user: ${user.id}`);
//     }
//   }