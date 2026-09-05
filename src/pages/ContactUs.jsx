import Header from "../components/Header";

const EMAIL = "iretiodutayo42@gmail.com";
const PHONE = "+2348155748145";

export default function ContactUs() {
  return (
    <main className="relative min-h-screen bg-ink">
      <Header />
      <div className="mx-auto max-w-xl px-6 pb-20 pt-28 sm:px-10">
        <span className="font-display text-sm uppercase tracking-[0.2em] text-violet-400">
          Get in touch
        </span>
        <h1 className="mt-1 font-display text-3xl font-semibold text-paper sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-3 max-w-md font-body text-paper/70">
          Have a question or want to reach out? Use either of the details below.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface px-5 py-5 transition hover:border-violet-400/60"
          >
            <div>
              <p className="font-body text-xs uppercase tracking-wide text-paper/50">
                Email
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-paper">
                {EMAIL}
              </p>
            </div>
            <span className="font-body text-sm text-violet-400">
              Send email →
            </span>
          </a>

          <a
            href={`tel:${PHONE}`}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface px-5 py-5 transition hover:border-violet-400/60"
          >
            <div>
              <p className="font-body text-xs uppercase tracking-wide text-paper/50">
                Phone
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-paper">
                {PHONE}
              </p>
            </div>
            <span className="font-body text-sm text-violet-400">Call →</span>
          </a>
        </div>
      </div>
    </main>
  );
}
