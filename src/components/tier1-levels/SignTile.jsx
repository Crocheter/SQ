// Renders a real ASL reference image for a letter or number. These are
// actual SVG assets (public/signs/...), not decorative — accuracy matters
// here, so there's no placeholder fallback: if an image is missing it's a
// real bug to fix, not something to paper over.
export default function SignTile({ src, label, size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-40 w-40 sm:h-48 sm:w-48',
  }
  return (
    <img
      src={src}
      alt={`Sign for ${label}`}
      className={`${sizes[size]} object-contain ${className}`}
      draggable={false}
    />
  )
}
