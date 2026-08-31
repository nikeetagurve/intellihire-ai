"use client";

import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    skill: "Python",
    score: 90,
  },
  {
    skill: "React",
    score: 82,
  },
  {
    skill: "SQL",
    score: 78,
  },
  {
    skill: "ML",
    score: 75,
  },
  {
    skill: "Next.js",
    score: 85,
  },
];

export default function SkillChart() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">
          Skill Strength
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Based on your resume profile
        </p>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="skill"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{ fill: "rgba(139,92,246,0.08)" }}
              contentStyle={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
              }}
            />

            <Bar
              dataKey="score"
              fill="#8b5cf6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}