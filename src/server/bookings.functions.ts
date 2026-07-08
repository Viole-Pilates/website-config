import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { bookingRequests } from '../../db/schema.js'

const BookingSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  service: z.enum(['pilates', 'bodyweight-training', 'mobility']),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  message: z.string().max(1000).optional(),
})

export const createBooking = createServerFn({ method: 'POST' })
  .inputValidator(BookingSchema)
  .handler(async ({ data }) => {
    const [booking] = await db
      .insert(bookingRequests)
      .values(data)
      .returning()
    return booking
  })

export const listBookings = createServerFn({ method: 'GET' })
  .inputValidator((data: { adminKey: string }) => data)
  .handler(async ({ data }) => {
    if (data.adminKey !== process.env.ADMIN_KEY) {
      throw new Error('Unauthorized')
    }
    return db
      .select()
      .from(bookingRequests)
      .orderBy(bookingRequests.createdAt)
  })

const UpdateStatusSchema = z.object({
  adminKey: z.string(),
  id: z.number(),
  status: z.enum(['pending', 'accepted', 'declined']),
})

export const updateBookingStatus = createServerFn({ method: 'POST' })
  .inputValidator(UpdateStatusSchema)
  .handler(async ({ data }) => {
    if (data.adminKey !== process.env.ADMIN_KEY) {
      throw new Error('Unauthorized')
    }
    const [updated] = await db
      .update(bookingRequests)
      .set({ status: data.status })
      .where(eq(bookingRequests.id, data.id))
      .returning()
    return updated
  })
