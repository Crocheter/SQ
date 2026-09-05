import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'

export default function SignUp() {
  const { signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleGoogleSignUp() {
    setError(null)
    setLoading(true)
    try {
      await signInWithGoogle()
      navigate('/tier1')
    } catch (err) {
      // Common cause during setup: the Firebase project isn't configured
      // yet, or Google sign-in isn't enabled in the Firebase console.
      setError(err.message ?? 'Something went wrong signing in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-ink px-6">
      <Header />
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface p-8 text-center">
        <span className="font-display text-sm uppercase tracking-[0.2em] text-violet-400">
          Sign Quest
        </span>
        <h1 className="mt-1 font-display text-2xl font-semibold text-paper sm:text-3xl">
          Sign up to save your progress
        </h1>
        <p className="mt-3 font-body text-sm text-paper/70">
          One tap with your Google account — no password needed.
        </p>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-paper px-6 py-3 font-body text-sm font-semibold text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <GoogleIcon />
          {loading ? 'Signing you up...' : 'Sign Up with Google'}
        </button>

        {error && <p className="mt-4 font-body text-sm text-red-400">{error}</p>}
      </div>
    </main>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20.4H24v7.2h11.3c-1.6 4.6-6 7.9-11.3 7.9-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.1-5.1C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l5.9 4.3C13.7 15.5 18.5 12.4 24 12.4c3.1 0 5.9 1.2 8 3.1l5.1-5.1C34.5 6.1 29.5 4 24 4c-7.5 0-13.9 4.2-17.2 10.4z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-2.1 13.9-5.4l-6.4-5.4c-2 1.5-4.6 2.4-7.5 2.4-5.2 0-9.7-3.3-11.3-7.9l-6.2 4.8C9.9 39.6 16.4 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20.4H24v7.2h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.4 5.4C41.6 35.6 44 30.2 44 24c0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  )
}
