import { useMemo, useRef, useState, useEffect } from "react";
import { ALPHABET, NUMBERS } from "../data/signs";

// Shows a sign image, falling back to a styled placeholder (the letter/
// number on a tinted tile) if the real asset isn't in public/signs/ yet.
function SignImage({ src, label }) {
  const [errored, setErrored] = useState(false);
  useEffect(() => setErrored(false), [src]);

  if (errored) {
    return (
      <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-2xl bg-surface-2 font-display text-5xl font-semibold text-violet-400 sm:h-48 sm:w-48">
        {label}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={`Sign for ${label}`}
      className="mx-auto h-40 w-40 object-contain sm:h-48 sm:w-48"
      onError={() => setErrored(true)}
    />
  );
}

// Builds the full slide sequence: intro -> A..Z -> alphaEnd -> 1..10 -> numbersEnd
function useSlides() {
  return useMemo(() => {
    const slides = [{ type: "intro" }];
    ALPHABET.forEach((letter) => slides.push({ type: "letter", ...letter }));
    slides.push({ type: "alphaEnd" });
    NUMBERS.forEach((num) => slides.push({ type: "number", ...num }));
    slides.push({ type: "numbersEnd" });
    return slides;
  }, []);
}

export default function PracticeModal({ onClose }) {
  const slides = useSlides();
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);

  const firstLetterIndex = 1;
  const firstNumberIndex = slides.findIndex((s) => s.type === "number");

  const current = slides[index];
  const isBranch = current.type === "alphaEnd" || current.type === "numbersEnd";
  const showSkip = current.type === "intro" || current.type === "alphaEnd";

  const goNext = () => setIndex((i) => Math.min(i + 1, slides.length - 1));
  const goPrev = () => setIndex((i) => Math.max(i - 1, 0));

  const handleTouchStart = (e) => {
    if (isBranch) return;
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (isBranch || touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) goNext();
    else if (delta > 50) goPrev();
    touchStartX.current = null;
  };

  let progressLabel = null;
  if (current.type === "letter") {
    progressLabel = `Letter ${index} of 26`;
  } else if (current.type === "number") {
    progressLabel = `Number ${index - firstNumberIndex + 1} of 10`;
  }

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 shadow-2xl sm:max-w-md sm:p-8">
        {showSkip && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 p-5 top-4 font-body text-sm text-paper/60 transition hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            Skip
          </button>
        )}

        <div
          className="flex min-h-70 flex-col items-center justify-center text-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {current.type === "intro" && (
            <>
              <span className="mb-2 font-display text-sm uppercase tracking-[0.2em] text-violet-400">
                Tier 1 · Alpha
              </span>
              <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
                Practice Alphabet Signs
              </h2>
              <p className="mt-3 max-w-xs font-body text-sm text-paper/70">
                Learn the A–Z hand signs first, then move on to numbers, before
                you start the game.
              </p>
              <button
                type="button"
                onClick={goNext}
                className="mt-7 rounded-full bg-violet-600 px-6 py-3 font-display text-sm font-semibold text-paper transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                Start
              </button>
            </>
          )}

          {(current.type === "letter" || current.type === "number") && (
            <>
              <SignImage src={current.image} label={current.label} />
              <p className="mt-4 font-display text-4xl font-semibold text-paper">
                {current.label}
              </p>
              {progressLabel && (
                <p className="mt-1 font-body text-xs text-paper/50">
                  {progressLabel}
                </p>
              )}
            </>
          )}

          {current.type === "alphaEnd" && (
            <>
              <h2 className="font-display text-2xl font-semibold text-paper">
                Nice work! That's the whole alphabet.
              </h2>
              <p className="mt-2 font-body text-sm text-paper/70">
                Go again, or move on to numbers.
              </p>
              <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={() => setIndex(firstLetterIndex)}
                  className="rounded-full border border-violet-400/60 px-5 py-3 font-body text-sm font-medium text-paper transition hover:border-violet-400 hover:bg-violet-600/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  Practice from A again
                </button>
                <button
                  type="button"
                  onClick={() => setIndex(firstNumberIndex)}
                  className="rounded-full bg-violet-600 px-5 py-3 font-body text-sm font-semibold text-paper transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  Go to Numbers
                </button>
              </div>
            </>
          )}

          {current.type === "numbersEnd" && (
            <>
              <h2 className="font-display text-2xl font-semibold text-paper">
                Great! You've done 1–10 too.
              </h2>
              <p className="mt-2 font-body text-sm text-paper/70">
                Go again, or head into Tier 1.
              </p>
              <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={() => setIndex(firstNumberIndex)}
                  className="rounded-full border border-violet-400/60 px-5 py-3 font-body text-sm font-medium text-paper transition hover:border-violet-400 hover:bg-violet-600/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  Repeat practice from 1
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-violet-600 px-5 py-3 font-body text-sm font-semibold text-paper transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  End Practice
                </button>
              </div>
            </>
          )}
        </div>

        {!isBranch && current.type !== "intro" && (
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              aria-label="Previous sign"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-paper transition hover:border-violet-400/60 disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next sign"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-paper transition hover:border-violet-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
