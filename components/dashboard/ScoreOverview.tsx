interface ScoreOverviewProps {
  score: number;
}

export default function ScoreOverview({
  score,
}: ScoreOverviewProps) {
  const circumference = 2 * Math.PI * 54;
  const progress = (score / 100) * circumference;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Resume Health Score
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Based on your latest resume analysis
          </p>
        </div>

        <span className="rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          Excellent
        </span>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center">

        <div className="relative h-44 w-44">
          <svg
            className="-rotate-90"
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="transparent"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="10"
            />

            <circle
              cx="60"
              cy="60"
              r="54"
              fill="transparent"
              stroke="url(#gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
            />

            <defs>
              <linearGradient
                id="gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#8b5cf6"
                />

                <stop
                  offset="100%"
                  stopColor="#22d3ee"
                />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {score}
            </span>

            <span className="text-xs text-slate-500">
              ATS Score
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Your resume is performing better than{" "}
          <span className="font-semibold text-white">
            82% of applicants
          </span>
        </p>

      </div>
    </div>
  );
}