const RINGS = [
  { r: 40, gap: 24, rotate: 10 },
  { r: 68, gap: 20, rotate: 140 },
  { r: 96, gap: 16, rotate: 250 },
  { r: 124, gap: 14, rotate: 60 },
  { r: 152, gap: 12, rotate: 190 },
  { r: 180, gap: 10, rotate: 320 },
]

/**
 * The chakravyuha mark: concentric gates with a single path drawn from the
 * center outward on load.
 */
export function Labyrinth({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-label="Concentric labyrinth with a single path threading from the center to the edge"
        className="h-auto w-full"
      >
        <title>A path threading through a seven-gate labyrinth</title>
        {RINGS.map((ring) => {
          const circumference = 2 * Math.PI * ring.r
          return (
            <circle
              key={ring.r}
              cx="200"
              cy="200"
              r={ring.r}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-border"
              strokeDasharray={`${circumference - ring.gap} ${ring.gap}`}
              transform={`rotate(${ring.rotate} 200 200)`}
            />
          )
        })}
        <path
          d="M200,200 L200,168 A96,96 0 0 1 296,200 A180,180 0 0 1 200,20"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="labyrinth-path"
        />
        <circle cx="200" cy="200" r="4" fill="var(--primary)" />
      </svg>
      <style>{`
        .labyrinth-path {
          stroke-dasharray: 420;
          stroke-dashoffset: 420;
          animation: labyrinth-draw 2.2s 0.3s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .labyrinth-path {
            animation: none;
            stroke-dashoffset: 0;
          }
        }
        @keyframes labyrinth-draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  )
}
