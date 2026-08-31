// Real animated hero: a looping WebP of the character mid-sign, with its
// original white background removed. Swap `src` here if you re-export a
// new clip (e.g. from a different sign or a longer sequence).
export default function SigningHero({ className = '' }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img
        src="/hero-sign.webp"
        alt="Animated character demonstrating a sign"
        className="h-56 w-auto sm:h-72"
        width={216}
        height={401}
      />
    </div>
  )
}
