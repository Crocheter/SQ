// Central list of practice signs, backed by real ASL reference images in
// public/signs/alphabet/ and public/signs/numbers/.

export const ALPHABET = Array.from({ length: 26 }, (_, i) => {
  const letter = String.fromCharCode(65 + i) // A..Z
  return {
    id: letter,
    label: letter,
    image: `/signs/alphabet/${letter.toLowerCase()}.svg`,
  }
})

export const NUMBERS = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1
  return {
    id: String(n),
    label: String(n),
    image: `/signs/numbers/${n}.svg`,
  }
})
