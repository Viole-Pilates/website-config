import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "../server.js";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/netlify-db";
import { pgTable, timestamp, text, serial } from "drizzle-orm/pg-core";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const bookingRequests = pgTable("booking_requests", {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  phone: text(),
  service: text().notNull(),
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  message: text(),
  status: text().notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow()
});
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bookingRequests
}, Symbol.toStringTag, { value: "Module" }));
const db = drizzle({ schema });
const BookingSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  service: z.enum(["pilates", "bodyweight-training", "mobility"]),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  message: z.string().max(1e3).optional()
});
const createBooking_createServerFn_handler = createServerRpc({
  id: "d4dcf1107b01f198d2c3062f92c1306e7a8c4af80ac2593280df60d6c8f01b0e",
  name: "createBooking",
  filename: "src/server/bookings.functions.ts"
}, (opts) => createBooking.__executeServer(opts));
const createBooking = createServerFn({
  method: "POST"
}).inputValidator(BookingSchema).handler(createBooking_createServerFn_handler, async ({
  data
}) => {
  const [booking] = await db.insert(bookingRequests).values(data).returning();
  return booking;
});
const listBookings_createServerFn_handler = createServerRpc({
  id: "e3d4e9275e454df7b7d69f5e0fdcdec509bcf137174afd0fd8f0b64751c91b2d",
  name: "listBookings",
  filename: "src/server/bookings.functions.ts"
}, (opts) => listBookings.__executeServer(opts));
const listBookings = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(listBookings_createServerFn_handler, async ({
  data
}) => {
  if (data.adminKey !== process.env.ADMIN_KEY) {
    throw new Error("Unauthorized");
  }
  return db.select().from(bookingRequests).orderBy(bookingRequests.createdAt);
});
const UpdateStatusSchema = z.object({
  adminKey: z.string(),
  id: z.number(),
  status: z.enum(["pending", "accepted", "declined"])
});
const updateBookingStatus_createServerFn_handler = createServerRpc({
  id: "3e73649da33577c3a9d616cdb8c39470d67d05d35cbfca2e0426fdca2c2574d2",
  name: "updateBookingStatus",
  filename: "src/server/bookings.functions.ts"
}, (opts) => updateBookingStatus.__executeServer(opts));
const updateBookingStatus = createServerFn({
  method: "POST"
}).inputValidator(UpdateStatusSchema).handler(updateBookingStatus_createServerFn_handler, async ({
  data
}) => {
  if (data.adminKey !== process.env.ADMIN_KEY) {
    throw new Error("Unauthorized");
  }
  const [updated] = await db.update(bookingRequests).set({
    status: data.status
  }).where(eq(bookingRequests.id, data.id)).returning();
  return updated;
});
export {
  createBooking_createServerFn_handler,
  listBookings_createServerFn_handler,
  updateBookingStatus_createServerFn_handler
};
