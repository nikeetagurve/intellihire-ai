"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  FileText,
  Brain,
  TrendingUp,
  Target,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import JobMatchCard from "@/components/dashboard/JobMatchCard";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatCard from "@/components/dashboard/StatCard";
import ScoreOverview from "@/components/dashboard/ScoreOverview";
import SkillChart from "@/components/dashboard/SkillChart";

import type { ResumeAnalysis } from "@/lib/atsEngine";

export default function Home() {
  const [resumeAnalysis, setResumeAnalysis] =
    useState<ResumeAnalysis | null>(null);

  useEffect(() => {
    const savedAnalysis = localStorage.getItem("resumeAnalysis");

    if (savedAnalysis) {
      try {
        setResumeAnalysis(JSON.parse(savedAnalysis));
      } catch (error) {
        console.error("Failed to load resume analysis:", error);
      }
    }
  }, []);

  const atsScore = resumeAnalysis?.score ?? 87;
  const skillsCount = resumeAnalysis?.skills.length ?? 24;

  return (
    <div className="flex min-h-screen bg-[#060810] text-white">
      <Sidebar />

      <main className="flex min-h-screen flex-1 flex-col">
        <Header />

        <div className="mx-auto w-full max-w-7xl p-8">
          {/* Welcome Section */}
          <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-violet-300">
                <Sparkles size={16} />
                AI-Powered Career Intelligence
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Good evening, Nikeeta 👋
              </h1>

              <p className="mt-3 text-slate-400">
                Here&apos;s what&apos;s happening with your career profile today.
              </p>
            </div>

            <Link
              href="/analyzer"
              className="flex items-center gap-2 self-start rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] md:self-auto"
            >
              Analyze Resume
              <ArrowUpRight size={18} />
            </Link>
          </section>

          {/* Stats */}
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="ATS Score"
              value={atsScore.toString()}
              description={
                resumeAnalysis
                  ? "Based on your latest resume analysis"
                  : "Analyze your resume to get your score"
              }
              icon={Target}
            />

            <StatCard
              title="Skills Identified"
              value={skillsCount.toString()}
              description={
                resumeAnalysis
                  ? "Skills found in your latest resume"
                  : "Analyze your resume to identify skills"
              }
              icon={Brain}
            />

            <StatCard
              title="Interview Readiness"
              value="82%"
              description="+8% this week"
              icon={TrendingUp}
            />

            <StatCard
              title="Resumes Analyzed"
              value={resumeAnalysis ? "01" : "00"}
              description={
                resumeAnalysis
                  ? "Latest resume analysis available"
                  : "No resume analyzed yet"
              }
              icon={FileText}
            />
          </section>

          {/* Job Matches */}
          <JobMatchCard />

          {/* Main Dashboard Grid */}
          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <ScoreOverview score={atsScore} />

            <SkillChart />
          </section>

          {/* Bottom Section */}
          <section className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Recommendations */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    AI Recommendations
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Personalized actions to improve your career profile
                  </p>
                </div>

                <Sparkles className="text-violet-400" size={20} />
              </div>

              <div className="mt-6 space-y-4">
                {resumeAnalysis?.suggestions &&
                resumeAnalysis.suggestions.length > 0 ? (
                  resumeAnalysis.suggestions.slice(0, 3).map(
                    (suggestion, index) => (
                      <Recommendation
                        key={index}
                        number={`0${index + 1}`}
                        title="AI Recommendation"
                        description={suggestion}
                      />
                    )
                  )
                ) : (
                  <>
                    <Recommendation
                      number="01"
                      title="Add measurable achievements"
                      description="Include numbers and percentages to demonstrate your project impact."
                    />

                    <Recommendation
                      number="02"
                      title="Strengthen cloud experience"
                      description="Consider adding AWS or cloud deployment experience to your profile."
                    />

                    <Recommendation
                      number="03"
                      title="Practice technical interviews"
                      description="Your interview readiness could improve with mock technical sessions."
                    />
                  </>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-violet-500/10 to-transparent p-6">
              <h3 className="text-lg font-semibold text-white">
                Quick Actions
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Continue improving your profile
              </p>

              <div className="mt-6 space-y-3">
                <ActionButton
                  title="Analyze Resume"
                  subtitle="Get your ATS score"
                  icon="📄"
                  href="/analyzer"
                />

                <ActionButton
                  title="Start Interview"
                  subtitle="Practice with AI"
                  icon="🎤"
                  href="/interview"
                />

                <ActionButton
                  title="View Analytics"
                  subtitle="Track your progress"
                  icon="📊"
                  href="/analytics"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function Recommendation({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:bg-white/[0.04]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-xs font-bold text-violet-300">
        {number}
      </div>

      <div>
        <h4 className="font-medium text-white">{title}</h4>

        <p className="mt-1 text-sm leading-relaxed text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function ActionButton({
  title,
  subtitle,
  icon,
  href,
}: {
  title: string;
  subtitle: string;
  icon: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-violet-500/40 hover:bg-violet-500/10"
    >
      <span className="text-xl">{icon}</span>

      <div>
        <p className="text-sm font-medium text-white">{title}</p>

        <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
      </div>

      <ArrowUpRight size={16} className="ml-auto text-slate-500" />
    </Link>
  );
}