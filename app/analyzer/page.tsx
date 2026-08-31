"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";

import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs";

import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Upload,
  ArrowRight,
  Target,
  Loader2,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { analyzeResume, type ResumeAnalysis } from "@/lib/atsEngine";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

 const handleAnalyze = () => {
  if (!resumeText.trim()) return;

  const result = analyzeResume(resumeText);

  // Save the latest resume analysis for other pages
  localStorage.setItem("resumeAnalysis", JSON.stringify(result));

  setAnalysis(result);
};

  const handleFileUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadError("");
    setResumeText("");
    setAnalysis(null);

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setUploadError("Please upload a valid PDF file.");
      return;
    }

    try {
      setIsUploading(true);
      setFileName(file.name);

      const arrayBuffer = await file.arrayBuffer();

      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
      });

      const pdf = await loadingTask.promise;

      let extractedText = "";

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();

        const pageText = textContent.items
          .map((item) => {
            if ("str" in item) {
              return item.str;
            }
            return "";
          })
          .join(" ");

        extractedText += pageText + "\n";
      }

      const cleanedText = extractedText.trim();

      if (!cleanedText) {
        setUploadError(
          "No readable text was found. This PDF may be scanned or image-based."
        );
        setFileName("");
        return;
      }

      setResumeText(cleanedText);
      setUploadError("");
    } catch (error) {
      console.error("PDF extraction error:", error);

      setUploadError(
        "Unable to read this PDF. Please try another PDF file."
      );

      setFileName("");
    } finally {
      setIsUploading(false);
    }
  };

  const resetFile = () => {
    setFileName("");
    setUploadError("");
    setResumeText("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#060810] text-white">
      <Sidebar />

      <main className="flex min-h-screen flex-1 flex-col">
        <Header />

        <div className="mx-auto w-full max-w-7xl p-8">
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-sm text-violet-300">
              <Sparkles size={16} />
              AI Resume Intelligence
            </div>

            <h1 className="text-3xl font-bold md:text-4xl">
              Resume Analyzer
            </h1>

            <p className="mt-3 text-slate-400">
              Upload your resume and analyze your skills, ATS score, and
              improvement opportunities.
            </p>
          </div>

          {!analysis ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-violet-500/15 p-3 text-violet-300">
                    <FileText size={22} />
                  </div>

                  <div>
                    <h2 className="font-semibold">Add Your Resume</h2>

                    <p className="text-sm text-slate-400">
                      Paste resume text or upload a PDF
                    </p>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-dashed border-violet-500/40 bg-violet-500/5 p-4 text-sm text-violet-300 transition hover:bg-violet-500/10 disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Reading PDF...
                    </>
                  ) : (
                    <>
                      <Upload size={20} />
                      Upload Resume PDF
                    </>
                  )}
                </button>

                {fileName && (
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-emerald-500/10 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-emerald-400">
                      <CheckCircle2 size={16} />

                      <span className="max-w-[280px] truncate">
                        {fileName}
                      </span>
                    </div>

                    <button
                      onClick={resetFile}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {uploadError && (
                  <p className="mt-3 text-sm text-red-400">
                    {uploadError}
                  </p>
                )}

                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-slate-500">OR</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <textarea
                  value={resumeText}
                  onChange={(event) => {
                    setResumeText(event.target.value);
                    setFileName("");
                    setUploadError("");
                  }}
                  placeholder={`Paste your resume content here...

Skills: Python, React, SQL, Machine Learning

Projects:
Built a machine learning application using Python and TensorFlow...`}
                  className="h-[300px] w-full resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
                />

                <button
                  onClick={handleAnalyze}
                  disabled={!resumeText.trim() || isUploading}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 py-3 font-medium transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Sparkles size={18} />
                  Analyze Resume
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-transparent p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                    <Target size={24} />
                  </div>

                  <h2 className="mt-5 text-xl font-semibold">
                    What IntelliHire analyzes
                  </h2>

                  <div className="mt-6 space-y-4">
                    <Feature
                      title="ATS Compatibility"
                      description="Evaluates your resume against important job-ready criteria."
                    />

                    <Feature
                      title="Skill Detection"
                      description="Identifies technical and relevant skills from your resume."
                    />

                    <Feature
                      title="Keyword Optimization"
                      description="Detects potentially missing keywords."
                    />

                    <Feature
                      title="Smart Recommendations"
                      description="Provides suggestions to improve your resume."
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                      <Upload size={22} />
                    </div>

                    <div>
                      <h3 className="font-medium">
                        Smart PDF Extraction
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Extracts readable text from uploaded PDF resumes for
                        analysis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <AnalysisResult
              analysis={analysis}
              onReset={() => {
                setAnalysis(null);
                resetFile();
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <CheckCircle2
        size={20}
        className="mt-0.5 shrink-0 text-emerald-400"
      />

      <div>
        <h3 className="font-medium text-white">{title}</h3>

        <p className="mt-1 text-sm leading-relaxed text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function AnalysisResult({
  analysis,
  onReset,
}: {
  analysis: ResumeAnalysis;
  onReset: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-transparent p-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="text-sm text-violet-300">
              Resume Analysis Complete
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Your ATS Score
            </h2>

            <p className="mt-3 max-w-md text-slate-400">
              Your resume was analyzed based on skills, keywords, achievements,
              and content quality.
            </p>
          </div>

          <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border-[10px] border-violet-500 bg-[#0a0d17]">
            <span className="text-5xl font-bold">
              {analysis.score}
            </span>

            <span className="mt-1 text-xs text-slate-500">
              ATS SCORE
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ResultCard
          title="Skills Identified"
          icon={<CheckCircle2 className="text-emerald-400" />}
        >
          <div className="flex flex-wrap gap-3">
            {analysis.skills.length > 0 ? (
              analysis.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-violet-500/15 px-4 py-2 text-sm text-violet-200"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                No recognized skills found.
              </p>
            )}
          </div>
        </ResultCard>

        <ResultCard
          title="Missing Keywords"
          icon={<AlertCircle className="text-amber-400" />}
        >
          <div className="flex flex-wrap gap-3">
            {analysis.missingKeywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-amber-500/10 px-4 py-2 text-sm text-amber-300"
              >
                {keyword}
              </span>
            ))}
          </div>
        </ResultCard>

        <ResultCard
          title="Improvement Suggestions"
          icon={<Sparkles className="text-violet-400" />}
        >
          <div className="space-y-3">
            {analysis.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm text-slate-300"
              >
                {suggestion}
              </div>
            ))}
          </div>
        </ResultCard>

        <ResultCard
          title="Resume Strengths"
          icon={<CheckCircle2 className="text-emerald-400" />}
        >
          <div className="space-y-3">
            {analysis.strengths.map((strength, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl bg-emerald-500/5 p-4 text-sm text-slate-300"
              >
                <CheckCircle2
                  size={18}
                  className="text-emerald-400"
                />

                {strength}
              </div>
            ))}
          </div>
        </ResultCard>
      </div>

      <button
        onClick={onReset}
        className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 transition hover:bg-white/5"
      >
        Analyze Another Resume
      </button>
    </div>
  );
}

function ResultCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex items-center gap-3">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {children}
    </div>
  );
}