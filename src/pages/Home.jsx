import { Link } from "react-router-dom";
import Header from "../components/Header";
import SigningHero from "../components/SigningHero";
import WordCycle from "../components/WordCycle";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink">
      <Header />

      {/* Ambient glow — the one place the accent color is allowed to bloom */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pb-16 pt-28 sm:px-10">
        <SigningHero className="mb-6" />

        <h1 className="text-center font-display text-4xl font-semibold leading-[1.1] text-paper sm:text-6xl">
          Learn Nigerian Sign
          <br className="hidden sm:block" /> Language the <WordCycle /> way
        </h1>

        <p className="mt-5 max-w-md text-center font-body text-base text-paper/70 sm:text-lg">
          Various sign challenges in chunks and a leaderboard that keeps you
          coming back.
        </p>

        <Link
          to="/soon/lets-go"
          className="mt-9 rounded-full bg-violet-600 px-8 py-4 font-display text-base font-semibold text-paper shadow-lg shadow-violet-600/30 transition hover:-translate-y-0.5 hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Let's go!
        </Link>
      </div>
    </main>
  );
}
