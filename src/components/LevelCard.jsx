import { Link } from 'react-router-dom'

export default function LevelCard({ level, unlocked, completed }) {
  if (!unlocked) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-surface/60 px-6 py-8 text-center opacity-50"
        aria-disabled="true"
      >
        <span className="text-2xl">🔒</span>
        <p className="font-display text-sm font-semibold text-paper">Level {level}</p>
        <p className="font-body text-xs text-paper/60">Complete the level before this to unlock</p>
      </div>
    )
  }

  return (
    <Link
      to={`/tier1/level/${level}`}
      className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-violet-400/40 bg-surface px-6 py-8 text-center transition hover:border-violet-400 hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      <span className="text-2xl">{completed ? '✅' : '▶️'}</span>
      <p className="font-display text-sm font-semibold text-paper">Level {level}</p>
      <p className="font-body text-xs text-paper/60">{completed ? 'Completed — replay' : 'Play'}</p>
    </Link>
  )
}
