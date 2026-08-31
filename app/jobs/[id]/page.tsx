"use client";

import { useParams, useRouter } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { getJobMatches } from "@/lib/jobMatcher";

import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const jobs = getJobMatches();

  // Get the ID safely from the URL
  const jobId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const jobIndex = parseInt(jobId || "", 10);

  const job = jobs[jobIndex];

  // If job doesn't exist
  if (isNaN(jobIndex) || !job) {
    return (
      <div className="flex min-h-screen bg-[#060810] text-white">
        <Sidebar />

        <main className="flex-1 lg:ml-[250px]">
          <Header />

          <div className="mx-auto max-w-[1000px] p-8">
            <h1 className="text-3xl font-bold">
              Job Opportunity Not Found
            </h1>

            <p className="mt-3 text-gray-400">
              The job opportunity you are looking for could not be found.
            </p>

            <button
              onClick={() => router.push("/jobs")}
              className="mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-3 font-medium text-white"
            >
              Back to Job Matches
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#060810] text-white">
      <Sidebar />

      <main className="flex-1 lg:ml-[250px]">
        <Header />

        <div className="mx-auto max-w-[1000px] p-8">
          {/* Back Button */}
          <button
            onClick={() => router.push("/jobs")}
            className="mb-8 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Job Matches
          </button>

          {/* Job Details Card */}
          <div className="rounded-2xl border border-white/10 bg-[#11141d] p-8">
            <div className="flex items-start justify-between">
              <div className="rounded-xl bg-violet-500/15 p-4 text-violet-400">
                <BriefcaseBusiness size={32} />
              </div>

              <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
                {job.matchScore}% Match
              </div>
            </div>

            {/* Title */}
            <h1 className="mt-8 text-3xl font-bold">
              {job.title}
            </h1>

            {/* Company */}
            <div className="mt-4 flex flex-wrap gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <Building2 size={18} />
                {job.company}
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} />
                Remote
              </div>
            </div>

            {/* About */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold">
                About This Opportunity
              </h2>

              <p className="mt-4 leading-7 text-gray-400">
                This opportunity was matched with your profile based on your
                current skills, technical experience, and career interests.
              </p>
            </div>

            {/* Matching Skills */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold">
                Your Matching Skills
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {job.requiredSkills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
                  >
                    <CheckCircle2 size={16} />
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills to Improve */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold">
                Skills to Improve
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {job.missingSkills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400"
                  >
                    <AlertCircle size={16} />
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() =>
                alert(
                  `You selected the ${job.title} opportunity!`
                )
              }
              className="mt-10 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-4 font-medium text-white transition hover:opacity-90"
            >
              Apply for Opportunity
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}