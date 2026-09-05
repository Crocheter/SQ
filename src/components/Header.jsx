import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInstallPrompt from "../hooks/useInstallPrompt";
import { useAuth } from "../context/AuthContext";

// Items shown in the mobile hamburger drawer, after the install action.
// "Day's Challenge" points at the real page; everything else is still a
// placeholder until those pages exist.
const DRAWER_ITEMS = [
  { label: "Play the Day's Challenge", to: "/daily-challenge" },
  { label: "Contribute Signs", to: "/soon/contribute-signs" },
  { label: "Leave Feedback", to: "/feedback" },
  { label: "Contact Us", to: "/contact-us" },
];

// Items shown inline in the desktop nav bar. "Add to home screen" is a
// mobile-only concept, so it's dropped here in favor of a Sign In link.
const DESKTOP_ITEMS = [
  { label: "Day's Challenge", to: "/daily-challenge" },
  { label: "Contribute Signs", to: "/soon/contribute-signs" },
  { label: "Feedback", to: "/feedback" },
  { label: "Contact Us", to: "/contact-us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { canInstall, installed, promptInstall } = useInstallPrompt();
  const { user, signOut } = useAuth();

  const handleAddToHomeScreen = async () => {
    if (canInstall) {
      await promptInstall();
    } else {
      navigate("/install");
    }
    setOpen(false);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 sm:px-10 sm:py-6">
      <Link
        to="/"
        className="font-display text-lg font-semibold tracking-tight text-paper"
      >
        Sign Quest
      </Link>

      {/* Desktop nav — plain inline links, no hamburger */}
      <nav className="hidden items-center gap-8 sm:flex" aria-label="Primary">
        {DESKTOP_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="font-body text-sm text-paper/80 transition hover:text-violet-400"
          >
            {item.label}
          </Link>
        ))}
        {user ? (
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt=""
                className="h-8 w-8 rounded-full border border-white/20"
              />
            )}
            <span className="font-body text-sm text-paper/80">
              {user.displayName?.split(" ")[0]}
            </span>
            <button
              type="button"
              onClick={signOut}
              className="font-body text-sm text-paper/60 underline decoration-dotted hover:text-paper"
            >
              Sign out
            </button>
          </div>
        ) : (
          <Link
            to="/sign-up"
            className="rounded-full border border-violet-400/60 px-4 py-2 font-body text-sm font-medium text-paper transition hover:border-violet-400 hover:bg-violet-600/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            Sign In
          </Link>
        )}
      </nav>

      {/* Mobile hamburger trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-surface/60 backdrop-blur transition hover:border-violet-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 sm:hidden"
      >
        <span className="h-0.5 w-5 rounded-full bg-paper" />
        <span className="h-0.5 w-5 rounded-full bg-paper" />
        <span className="h-0.5 w-3.5 self-center rounded-full bg-paper" />
      </button>

      {/* Overlay (mobile only) */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer (mobile only) */}
      <nav
        className={`fixed right-0 top-0 z-50 h-full w-[82%] max-w-sm border-l border-white/10 bg-surface px-6 py-6 shadow-2xl shadow-black/60 transition-transform duration-300 ease-out sm:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Site menu"
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="font-display text-base font-semibold text-paper">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-paper transition hover:border-violet-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            ✕
          </button>
        </div>

        <ul className="flex flex-col gap-1">
          {!installed && (
            <li>
              <button
                type="button"
                onClick={handleAddToHomeScreen}
                className="block w-full rounded-lg px-3 py-3 text-left font-body text-[15px] text-paper/90 transition hover:bg-surface-2 hover:text-violet-400"
              >
                Add to your phone home screen
              </button>
            </li>
          )}
          {DRAWER_ITEMS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 font-body text-[15px] text-paper/90 transition hover:bg-surface-2 hover:text-violet-400"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
