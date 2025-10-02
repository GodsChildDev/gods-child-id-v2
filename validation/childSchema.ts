import { addDays, subYears } from "date-fns";
import { z } from "zod";

export const childSchema = z.object({
    dateOfBirth: z.coerce.date().max(addDays(new Date(), 1)),
    height: z.string(),
    weight: z.number().positive("Weight must be greater than 0"),
    eyeColor: z.string(),
    hairColor: z.string(),
    identifiers: z.string(),
    medicalConditions: z.string(),
    gender: z.string(),
    race: z.string(),
    imageUrl: z.string()
})