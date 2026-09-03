export default function LevelResults({ label, correct, total, onReplay, onContinue, continueLabel }) {
  const pct = total ? Math.round((correct / total) * 100) : 0
  let message = 'Keep practicing — you will get there!'
  if (pct >= 90) message = 'Outstanding! That is near-perfect recall.'
  else if (pct >= 70) message = 'Great work — solid grasp of these signs.'
  else if (pct >= 50) message = 'Good progress — a bit more practice will help.'

  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
      <span className="font-display text-sm uppercase tracking-[0.2em] text-violet-400">
        {label}
      </span>
      <p className="mt-3 font-display text-4xl font-semibold text-paper">
        {correct} / {total}
      </p>
      <p className="mt-3 max-w-xs font-body text-sm text-paper/70">{message}</p>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onReplay}
          className="rounded-full border border-violet-400/60 px-5 py-3 font-body text-sm font-medium text-paper transition hover:border-violet-400 hover:bg-violet-600/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          Play again
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="rounded-full bg-violet-600 px-5 py-3 font-body text-sm font-semibold text-paper transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          {continueLabel}
        </button>
      </div>
    </div>
  )
}
