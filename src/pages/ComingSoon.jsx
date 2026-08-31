import { Link, useParams } from 'react-router-dom'

const LABELS = {
  'lets-go': "the game",
  'add-to-home-screen': 'adding Sign Quest to your home screen',
  'daily-challenge': "the Day's Challenge",
  'contribute-signs': 'contributing signs',
  feedback: 'feedback',
  'contact-us': 'contact us',
  'sign-in': 'signing in',
}

export default function ComingSoon() {
  const { feature } = useParams()
  const label = LABELS[feature] ?? 'this'

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <span className="mb-4 font-display text-sm uppercase tracking-[0.2em] text-violet-400">
        Sign Quest
      </span>
      <h1 className="max-w-md font-display text-3xl font-semibold text-paper sm:text-4xl">
        {label.charAt(0).toUpperCase() + label.slice(1)} is on its way.
      </h1>
      <p className="mt-4 max-w-sm font-body text-paper/70">
        We're still building this part. Check back soon.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-violet-600 px-6 py-3 font-body font-medium text-paper transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        Back to home
      </Link>
    </main>
  )
}
