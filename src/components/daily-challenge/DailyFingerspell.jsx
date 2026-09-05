import { useEffect, useState } from 'react'
import { DAILY_WORDS } from '../../data/dailyWords'
import { shuffle, letterImage } from '../../data/gameContent'
import SignTile from '../tier1-levels/SignTile'
import LevelResults from '../tier1-levels/LevelResults'

const TOTAL_ROUNDS = 10
const LETTER_INTERVAL_MS = 700
const MAX_REPLAYS = 3

// Day's Challenge fingerspelling: letters are shown one after another
// (not all at once like the Tier 1 version), the player types the whole
// word into a single input, and "Go again" can replay the sequence up to
// 3 times per round before it locks out.
export default function DailyFingerspell({ onFinish }) {
  const [words] = useState(() => shuffle(DAILY_WORDS).slice(0, TOTAL_ROUNDS))
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState('playing') // 'playing' | 'input' | 'checked'
  const [letterIndex, setLetterIndex] = useState(0)
  const [replayCount, setReplayCount] = useState(0)
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)

  const word = words[round]

  // Steps through the word's letters one at a time while phase === 'playing'
  useEffect(() => {
    if (phase !== 'playing') return
    if (letterIndex >= word.length) {
      setPhase('input')
      return
    }
    const t = setTimeout(() => setLetterIndex((i) => i + 1), LETTER_INTERVAL_MS)
    return () => clearTimeout(t)
  }, [phase, letterIndex, word])

  function goAgain() {
    if (replayCount >= MAX_REPLAYS) return
    setReplayCount((c) => c + 1)
    setLetterIndex(0)
    setPhase('playing')
  }

  function submit() {
    if (!typed.trim()) return
    if (typed.trim().toUpperCase() === word) setScore((s) => s + 1)
    setPhase('checked')
  }

  function nextRound() {
    if (round + 1 >= TOTAL_ROUNDS) {
      setDone(true)
      return
    }
    setRound((r) => r + 1)
    setLetterIndex(0)
    setReplayCount(0)
    setTyped('')
    setPhase('playing')
  }

  function replayAll() {
    setRound(0)
    setScore(0)
    setLetterIndex(0)
    setReplayCount(0)
    setTyped('')
    setPhase('playing')
    setDone(false)
  }

  if (done) {
    return (
      <LevelResults
        label="Day's Challenge · Fingerspelling"
        correct={score}
        total={TOTAL_ROUNDS}
        onReplay={replayAll}
        onContinue={onFinish}
        continueLabel="Back to Home"
      />
    )
  }

  const isChecked = phase === 'checked'
  const isCorrect = isChecked && typed.trim().toUpperCase() === word
  const replaysLeft = MAX_REPLAYS - replayCount

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex w-full items-center justify-between font-body text-xs text-paper/60">
        <span>
          Word {round + 1} / {TOTAL_ROUNDS}
        </span>
        <span>Score {score}</span>
      </div>

      <p className="mb-4 font-body text-sm text-paper/70">
        {phase === 'playing' ? 'Watch the signs...' : 'Type the word you saw:'}
      </p>

      {phase === 'playing' && (
        <div className="flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
          {letterIndex < word.length && (
            <SignTile src={letterImage(word[letterIndex])} label={word[letterIndex]} size="lg" />
          )}
        </div>
      )}

      {phase !== 'playing' && (
        <>
          <input
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            disabled={isChecked}
            autoFocus
            placeholder="Type the word"
            className="mt-2 w-64 rounded-full border border-white/20 bg-surface px-5 py-3 text-center font-display text-lg uppercase tracking-widest text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none disabled:opacity-60"
          />

          {isChecked && (
            <p className={`mt-3 font-body text-sm ${isCorrect ? 'text-pop' : 'text-red-400'}`}>
              {isCorrect ? 'Correct!' : `Not quite. The word was ${word}.`}
            </p>
          )}
        </>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {phase === 'input' && (
          <button
            type="button"
            onClick={goAgain}
            disabled={replayCount >= MAX_REPLAYS}
            className="rounded-full border border-violet-400/60 px-5 py-2.5 font-body text-sm font-medium text-paper transition hover:border-violet-400 hover:bg-violet-600/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Go again {replayCount > 0 && `(${replaysLeft} left)`}
          </button>
        )}

        {phase === 'input' && (
          <button
            type="button"
            onClick={submit}
            disabled={!typed.trim()}
            className="rounded-full bg-violet-600 px-6 py-2.5 font-body text-sm font-semibold text-paper transition hover:bg-violet-500 disabled:opacity-40"
          >
            Submit
          </button>
        )}

        {isChecked && (
          <button
            type="button"
            onClick={nextRound}
            className="rounded-full bg-violet-600 px-6 py-2.5 font-body text-sm font-semibold text-paper transition hover:bg-violet-500"
          >
            {round + 1 >= TOTAL_ROUNDS ? 'See results →' : 'Next word →'}
          </button>
        )}
      </div>
    </div>
  )
}
