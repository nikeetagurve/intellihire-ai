"use client";

import Link from "next/link";
import { BriefcaseBusiness, ArrowUpRight } from "lucide-react";

export default function JobMatchCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#121520] p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15">
            <BriefcaseBusiness className="h-6 w-6 text-violet-400" />
          </div>

          <p className="text-sm text-gray-400">Your Top Job Match</p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            AI/ML Engineer Intern
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            TechNova AI
          </p>
        </div>

        <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
          92% Match
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
        <p className="text-sm text-gray-400">
          Based on your skills and profile
        </p>

        <Link
          href="/jobs"
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          View Matches
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}