import { useMemo, useState } from 'react'
import { LETTERS, pick, shuffle, letterImage } from '../../data/gameContent'
import SignTile from './SignTile'
import LevelResults from './LevelResults'

const TOTAL = 10

export default function SpotTheSign({ onComplete, onExit }) {
  const [round, setRound] = useState(() => makeRound())
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState(null)
  const [done, setDone] = useState(false)

  function makeRound() {
    return { letters: pick(LETTERS, TOTAL) }
  }

  const target = round.letters[i]
  const options = useMemo(() => {
    const distractors = pick(
      LETTERS.filter((l) => l !== target),
      4
    )
    return shuffle([target, ...distractors])
  }, [target])

  function answer(opt) {
    if (picked) return
    setPicked(opt)
    if (opt === target) setScore((s) => s + 1)
  }

  function next() {
    if (i + 1 >= TOTAL) {
      setDone(true)
      return
    }
    setI((v) => v + 1)
    setPicked(null)
  }

  function replay() {
    setRound(makeRound())
    setI(0)
    setScore(0)
    setPicked(null)
    setDone(false)
  }

  if (done) {
    return (
      <LevelResults
        label="Level 1 · Spot the Sign"
        correct={score}
        total={TOTAL}
        onReplay={replay}
        onContinue={() => onComplete(score, TOTAL)}
        continueLabel="Continue"
      />
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex w-full items-center justify-between font-body text-xs text-paper/60">
        <span>
          Question {i + 1} / {TOTAL}
        </span>
        <span>Score {score}</span>
      </div>

      <p className="font-body text-sm text-paper/70">Which sign means...</p>
      <p className="mt-1 font-display text-6xl font-semibold text-paper">{target}</p>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5">
        {options.map((opt) => {
          const isCorrect = picked && opt === target
          const isWrong = picked === opt && opt !== target
          return (
            <button
              key={opt}
              type="button"
              disabled={Boolean(picked)}
              onClick={() => answer(opt)}
              className={`flex h-20 w-20 items-center justify-center rounded-xl border p-2 transition sm:h-24 sm:w-24 ${
                isCorrect
                  ? 'border-pop bg-pop/10'
                  : isWrong
                    ? 'border-red-400 bg-red-400/10'
                    : 'border-white/10 bg-surface hover:border-violet-400/60'
              } disabled:cursor-default`}
            >
              <SignTile src={letterImage(opt)} label={opt} size="sm" />
            </button>
          )
        })}
      </div>

      {picked && (
        <p className={`mt-4 font-body text-sm ${picked === target ? 'text-pop' : 'text-red-400'}`}>
          {picked === target ? 'Correct!' : `Not quite — that was the sign for ${target}.`}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onExit}
          className="rounded-full border border-white/10 px-5 py-2.5 font-body text-sm text-paper/70 transition hover:border-violet-400/60 hover:text-paper"
        >
          ← Menu
        </button>
        {picked && (
          <button
            type="button"
            onClick={next}
            className="rounded-full bg-violet-600 px-6 py-2.5 font-body text-sm font-semibold text-paper transition hover:bg-violet-500"
          >
            {i + 1 >= TOTAL ? 'See results →' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  )
}
