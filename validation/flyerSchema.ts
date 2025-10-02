import { z } from "zod";

export const flyerSchema = z.object({
    childName: z.string(),
    lastSeenAt: z.string(),
    lastSeenWearing: z.string(),
    lawEnforcementId: z.string(),
    parentName: z.string(),
    parentPhone: z.string(),
    emergencyName: z.string(),
    emergencyType: z.string(),
    emergencyPhone: z.string()
})