import { useState } from 'react'
import Header from '../components/Header'

const FEEDBACK_EMAIL = 'iretiodutayo42@gmail.com'

export default function Feedback() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const canSend = name.trim() && message.trim()

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSend) return

    // No backend exists yet to send this silently — this opens the
    // person's own email app pre-filled with their message, addressed to
    // FEEDBACK_EMAIL. Swap this for a real API call (or a form service
    // like Formspree/EmailJS) once one is set up.
    const subject = encodeURIComponent(`Sign Quest feedback from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}`)
    window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <main className="relative min-h-screen bg-ink">
      <Header />
      <div className="mx-auto max-w-xl px-6 pb-20 pt-28 sm:px-10">
        <span className="font-display text-sm uppercase tracking-[0.2em] text-violet-400">
          We're listening
        </span>
        <h1 className="mt-1 font-display text-3xl font-semibold text-paper sm:text-4xl">
          Leave Feedback
        </h1>
        <p className="mt-3 max-w-md font-body text-paper/70">
          Tell us what's working, what's not, or what you'd like to see next.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label htmlFor="fb-name" className="mb-1.5 block font-body text-xs text-paper/60">
              Your name
            </label>
            <input
              id="fb-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-white/20 bg-surface px-4 py-3 font-body text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="fb-message" className="mb-1.5 block font-body text-xs text-paper/60">
              Your message
            </label>
            <textarea
              id="fb-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's on your mind?"
              rows={5}
              className="w-full resize-none rounded-xl border border-white/20 bg-surface px-4 py-3 font-body text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!canSend}
            className="mt-2 self-start rounded-full bg-violet-600 px-6 py-3 font-display text-sm font-semibold text-paper transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-paper/40"
          >
            Send Feedback
          </button>

          <p className="font-body text-xs text-paper/40">
            This opens your email app to send your message to us.
          </p>

          {sent && (
            <p className="font-body text-sm text-pop">
              Your email app should be open now — just hit send there.
            </p>
          )}
        </form>
      </div>
    </main>
  )
}
