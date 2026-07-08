import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { listBookings, updateBookingStatus } from '@/server/bookings.functions'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

type Booking = {
  id: number
  name: string
  email: string
  phone: string | null
  service: string
  preferredDate: string
  preferredTime: string
  message: string | null
  status: string
  createdAt: Date | string | null
}

function AdminPage() {
  const fetchBookings = useServerFn(listBookings)
  const setStatus = useServerFn(updateBookingStatus)

  const [adminKey, setAdminKey] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [bookings, setBookings] = useState<Array<Booking>>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadBookings(key: string) {
    setLoading(true)
    setError('')
    try {
      const result = await fetchBookings({ data: { adminKey: key } })
      setBookings(result as Array<Booking>)
      setUnlocked(true)
    } catch {
      setError('Incorrect admin key.')
      setUnlocked(false)
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusChange(id: number, status: 'accepted' | 'declined') {
    await setStatus({ data: { adminKey, id, status } })
    setBookings((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status } : booking,
      ),
    )
  }

  if (!unlocked) {
    return (
      <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
        <h1 className="mb-6 text-2xl font-bold text-stone-900">
          Admin Access
        </h1>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            loadBookings(adminKey)
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="password"
            placeholder="Admin key"
            value={adminKey}
            onChange={(event) => setAdminKey(event.target.value)}
            className="rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-emerald-800 px-6 py-2 text-sm font-semibold text-stone-50 hover:bg-emerald-900 disabled:opacity-60"
          >
            {loading ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <h1 className="mb-8 text-3xl font-bold text-stone-900">
        Booking Requests
      </h1>
      {bookings.length === 0 && (
        <p className="text-stone-500">No booking requests yet.</p>
      )}
      <div className="flex flex-col gap-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-2xl border border-stone-200 bg-white p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-stone-900">
                  {booking.name}{' '}
                  <span className="font-normal text-stone-500">
                    ({booking.email}
                    {booking.phone ? `, ${booking.phone}` : ''})
                  </span>
                </h2>
                <p className="mt-1 text-sm text-stone-600">
                  {booking.service} — {booking.preferredDate} at{' '}
                  {booking.preferredTime}
                </p>
                {booking.message && (
                  <p className="mt-2 text-sm text-stone-500">
                    "{booking.message}"
                  </p>
                )}
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                  booking.status === 'accepted'
                    ? 'bg-emerald-100 text-emerald-800'
                    : booking.status === 'declined'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-800'
                }`}
              >
                {booking.status}
              </span>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleStatusChange(booking.id, 'accepted')}
                disabled={booking.status === 'accepted'}
                className="rounded-full bg-emerald-800 px-4 py-1.5 text-sm font-semibold text-stone-50 hover:bg-emerald-900 disabled:opacity-40"
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusChange(booking.id, 'declined')}
                disabled={booking.status === 'declined'}
                className="rounded-full border border-stone-300 px-4 py-1.5 text-sm font-semibold text-stone-700 hover:border-stone-400 disabled:opacity-40"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
