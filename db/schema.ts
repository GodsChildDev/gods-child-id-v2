import { date, integer, numeric, pgTable, text } from "drizzle-orm/pg-core";

export const childrenTable = pgTable("children",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: text("user_id").notNull(),
    gender: text({
        enum: ["male", "female"],
    }).notNull(),
    age: numeric("child_age").notNull(),
    dateOfBirth: date("date_of_birth").notNull(),
    height: text("child_height").notNull(),
    weight: numeric("child_weight").notNull(),
    eyeColor: text("eye_color").notNull(),
    hairColor: text("hair_color").notNull(),
    identifiers: text("identifying_characteristics").notNull(),
    medicalConditions: text("medical_conditions").notNull(),
})

export const flyerTable = pgTable("flyers", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    childId: integer("child_id").references(() => childrenTable.id).notNull(),
    lawEnforcementId: text("law_enforcement_id").notNull(),
    flyerName: text("encrypted_name").notNull(),
    lastSeenAt: text("last_seen_at").notNull(),
    lastSeenWearing: text("last_seen_wearing").notNull(),
    parentPhone: text("parent_phone").notNull(),
    emergencyPhone: text("emergency_phone").notNull(),
    imageUrl: text("image_url").notNull(),
})