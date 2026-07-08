import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Alex Rivera <span className="text-emerald-700">Coaching</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-stone-600 sm:flex">
          <a href="#journey" className="hover:text-stone-900">
            My Journey
          </a>
          <a href="#services" className="hover:text-stone-900">
            Services
          </a>
          <a href="#booking" className="hover:text-stone-900">
            Book a Session
          </a>
        </nav>
        <a
          href="#booking"
          className="rounded-full bg-emerald-800 px-5 py-2 text-sm font-semibold text-stone-50 transition hover:bg-emerald-900"
        >
          Book Now
        </a>
      </div>
    </header>
  )
}
