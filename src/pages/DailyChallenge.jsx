import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import DailyFingerspell from '../components/daily-challenge/DailyFingerspell'

export default function DailyChallenge() {
  const navigate = useNavigate()

  return (
    <main className="relative min-h-screen bg-ink">
      <Header />
      <div className="mx-auto max-w-2xl px-6 pb-20 pt-28 sm:px-10">
        <span className="font-display text-sm uppercase tracking-[0.2em] text-violet-400">
          Day's Challenge
        </span>
        <h1 className="mt-1 mb-8 font-display text-3xl font-semibold text-paper sm:text-4xl">
          Fingerspelling
        </h1>

        <DailyFingerspell onFinish={() => navigate('/')} />
      </div>
    </main>
  )
}
