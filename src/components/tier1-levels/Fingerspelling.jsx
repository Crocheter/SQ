import { useState } from 'react'
import { LETTERS, WORDS, pick, letterImage } from '../../data/gameContent'
import SignTile from './SignTile'
import LevelResults from './LevelResults'

const TOTAL = 8

export default function Fingerspelling({ onComplete, onExit }) {
  const [words] = useState(() => pick(WORDS, TOTAL))
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState(() => new Array(words[0].length).fill(''))
  const [checked, setChecked] = useState(false)
  const [done, setDone] = useState(false)

  const word = words[i]
  const isFull = answer.every((c) => c !== '')
  const isCorrect = checked && answer.join('') === word

  function typeLetter(letter) {
    if (checked) return
    const idx = answer.findIndex((c) => c === '')
    if (idx === -1) return
    const next = [...answer]
    next[idx] = letter
    setAnswer(next)
  }

  function backspace() {
    if (checked) return
    for (let idx = answer.length - 1; idx >= 0; idx--) {
      if (answer[idx] !== '') {
        const next = [...answer]
        next[idx] = ''
        setAnswer(next)
        break
      }
    }
  }

  function check() {
    setChecked(true)
    if (answer.join('') === word) setScore((s) => s + 1)
  }

  function next() {
    if (i + 1 >= TOTAL) {
      setDone(true)
      return
    }
    const nextI = i + 1
    setI(nextI)
    setAnswer(new Array(words[nextI].length).fill(''))
    setChecked(false)
  }

  function replay() {
    setI(0)
    setScore(0)
    setAnswer(new Array(words[0].length).fill(''))
    setChecked(false)
    setDone(false)
  }

  if (done) {
    return (
      <LevelResults
        label="Level 3 · Fingerspelling"
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
          Word {i + 1} / {TOTAL}
        </span>
        <span>Score {score}</span>
      </div>

      <p className="mb-3 font-body text-sm text-paper/70">Spell what you see:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {word.split('').map((letter, idx) => (
          <SignTile key={idx} src={letterImage(letter)} label={letter} size="sm" />
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        {answer.map((c, idx) => (
          <div
            key={idx}
            className={`flex h-11 w-9 items-center justify-center rounded-lg border font-display text-lg font-semibold ${
              checked
                ? c === word[idx]
                  ? 'border-pop bg-pop/10 text-pop'
                  : 'border-red-400 bg-red-400/10 text-red-400'
                : 'border-white/20 bg-surface text-paper'
            }`}
          >
            {c}
          </div>
        ))}
      </div>

      {checked && (
        <p className={`mt-3 font-body text-sm ${isCorrect ? 'text-pop' : 'text-red-400'}`}>
          {isCorrect ? 'Correct — well spelt!' : `Not quite. The word was ${word}.`}
        </p>
      )}

      <div className="mt-5 grid grid-cols-7 gap-1.5 sm:grid-cols-9">
        {LETTERS.map((letter) => (
          <button
            key={letter}
            type="button"
            disabled={checked}
            onClick={() => typeLetter(letter)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-surface font-body text-sm text-paper transition hover:border-violet-400/60 disabled:opacity-40"
          >
            {letter}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={backspace}
        disabled={checked}
        className="mt-2 font-body text-xs text-paper/50 underline decoration-dotted hover:text-paper disabled:opacity-40"
      >
        Backspace
      </button>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onExit}
          className="rounded-full border border-white/10 px-5 py-2.5 font-body text-sm text-paper/70 transition hover:border-violet-400/60 hover:text-paper"
        >
          ← Menu
        </button>
        {!checked ? (
          <button
            type="button"
            onClick={check}
            disabled={!isFull}
            className="rounded-full bg-violet-600 px-6 py-2.5 font-body text-sm font-semibold text-paper transition hover:bg-violet-500 disabled:opacity-40"
          >
            Check
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="rounded-full bg-violet-600 px-6 py-2.5 font-body text-sm font-semibold text-paper transition hover:bg-violet-500"
          >
            {i + 1 >= TOTAL ? 'See results →' : 'Next word →'}
          </button>
        )}
      </div>
    </div>
  )
}
