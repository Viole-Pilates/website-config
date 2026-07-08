import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const bookingRequests = pgTable("booking_requests", {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  phone: text(),
  service: text().notNull(),
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  message: text(),
  status: text().notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});
