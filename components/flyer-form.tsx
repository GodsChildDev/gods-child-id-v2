"use client";

import { z } from "zod";

export const flyerFormSchema = z.object({
    childName: z.string(),
    lastSeenAt: z.string(),
    lastSeenWearing: z.string(),
    parentPhone: z.string(),
    emergencyPhone: z.string(),
    imageUrl: z.string(),
})