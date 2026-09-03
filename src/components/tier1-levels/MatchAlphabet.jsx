import { useState } from 'react'
import { LETTERS, shuffle, letterImage } from '../../data/gameContent'
import SignTile from './SignTile'
import LevelResults from './LevelResults'

const SET_SIZE = 5
const TOTAL_ROUNDS = 5

export default function MatchAlphabet({ onComplete, onExit }) {
  const [order, setOrder] = useState(() => shuffle(LETTERS))
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [locked, setLocked] = useState([]) // correctly matched letters (both columns)
  const [wrongLeft, setWrongLeft] = useState([]) // permanently-disabled letter-column keys
  const [wrongRight, setWrongRight] = useState([]) // permanently-disabled sign-column keys
  const [shakeKeys, setShakeKeys] = useState([]) // transient, animation only — 'L:X' / 'R:X'
  const [selLetter, setSelLetter] = useState(null)
  const [selSign, setSelSign] = useState(null)
  const [signOrder, setSignOrder] = useState(() => shuffle(order.slice(0, SET_SIZE)))
  const [done, setDone] = useState(false)

  const currentSet = order.slice(round * SET_SIZE, round * SET_SIZE + SET_SIZE)
  const resolvedCount = locked.length + wrongLeft.length
  const roundComplete = resolvedCount >= SET_SIZE

  function trySelect(kind, letter) {
    const alreadyResolved =
      locked.includes(letter) || (kind === 'letter' ? wrongLeft.includes(letter) : wrongRight.includes(letter))
    if (alreadyResolved) return

    const nextLetter = kind === 'letter' ? letter : selLetter
    const nextSign = kind === 'sign' ? letter : selSign
    if (kind === 'letter') setSelLetter(letter)
    else setSelSign(letter)

    if (nextLetter && nextSign) {
      if (nextLetter === nextSign) {
        setLocked((l) => [...l, nextLetter])
        setScore((s) => s + 1)
        setSelLetter(null)
        setSelSign(null)
      } else {
        // Permanent: these two specific tiles turn red and stay disabled.
        setWrongLeft((w) => [...w, nextLetter])
        setWrongRight((w) => [...w, nextSign])
        setSelLetter(null)
        setSelSign(null)
        setShakeKeys([`L:${nextLetter}`, `R:${nextSign}`])
        setTimeout(() => setShakeKeys([]), 400)
      }
    }
  }

  function nextRound() {
    const nextR = round + 1
    if (nextR >= TOTAL_ROUNDS) {
      setDone(true)
      return
    }
    setRound(nextR)
    setLocked([])
    setWrongLeft([])
    setWrongRight([])
    setSelLetter(null)
    setSelSign(null)
    setSignOrder(shuffle(order.slice(nextR * SET_SIZE, nextR * SET_SIZE + SET_SIZE)))
  }

  function replay() {
    const newOrder = shuffle(LETTERS)
    setOrder(newOrder)
    setRound(0)
    setScore(0)
    setLocked([])
    setWrongLeft([])
    setWrongRight([])
    setSelLetter(null)
    setSelSign(null)
    setSignOrder(shuffle(newOrder.slice(0, SET_SIZE)))
    setDone(false)
  }

  if (done) {
    return (
      <LevelResults
        label="Level 2 · Match the Alphabet"
        correct={score}
        total={order.length}
        onReplay={replay}
        onContinue={() => onComplete(score, order.length)}
        continueLabel="Continue"
      />
    )
  }

  function itemClass(kind, letter) {
    const isLocked = locked.includes(letter)
    const isWrong = kind === 'letter' ? wrongLeft.includes(letter) : wrongRight.includes(letter)
    const isSelected = kind === 'letter' ? selLetter === letter : selSign === letter
    const isShaking = shakeKeys.includes(`${kind === 'letter' ? 'L' : 'R'}:${letter}`)
    const isDisabled = isLocked || isWrong

    let style = 'border-white/10 bg-surface hover:border-violet-400/60 cursor-pointer'
    if (isLocked) style = 'border-pop/40 bg-pop/10 opacity-40 cursor-default'
    else if (isWrong) style = `border-red-400 bg-red-400/10 opacity-50 cursor-not-allowed ${isShaking ? 'animate-pulse' : ''}`
    else if (isSelected) style = 'border-violet-400 bg-violet-600/20 cursor-pointer'

    return { style, isDisabled }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex w-full items-center justify-between font-body text-xs text-paper/60">
        <span>
          Round {round + 1} / {TOTAL_ROUNDS}
        </span>
        <span>Score {score}</span>
      </div>

      <p className="mb-4 font-body text-sm text-paper/70">Match each letter to its sign.</p>

      <div className="grid w-full grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          {currentSet.map((letter) => {
            const { style, isDisabled } = itemClass('letter', letter)
            return (
              <div
                key={letter}
                onClick={() => !isDisabled && trySelect('letter', letter)}
                className={`flex h-16 items-center justify-center rounded-xl border p-2 transition select-none ${style}`}
              >
                <span className="font-display text-xl font-semibold text-paper">{letter}</span>
              </div>
            )
          })}
        </div>
        <div className="flex flex-col gap-2">
          {signOrder.map((letter) => {
            const { style, isDisabled } = itemClass('sign', letter)
            return (
              <div
                key={letter}
                onClick={() => !isDisabled && trySelect('sign', letter)}
                className={`flex h-16 items-center justify-center rounded-xl border p-2 transition select-none ${style}`}
              >
                <SignTile src={letterImage(letter)} label={letter} size="sm" className="h-12 w-12" />
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onExit}
          className="rounded-full border border-white/10 px-5 py-2.5 font-body text-sm text-paper/70 transition hover:border-violet-400/60 hover:text-paper"
        >
          ← Menu
        </button>
        {roundComplete && (
          <button
            type="button"
            onClick={nextRound}
            className="rounded-full bg-violet-600 px-6 py-2.5 font-body text-sm font-semibold text-paper transition hover:bg-violet-500"
          >
            {round + 1 >= TOTAL_ROUNDS ? 'See results →' : 'Next round →'}
          </button>
        )}
      </div>
    </div>
  )
}
