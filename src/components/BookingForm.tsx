import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { createBooking } from '@/server/bookings.functions'

const SERVICES = [
  { value: 'pilates', label: 'Pilates' },
  { value: 'bodyweight-training', label: 'Bodyweight Training' },
  { value: 'mobility', label: 'Mobility' },
] as const

export function BookingForm() {
  const submitBooking = useServerFn(createBooking)
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>(
    'idle',
  )
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('pending')
    setErrorMessage('')

    const form = new FormData(event.currentTarget)
    try {
      await submitBooking({
        data: {
          name: String(form.get('name') ?? ''),
          email: String(form.get('email') ?? ''),
          phone: String(form.get('phone') ?? '') || undefined,
          service: form.get('service') as
            | 'pilates'
            | 'bodyweight-training'
            | 'mobility',
          preferredDate: String(form.get('preferredDate') ?? ''),
          preferredTime: String(form.get('preferredTime') ?? ''),
          message: String(form.get('message') ?? '') || undefined,
        },
      })
      setStatus('success')
      event.currentTarget.reset()
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <h3 className="text-xl font-semibold text-emerald-900">
          Request received!
        </h3>
        <p className="mt-2 text-emerald-800">
          Thanks for reaching out — I'll review your preferred time and
          confirm by email shortly.
        </p>
        <button
          className="mt-6 text-sm font-medium text-emerald-700 underline underline-offset-4"
          onClick={() => setStatus('idle')}
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm sm:grid-cols-2"
    >
      <div className="flex flex-col gap-1.5 sm:col-span-1">
        <label htmlFor="name" className="text-sm font-medium text-stone-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={120}
          className="rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-1">
        <label htmlFor="email" className="text-sm font-medium text-stone-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-1">
        <label htmlFor="phone" className="text-sm font-medium text-stone-700">
          Phone <span className="text-stone-400">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          maxLength={40}
          className="rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-1">
        <label
          htmlFor="service"
          className="text-sm font-medium text-stone-700"
        >
          Service
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue="pilates"
          className="rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
        >
          {SERVICES.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-1">
        <label
          htmlFor="preferredDate"
          className="text-sm font-medium text-stone-700"
        >
          Preferred date
        </label>
        <input
          id="preferredDate"
          name="preferredDate"
          type="date"
          required
          className="rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-1">
        <label
          htmlFor="preferredTime"
          className="text-sm font-medium text-stone-700"
        >
          Preferred time
        </label>
        <input
          id="preferredTime"
          name="preferredTime"
          type="time"
          required
          className="rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-stone-700"
        >
          Anything I should know? <span className="text-stone-400">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={1000}
          placeholder="Injuries, goals, experience level..."
          className="rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
        />
      </div>

      {status === 'error' && (
        <p className="sm:col-span-2 text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'pending'}
        className="sm:col-span-2 mt-2 rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-stone-50 transition hover:bg-emerald-900 disabled:opacity-60"
      >
        {status === 'pending' ? 'Sending request...' : 'Request a session'}
      </button>
    </form>
  )
}
