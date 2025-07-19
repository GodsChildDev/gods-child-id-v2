import { addDays, subYears } from "date-fns";
import { z } from "zod";

export const childSchema = z.object({
    age: z.number().positive("Age must be greater than 0"),
    dateOfBirth: z.coerce.date().min(subYears(new Date(), 25)).max(addDays(new Date(), 1)),
    height: z.string(),
    weight: z.number().positive("Weight must be greater than 0"),
    eyeColor: z.string(),
    hairColor: z.string(),
    identifiers: z.string(),
    medicalConditions: z.string(),
    gender: z.string()
})