import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import SpotTheSign from '../components/tier1-levels/SpotTheSign'
import MatchAlphabet from '../components/tier1-levels/MatchAlphabet'
import Fingerspelling from '../components/tier1-levels/Fingerspelling'
import NumberSigns from '../components/tier1-levels/NumberSigns'

const PROGRESS_KEY = 'sq_tier1_progress'

const LEVEL_COMPONENTS = {
  1: SpotTheSign,
  2: MatchAlphabet,
  3: Fingerspelling,
  4: NumberSigns,
}

const LEVEL_TITLES = {
  1: 'Spot the Sign',
  2: 'Match the Alphabet',
  3: 'Fingerspelling',
  4: 'Number Signs',
}

export default function Level() {
  const { levelId } = useParams()
  const navigate = useNavigate()
  const level = Number(levelId)
  const LevelComponent = LEVEL_COMPONENTS[level]

  function handleComplete() {
    const current = Number(localStorage.getItem(PROGRESS_KEY) || 0)
    localStorage.setItem(PROGRESS_KEY, String(Math.max(current, level)))
    navigate('/tier1', { state: { skipPractice: true } })
  }

  function handleExit() {
    navigate('/tier1', { state: { skipPractice: true } })
  }

  return (
    <main className="relative min-h-screen bg-ink">
      <Header />
      <div className="mx-auto max-w-2xl px-6 pb-20 pt-28 sm:px-10">
        <span className="font-display text-sm uppercase tracking-[0.2em] text-violet-400">
          Tier 1 · Level {level}
        </span>
        <h1 className="mt-1 mb-8 font-display text-3xl font-semibold text-paper sm:text-4xl">
          {LEVEL_TITLES[level] ?? 'Level'}
        </h1>

        {LevelComponent ? (
          <LevelComponent onComplete={handleComplete} onExit={handleExit} />
        ) : (
          <p className="font-body text-paper/70">Unknown level.</p>
        )}
      </div>
    </main>
  )
}
