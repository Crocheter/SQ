import { Link } from 'react-router-dom'

export default function InstallInstructions() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <span className="mb-4 font-display text-sm uppercase tracking-[0.2em] text-violet-400">
        Sign Quest
      </span>
      <h1 className="max-w-md font-display text-3xl font-semibold text-paper sm:text-4xl">
        Add Sign Quest to your home screen
      </h1>

      <div className="mt-8 flex max-w-sm flex-col gap-6 text-left">
        <div>
          <p className="font-display text-sm font-semibold text-violet-400">On iPhone / iPad (Safari)</p>
          <p className="mt-1 font-body text-sm text-paper/70">
            Tap the Share icon, then scroll down and tap "Add to Home Screen".
          </p>
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-violet-400">On Android (Chrome)</p>
          <p className="mt-1 font-body text-sm text-paper/70">
            Tap the ⋮ menu in the top right, then tap "Install app" or "Add to Home screen".
          </p>
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-violet-400">On desktop (Chrome / Edge)</p>
          <p className="mt-1 font-body text-sm text-paper/70">
            Look for an install icon in the address bar, or open the browser menu and choose "Install Sign Quest".
          </p>
        </div>
      </div>

      <Link
        to="/"
        className="mt-10 rounded-full bg-violet-600 px-6 py-3 font-body font-medium text-paper transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        Back to home
      </Link>
    </main>
  )
}
