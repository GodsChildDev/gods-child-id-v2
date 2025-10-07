import { z } from "zod";

export const flyerSchema = z.object({
    childId: z.number(),
    childName: z.string(),
    lastSeenAt: z.string(),
    lastSeenWearing: z.string(),
    lawEnforcementId: z.string()
})