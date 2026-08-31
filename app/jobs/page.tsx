"use client";

import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { getJobMatches } from "@/lib/jobMatcher";

import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

export default function JobsPage() {
  const jobs = getJobMatches();

  return (
    <div className="flex min-h-screen bg-[#060810] text-white">
      <Sidebar />

      <main className="flex-1 lg:ml-[250px]">
        <Header />

        <div className="mx-auto max-w-[1400px] p-8">
          {/* Page Heading */}
          <div className="mb-10">
            <p className="mb-3 text-sm text-violet-300">
              💼 AI-Powered Career Matching
            </p>

            <h1 className="text-4xl font-bold">
              Job Matches
            </h1>

            <p className="mt-3 text-gray-400">
              Discover career opportunities based on your skills and profile.
            </p>
          </div>

          {/* Job Cards */}
          <div className="grid gap-6 lg:grid-cols-3">
            {jobs.map((job, index) => (
              <div
                key={job.title}
                className="rounded-2xl border border-white/10 bg-[#11141d] p-6 transition hover:border-violet-500/50"
              >
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-violet-500/15 p-3 text-violet-400">
                    <BriefcaseBusiness size={24} />
                  </div>

                  <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
                    {job.matchScore}% Match
                  </div>
                </div>

                {/* Job Title */}
                <h2 className="mt-6 text-xl font-semibold">
                  {job.title}
                </h2>

                {/* Company */}
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                  <Building2 size={16} />
                  {job.company}
                </div>

                {/* Matching Skills */}
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-medium text-gray-300">
                    Matching Skills
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1 rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300"
                      >
                        <CheckCircle2 size={12} />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-medium text-gray-300">
                    Skills to Improve
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {job.missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1 rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400"
                      >
                        <AlertCircle size={12} />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Opportunity Button */}
                <Link
                  href={`/jobs/${index}`}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-3 font-medium text-white transition hover:opacity-90"
                >
                  View Opportunity
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}