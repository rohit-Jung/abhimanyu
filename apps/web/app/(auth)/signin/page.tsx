import Link from "next/link"

import { SignInForm } from "@/components/auth/signin-form"

const NEXT_STEPS = [
  "Authorize the Abhimanyu GitHub app",
  "Choose the repos it should watch",
  "Open a pull request and read the review",
]

export default function SignInPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[1.15fr_1fr]">
      <aside className="relative hidden overflow-hidden border-r bg-card lg:flex lg:flex-col lg:p-12">
        <Vyuha />

        <Link
          href="/"
          className="relative z-10 w-fit font-heading text-base font-semibold tracking-tight"
        >
          Abhimanyu
        </Link>

        <div className="relative z-10 my-auto flex max-w-md flex-col gap-5">
          <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
            AI code review · RAG context engine
          </span>
          <p className="font-heading text-3xl leading-[1.15] font-semibold tracking-tight text-balance">
            Every codebase is a labyrinth. Abhimanyu finds the way through.
          </p>
        </div>

        <p className="relative z-10 font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Abhimanyu.
        </p>
      </aside>

      <main className="flex flex-col px-6 py-10 sm:px-10 lg:items-center lg:px-14">
        <Link
          href="/"
          className="w-fit font-heading text-base font-semibold tracking-tight lg:hidden"
        >
          Abhimanyu
        </Link>

        <div className="flex flex-1 items-center">
          <div className="flex w-full max-w-sm flex-col gap-8 py-12">
            <div className="flex flex-col gap-3">
              <h1 className="font-heading text-3xl font-semibold tracking-tight">
                Sign in
              </h1>
              <p className="text-balance text-muted-foreground">
                Use the GitHub account that owns the repos you want reviewed.
              </p>
            </div>

            <SignInForm />

            <div className="flex flex-col gap-2 border-l border-border pt-1 pl-4">
              <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                What happens next
              </span>
              <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                {NEXT_STEPS.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function Vyuha() {
  const rings = [
    { r: 60, gap: 30, rotate: 25 },
    { r: 100, gap: 26, rotate: 155 },
    { r: 140, gap: 22, rotate: 275 },
    { r: 180, gap: 18, rotate: 75 },
    { r: 220, gap: 16, rotate: 205 },
    { r: 260, gap: 14, rotate: 340 },
    { r: 300, gap: 12, rotate: 110 },
  ]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-[15rem] -left-[15rem] h-[46rem] w-[46rem] [mask-image:radial-gradient(circle_at_30%_70%,black,transparent_72%)]"
    >
      <svg viewBox="0 0 640 640" className="h-full w-full">
        {rings.map((ring) => {
          const circumference = 2 * Math.PI * ring.r
          return (
            <circle
              key={ring.r}
              cx="320"
              cy="320"
              r={ring.r}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-border"
              strokeDasharray={`${circumference - ring.gap} ${ring.gap}`}
              transform={`rotate(${ring.rotate} 320 320)`}
            />
          )
        })}
        <path
          d="M320,320 L320,280 A140,140 0 0 1 460,320 A220,220 0 0 1 320,540 A300,300 0 0 1 40,320"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          className="vyuha-path opacity-80"
        />
        <circle cx="320" cy="320" r="5" fill="var(--primary)" />
      </svg>
      <style>{`
        .vyuha-path {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: vyuha-draw 2.6s 0.2s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .vyuha-path {
            animation: none;
            stroke-dashoffset: 0;
          }
        }
        @keyframes vyuha-draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  )
}
