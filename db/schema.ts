import { date, integer, numeric, pgTable, text } from "drizzle-orm/pg-core";

export const childrenTable = pgTable("children",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: text("user_id").notNull(),
    gender: text({
        enum: ["male", "female"],
    }).notNull(),
    dateOfBirth: date("date_of_birth").notNull(),
    height: text("child_height").notNull(),
    weight: numeric("child_weight").notNull(),
    eyeColor: text("eye_color").notNull(),
    hairColor: text("hair_color").notNull(),
    identifiers: text("identifying_characteristics").notNull(),
    medicalConditions: text("medical_conditions").notNull(),
    race: text("race"),
    imageUrl: text("image_url")
})

export const flyerTable = pgTable("flyers", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    childId: integer("child_id").references(() => childrenTable.id).notNull(),
    lawEnforcementId: text("law_enforcement_id").notNull(),
    childName: text("child_name").notNull(),
    lastSeenAt: text("last_seen_at").notNull(),
    lastSeenWearing: text("last_seen_wearing").notNull(),
    createdTimestamp: text("created_timestamp")
});

export const groupCode = pgTable("group_code", {
    codeValue: text("code_value")
});

// child_id
// law_enforcement_id
// last_seen_at
// last_seen_wearing
// parent_phone
// emergency_phone
// parent_name
// emergency_name
// emergency_type
// child_name