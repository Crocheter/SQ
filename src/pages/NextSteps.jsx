import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'

const PROGRESS_KEY = 'sq_next_steps_progress'

const STEPS = [
  {
    id: 1,
    title: 'Sign up',
    description: 'Create your account so your progress is saved.',
    buttonLabel: 'Sign Up with Google',
  },
  {
    id: 2,
    title: 'Commit',
    description: 'Commit to keep practicing before moving on.',
    buttonLabel: 'Commit',
  },
  {
    id: 3,
    title: 'Schedule',
    description: 'Set a practice schedule that works for you.',
    buttonLabel: 'Schedule',
  },
]

export default function NextSteps() {
  const { user, signInWithGoogle } = useAuth()
  const [progress, setProgress] = useState(() => Number(localStorage.getItem(PROGRESS_KEY) || 0))
  const [authError, setAuthError] = useState(null)
  const [signingIn, setSigningIn] = useState(false)

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, String(progress))
  }, [progress])

  // Step 1 tracks real Firebase auth state, not just a button click — if
  // the person is already signed in (e.g. from a previous visit), it's
  // marked done automatically.
  useEffect(() => {
    if (user) setProgress((p) => Math.max(p, 1))
  }, [user])

  function completeStep(id) {
    setProgress((p) => Math.max(p, id))
  }

  async function handleSignUpStep() {
    setAuthError(null)
    setSigningIn(true)
    try {
      await signInWithGoogle()
      // The useEffect above marks step 1 complete once `user` updates.
    } catch (err) {
      setAuthError(err.message ?? 'Sign-in failed. Please try again.')
    } finally {
      setSigningIn(false)
    }
  }

  const allDone = progress >= STEPS.length

  return (
    <main className="relative min-h-screen bg-ink">
      <Header />
      <div className="mx-auto max-w-xl px-6 pb-20 pt-28 sm:px-10">
        <span className="font-display text-sm uppercase tracking-[0.2em] text-violet-400">
          Before Tier 2
        </span>
        <h1 className="mt-1 font-display text-3xl font-semibold text-paper sm:text-4xl">
          Next Steps
        </h1>
        <p className="mt-3 max-w-md font-body text-paper/70">
          Complete these three steps in order to unlock Tier 2.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {STEPS.map((step) => {
            const isDone = progress >= step.id
            const isUnlocked = step.id <= progress + 1
            const isSignUpStep = step.id === 1

            return (
              <div
                key={step.id}
                className={`flex items-center gap-4 rounded-2xl border px-5 py-5 transition ${
                  isDone
                    ? 'border-pop/40 bg-pop/10'
                    : isUnlocked
                      ? 'border-violet-400/40 bg-surface'
                      : 'border-white/10 bg-surface/60 opacity-50'
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${
                    isDone ? 'bg-pop text-ink' : 'bg-surface-2 text-paper'
                  }`}
                >
                  {isDone ? '✓' : step.id}
                </div>

                <div className="flex-1">
                  <p className="font-display text-base font-semibold text-paper">{step.title}</p>
                  <p className="mt-0.5 font-body text-sm text-paper/60">{step.description}</p>
                </div>

                <button
                  type="button"
                  disabled={!isUnlocked || isDone || (isSignUpStep && signingIn)}
                  onClick={() => (isSignUpStep ? handleSignUpStep() : completeStep(step.id))}
                  className="shrink-0 rounded-full bg-violet-600 px-4 py-2.5 font-body text-sm font-semibold text-paper transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-paper/40"
                >
                  {isDone ? 'Done' : isSignUpStep && signingIn ? 'Signing up...' : step.buttonLabel}
                </button>
              </div>
            )
          })}
        </div>

        {authError && <p className="mt-4 font-body text-sm text-red-400">{authError}</p>}

        <div className="mt-10">
          {allDone ? (
            <Link
              to="/soon/tier-2"
              className="inline-block rounded-full bg-violet-600 px-6 py-3 font-display text-sm font-semibold text-paper transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              Continue to Tier 2
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-surface-2 px-6 py-3 font-display text-sm font-semibold text-paper/40"
            >
              Complete all 3 steps first
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
