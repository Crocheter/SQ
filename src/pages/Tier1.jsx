import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import PracticeModal from '../components/PracticeModal'
import LevelCard from '../components/LevelCard'

const LEVELS = [1, 2, 3, 4]
const PROGRESS_KEY = 'sq_tier1_progress'

export default function Tier1() {
  const location = useLocation()
  // Level.jsx passes { skipPractice: true } via navigate() state when
  // returning here from "← Menu" or "Continue" — in that case the modal
  // shouldn't auto-open. Any other way of landing on /tier1 (e.g. the
  // "Let's go!" button on Home) shows it as normal.
  const [showModal, setShowModal] = useState(() => !location.state?.skipPractice)
  const [progress, setProgress] = useState(() => Number(localStorage.getItem(PROGRESS_KEY) || 0))

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, String(progress))
  }, [progress])

  // Level pages write their own completion back via localStorage; re-sync
  // when returning to this page (e.g. after completing a level).
  useEffect(() => {
    const onFocus = () => setProgress(Number(localStorage.getItem(PROGRESS_KEY) || 0))
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [])

  const tier2Unlocked = progress >= LEVELS.length

  return (
    <main className="relative min-h-screen bg-ink">
      <Header />

      {showModal && <PracticeModal onClose={() => setShowModal(false)} />}

      <div className="mx-auto max-w-3xl px-6 pb-20 pt-28 sm:px-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-display text-sm uppercase tracking-[0.2em] text-violet-400">
              Tier 1
            </span>
            <h1 className="mt-1 font-display text-3xl font-semibold text-paper sm:text-4xl">Alpha</h1>
            <p className="mt-3 max-w-md font-body text-paper/70">
              Clear each level to unlock the next. Finish all four to move on to Tier 2.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="shrink-0 rounded-full border border-violet-400/60 px-4 py-2 font-body text-sm font-medium text-paper transition hover:border-violet-400 hover:bg-violet-600/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            Practice
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {LEVELS.map((level) => (
            <LevelCard
              key={level}
              level={level}
              unlocked={level <= progress + 1}
              completed={progress >= level}
            />
          ))}
        </div>

        <div className="mt-10">
          {tier2Unlocked ? (
            <Link
              to="/soon/tier-2"
              className="inline-block rounded-full bg-violet-600 px-6 py-3 font-display text-sm font-semibold text-paper transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              Move to Tier 2
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-surface-2 px-6 py-3 font-display text-sm font-semibold text-paper/40"
            >
              Move to Tier 2 — complete all 4 levels first
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
