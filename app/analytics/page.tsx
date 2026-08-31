"use client";

import {
  TrendingUp,
  Target,
  Award,
  Brain,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const performanceData = [
  { name: "Week 1", score: 68 },
  { name: "Week 2", score: 74 },
  { name: "Week 3", score: 79 },
  { name: "Week 4", score: 87 },
];

const skillData = [
  { name: "Python", score: 92 },
  { name: "ML", score: 88 },
  { name: "React", score: 78 },
  { name: "SQL", score: 84 },
  { name: "Next.js", score: 90 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-[#060810] text-white">
      <Sidebar />

      <main className="ml-0 flex-1 lg:ml-[250px]">
        <Header />

        <div className="mx-auto max-w-[1400px] p-8">
          {/* Heading */}
          <div className="mb-10">
            <p className="mb-3 text-sm text-violet-300">
              📊 Career Performance Intelligence
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
              Analytics
            </h1>

            <p className="mt-3 text-gray-400">
              Track your career growth, interview performance, and skill
              development.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Career Score"
              value="87"
              change="+12%"
              description="from last month"
              icon={<Target size={24} />}
            />

            <StatCard
              title="Interview Average"
              value="92%"
              change="+8%"
              description="from last month"
              icon={<Brain size={24} />}
            />

            <StatCard
              title="Skills Growth"
              value="24"
              change="+5"
              description="from last month"
              icon={<TrendingUp size={24} />}
            />

            <StatCard
              title="Achievements"
              value="08"
              change="+2"
              description="from last month"
              icon={<Award size={24} />}
            />
          </div>

          {/* Charts */}
          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            {/* Career Performance */}
            <div className="rounded-2xl border border-white/10 bg-[#11141d] p-6">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    Career Performance
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Your performance growth over the last month
                  </p>
                </div>

                <div className="rounded-xl bg-violet-500/15 p-3 text-violet-400">
                  <TrendingUp size={22} />
                </div>
              </div>

              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#252836"
                    />

                    <XAxis
                      dataKey="name"
                      stroke="#8b90a0"
                    />

                    <YAxis
                      stroke="#8b90a0"
                      domain={[60, 100]}
                    />

                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{
                        r: 6,
                        fill: "#8b5cf6",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Skill Performance */}
            <div className="rounded-2xl border border-white/10 bg-[#11141d] p-6">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    Skill Performance
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Your strongest technical skills
                  </p>
                </div>

                <div className="rounded-xl bg-violet-500/15 p-3 text-violet-400">
                  <BarChart3 size={22} />
                </div>
              </div>

              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#252836"
                    />

                    <XAxis
                      dataKey="name"
                      stroke="#8b90a0"
                    />

                    <YAxis
                      stroke="#8b90a0"
                      domain={[0, 100]}
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
          </div>

          {/* Bottom Section */}
          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#11141d] p-6">
              <h2 className="text-xl font-semibold">
                Recent Progress
              </h2>

              <div className="mt-6 space-y-5">
                <ProgressItem
                  label="Resume Score"
                  value="87%"
                  progress="87%"
                />

                <ProgressItem
                  label="Interview Performance"
                  value="92%"
                  progress="92%"
                />

                <ProgressItem
                  label="Technical Skills"
                  value="84%"
                  progress="84%"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#11141d] p-6">
              <h2 className="text-xl font-semibold">
                Career Insights
              </h2>

              <div className="mt-6 space-y-4">
                <Insight
                  title="Strong Interview Performance"
                  text="Your interview scores have improved by 8% this month."
                />

                <Insight
                  title="Skill Growth"
                  text="You have developed 5 new technical skills recently."
                />

                <Insight
                  title="Career Momentum"
                  text="Your overall career score is trending upward."
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  description,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#11141d] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>

          <h2 className="mt-5 text-3xl font-bold">
            {value}
          </h2>

          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-emerald-400">
              <ArrowUpRight size={14} />
              {change}
            </span>

            <span className="text-gray-500">
              {description}
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-violet-500/15 p-4 text-violet-300">
          {icon}
        </div>
      </div>
    </div>
  );
}

function ProgressItem({
  label,
  value,
  progress,
}: {
  label: string;
  value: string;
  progress: string;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span className="text-sm text-gray-300">
          {label}
        </span>

        <span className="text-sm text-violet-400">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-400"
          style={{ width: progress }}
        />
      </div>
    </div>
  );
}

function Insight({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
      <h3 className="font-medium text-violet-300">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-gray-400">
        {text}
      </p>
    </div>
  );
}