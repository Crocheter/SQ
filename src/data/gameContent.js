// Shared game content for the Tier 1 levels, ported from the original
// standalone Sign Quest game.
export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
export const NUMBER_LABELS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
export const WORDS = [
  'CAT', 'DOG', 'SUN', 'BOOK', 'LOVE', 'TREE', 'FISH', 'STAR',
  'MOON', 'JUMP', 'PLAY', 'BIRD', 'LAMP', 'GIFT', 'HAND', 'KIND',
]

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pick(arr, n) {
  return shuffle(arr).slice(0, n)
}

export function letterImage(letter) {
  return `/signs/alphabet/${letter.toLowerCase()}.svg`
}

export function numberImage(n) {
  return `/signs/numbers/${n}.svg`
}
