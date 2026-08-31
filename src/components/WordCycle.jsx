import { useEffect, useState } from 'react'

const WORDS = ['game', 'simplest', 'fastest', 'easiest', 'fun', 'possible']
const TYPE_SPEED = 90
const DELETE_SPEED = 45
const HOLD_MS = 900
const GAP_MS = 200

// Types out each word in WORDS, holds briefly, deletes it, then moves to the
// next word — looping back to the start once it reaches the end. No fixed
// width needed: the text grows/shrinks itself, so "way" just follows along.
export default function WordCycle() {
  const [display, setDisplay] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState('typing') // 'typing' | 'holding' | 'deleting'

  useEffect(() => {
    const currentWord = WORDS[wordIndex]
    let timeout

    if (phase === 'typing') {
      if (display.length < currentWord.length) {
        timeout = setTimeout(() => setDisplay(currentWord.slice(0, display.length + 1)), TYPE_SPEED)
      } else {
        timeout = setTimeout(() => setPhase('deleting'), HOLD_MS)
      }
    } else if (phase === 'deleting') {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), DELETE_SPEED)
      } else {
        timeout = setTimeout(() => {
          setWordIndex((i) => (i + 1) % WORDS.length)
          setPhase('typing')
        }, GAP_MS)
      }
    }

    return () => clearTimeout(timeout)
  }, [display, phase, wordIndex])

  return (
    <span className="relative inline-block text-pop" aria-live="polite">
      {display}
      <span className="typewriter-caret ml-0.5 inline-block w-[2px] translate-y-[0.05em] bg-pop align-middle" style={{ height: '0.85em' }} />
    </span>
  )
}
