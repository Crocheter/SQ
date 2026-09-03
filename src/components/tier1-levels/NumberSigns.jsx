import { useState } from 'react'
import { NUMBER_LABELS, shuffle, numberImage } from '../../data/gameContent'
import SignTile from './SignTile'
import LevelResults from './LevelResults'

export default function NumberSigns({ onComplete, onExit }) {
  const [order, setOrder] = useState(() => shuffle(NUMBER_LABELS))
  const [signOrder, setSignOrder] = useState(() => shuffle(order))
  const [score, setScore] = useState(0)
  const [locked, setLocked] = useState([]) // correctly matched numbers (both columns)
  const [wrongLeft, setWrongLeft] = useState([]) // permanently-disabled number-column keys
  const [wrongRight, setWrongRight] = useState([]) // permanently-disabled sign-column keys
  const [shakeKeys, setShakeKeys] = useState([]) // transient, animation only — 'L:X' / 'R:X'
  const [selNum, setSelNum] = useState(null)
  const [selSign, setSelSign] = useState(null)
  const [done, setDone] = useState(false)

  const resolvedCount = locked.length + wrongLeft.length
  const roundComplete = resolvedCount >= NUMBER_LABELS.length

  function trySelect(kind, num) {
    const alreadyResolved =
      locked.includes(num) || (kind === 'num' ? wrongLeft.includes(num) : wrongRight.includes(num))
    if (alreadyResolved) return

    const nextNum = kind === 'num' ? num : selNum
    const nextSign = kind === 'sign' ? num : selSign
    if (kind === 'num') setSelNum(num)
    else setSelSign(num)

    if (nextNum && nextSign) {
      if (nextNum === nextSign) {
        setLocked((l) => [...l, nextNum])
        setScore((s) => s + 1)
        setSelNum(null)
        setSelSign(null)
      } else {
        // Permanent: these two specific tiles turn red and stay disabled.
        setWrongLeft((w) => [...w, nextNum])
        setWrongRight((w) => [...w, nextSign])
        setSelNum(null)
        setSelSign(null)
        setShakeKeys([`L:${nextNum}`, `R:${nextSign}`])
        setTimeout(() => setShakeKeys([]), 400)
      }
    }
  }

  function replay() {
    const newOrder = shuffle(NUMBER_LABELS)
    setOrder(newOrder)
    setSignOrder(shuffle(newOrder))
    setScore(0)
    setLocked([])
    setWrongLeft([])
    setWrongRight([])
    setSelNum(null)
    setSelSign(null)
    setDone(false)
  }

  if (done) {
    return (
      <LevelResults
        label="Level 4 · Number Signs"
        correct={score}
        total={NUMBER_LABELS.length}
        onReplay={replay}
        onContinue={() => onComplete(score, NUMBER_LABELS.length)}
        continueLabel="Finish Tier 1"
      />
    )
  }

  function itemClass(kind, num) {
    const isLocked = locked.includes(num)
    const isWrong = kind === 'num' ? wrongLeft.includes(num) : wrongRight.includes(num)
    const isSelected = kind === 'num' ? selNum === num : selSign === num
    const isShaking = shakeKeys.includes(`${kind === 'num' ? 'L' : 'R'}:${num}`)
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
        <span>Match all 10</span>
        <span>Score {score}</span>
      </div>

      <p className="mb-4 font-body text-sm text-paper/70">Match each number to its sign.</p>

      <div className="grid w-full grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          {order.map((num) => {
            const { style, isDisabled } = itemClass('num', num)
            return (
              <div
                key={num}
                onClick={() => !isDisabled && trySelect('num', num)}
                className={`flex h-16 items-center justify-center rounded-xl border p-2 transition select-none ${style}`}
              >
                <span className="font-display text-xl font-semibold text-paper">{num}</span>
              </div>
            )
          })}
        </div>
        <div className="flex flex-col gap-2">
          {signOrder.map((num) => {
            const { style, isDisabled } = itemClass('sign', num)
            return (
              <div
                key={num}
                onClick={() => !isDisabled && trySelect('sign', num)}
                className={`flex h-16 items-center justify-center rounded-xl border p-2 transition select-none ${style}`}
              >
                <SignTile src={numberImage(num)} label={num} size="sm" className="h-12 w-12" />
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
            onClick={() => setDone(true)}
            className="rounded-full bg-violet-600 px-6 py-2.5 font-body text-sm font-semibold text-paper transition hover:bg-violet-500"
          >
            See results →
          </button>
        )}
      </div>
    </div>
  )
}
