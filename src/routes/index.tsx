import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/Header'


export const Route = createFileRoute('/')({
  component: Home,
})

const SERVICES = [
  {
    name: 'Pilates',
    description:
      'Mat and equipment-based sessions building core strength, control, and posture — suited to every level.',
  },
  {
    name: 'Bodyweight Training',
    description:
      'Strength and conditioning using your own body as the tool. No gym required, big results.',
  },
  {
    name: 'Mobility',
    description:
      'Targeted work to restore range of motion, ease stiffness, and move without pain or restriction.',
  },
]

function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pt-24">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Personal Coaching
            </p>
            <h1 className="text-4xl font-bold leading-tight text-stone-900 sm:text-5xl">
              Move stronger. Move freer. Move for life.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-600">
              I'm Viole — a Pilates, bodyweight training, and mobility coach
              helping people rebuild strength and confidence in their bodies,
              one session at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#booking"
                className="rounded-full bg-emerald-800 px-7 py-3 text-sm font-semibold text-stone-50 transition hover:bg-emerald-900"
              >
                Book a Session
              </a>
              <a
                href="#journey"
                className="rounded-full border border-stone-300 px-7 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400"
              >
                Read My Story
              </a>
            </div>
          </div>
          <div className="aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-100 via-stone-100 to-amber-100 shadow-inner" />
        </div>
      </section>

      <section id="journey" className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">
            My Journey
          </p>
          <h2 className="text-3xl font-bold text-stone-900">
            From rebuilding my own body to helping others do the same
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-stone-600">
            <p>
              I have been active in sports since I can remember. That route of athletic exploration would eventually lead me to gain a much deeper understanding of the human body and adapt a comprehensive multifaceted training routine with the ultimate goal set on longevity in strength, mobility and movement.
            </p>
            <p>
              Instead of repeating one-sided, destructive training routines for short-term goals, a complete plan with adequate preparation and execution that addresses the entire interconnected dependencies of our body will reach the same goals and beyond – preserving health and simultaneously minimizing the risk of injury and degradation.
            </p>
            <p>
              Whether you're recovering from injury, starting from zero, or
              looking to move better as you age, I'll meet you where you are
              and build a plan around your goals.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">
          Services
        </p>
        <h2 className="text-3xl font-bold text-stone-900">
          Coaching built around how you want to move
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.name}
              className="rounded-2xl border border-stone-200 bg-white p-7"
            >
              <h3 className="text-xl font-semibold text-stone-900">
                {service.name}
              </h3>
              <p className="mt-3 leading-relaxed text-stone-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="booking"
        className="border-t border-stone-200 bg-stone-100/60"
      >
        <div className="mx-auto max-w-3xl px-5 py-20">
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Book a Session
          </p>
          <h2 className="text-center text-3xl font-bold text-stone-900">
            Ready to get started?
          </h2>
          <p className="mt-4 text-center text-lg text-stone-600">
            Send over a few details and I'll follow up to confirm your
            session.
          </p>
          <div className="mt-10">
           
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 py-10 text-center text-sm text-stone-500">
        © {new Date().getFullYear()} Viole Pilates Coaching. All rights
        reserved.
      </footer>
    </div>
  )
}
