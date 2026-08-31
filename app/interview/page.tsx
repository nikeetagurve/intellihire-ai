"use client";

import { useState } from "react";
import {
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  MessageSquare,
  Target,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import {
  getQuestions,
  analyzeAnswer,
  InterviewQuestion,
  InterviewFeedback,
} from "@/lib/interviewEngine";

const roles = [
  "Frontend Developer",
  "AI / ML Engineer",
  "Data Scientist",
];

export default function InterviewPage() {
  const [selectedRole, setSelectedRole] = useState("AI / ML Engineer");
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] =
    useState<InterviewFeedback | null>(null);

  const questions = getQuestions(selectedRole);
  const question: InterviewQuestion = questions[currentQuestion];

  const startInterview = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setAnswer("");
    setFeedback(null);
  };

  const submitAnswer = () => {
    if (!answer.trim()) return;

    const result = analyzeAnswer(answer);
    setFeedback(result);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswer("");
      setFeedback(null);
    }
  };

  const restartInterview = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswer("");
    setFeedback(null);
  };

  return (
    <div className="flex min-h-screen bg-[#060810] text-white">
      <Sidebar />

      <main className="flex min-h-screen flex-1 flex-col">
        <Header />

        <div className="mx-auto w-full max-w-7xl p-8">

          {/* Page Header */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-sm text-violet-300">
              <Sparkles size={16} />
              AI-Powered Interview Practice
            </div>

            <h1 className="text-3xl font-bold md:text-4xl">
              Interview AI
            </h1>

            <p className="mt-3 text-slate-400">
              Practice technical interviews and receive instant AI-powered
              feedback on your answers.
            </p>
          </div>

          {!started ? (
            <InterviewSetup
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              startInterview={startInterview}
            />
          ) : (
            <InterviewSession
              question={question}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
              answer={answer}
              setAnswer={setAnswer}
              feedback={feedback}
              submitAnswer={submitAnswer}
              nextQuestion={nextQuestion}
              hasNext={currentQuestion < questions.length - 1}
              restartInterview={restartInterview}
            />
          )}

        </div>
      </main>
    </div>
  );
}


/* ---------------- INTERVIEW SETUP ---------------- */

function InterviewSetup({
  selectedRole,
  setSelectedRole,
  startInterview,
}: {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  startInterview: () => void;
}) {
  return (
    <div className="mx-auto max-w-4xl">

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
          <Brain size={28} />
        </div>

        <h2 className="mt-6 text-2xl font-semibold">
          Configure Your Interview
        </h2>

        <p className="mt-2 text-slate-400">
          Select a role and start practicing with AI-generated
          technical interview questions.
        </p>

        {/* Role Selection */}
        <div className="mt-8">

          <p className="mb-4 text-sm font-medium text-slate-300">
            Select Target Role
          </p>

          <div className="grid gap-4 md:grid-cols-3">

            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`rounded-xl border p-5 text-left transition ${
                  selectedRole === role
                    ? "border-violet-500 bg-violet-500/15"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <Target
                  size={20}
                  className={
                    selectedRole === role
                      ? "text-violet-300"
                      : "text-slate-500"
                  }
                />

                <p className="mt-4 font-medium text-white">
                  {role}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  AI-powered technical interview
                </p>

              </button>
            ))}

          </div>

        </div>

        {/* Features */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <SetupFeature
            title="Technical Questions"
            description="Role-specific interview questions"
          />

          <SetupFeature
            title="Instant Feedback"
            description="AI evaluation of your answers"
          />

          <SetupFeature
            title="Performance Score"
            description="Track your interview readiness"
          />

        </div>

        <button
          onClick={startInterview}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 py-4 font-medium transition hover:scale-[1.01]"
        >
          Start AI Interview

          <ArrowRight size={19} />
        </button>

      </div>

    </div>
  );
}


function SetupFeature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">

      <CheckCircle2
        size={18}
        className="text-emerald-400"
      />

      <h3 className="mt-3 text-sm font-medium text-white">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-relaxed text-slate-500">
        {description}
      </p>

    </div>
  );
}


/* ---------------- INTERVIEW SESSION ---------------- */

function InterviewSession({
  question,
  questionNumber,
  totalQuestions,
  answer,
  setAnswer,
  feedback,
  submitAnswer,
  nextQuestion,
  hasNext,
  restartInterview,
}: {
  question: InterviewQuestion;
  questionNumber: number;
  totalQuestions: number;
  answer: string;
  setAnswer: (answer: string) => void;
  feedback: InterviewFeedback | null;
  submitAnswer: () => void;
  nextQuestion: () => void;
  hasNext: boolean;
  restartInterview: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl">

      {/* Progress */}
      <div className="mb-6">

        <div className="flex items-center justify-between text-sm">

          <span className="text-slate-400">
            Question {questionNumber} of {totalQuestions}
          </span>

          <span className="text-violet-300">
            {Math.round((questionNumber / totalQuestions) * 100)}%
            Complete
          </span>

        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">

          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-400 transition-all"
            style={{
              width: `${(questionNumber / totalQuestions) * 100}%`,
            }}
          />

        </div>

      </div>


      {/* Question */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-violet-500/15 p-3 text-violet-300">
              <MessageSquare size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-400">
                {question.category}
              </p>

              <p className="text-xs text-violet-300">
                {question.difficulty}
              </p>
            </div>

          </div>

          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
            AI Interview
          </span>

        </div>

        <h2 className="mt-8 text-xl font-semibold leading-relaxed md:text-2xl">
          {question.question}
        </h2>

      </div>


      {/* Answer */}
      {!feedback && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

          <h3 className="font-semibold">
            Your Answer
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Explain your answer clearly and include examples where possible.
          </p>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="mt-5 h-48 w-full resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
          />

          <button
            onClick={submitAnswer}
            disabled={!answer.trim()}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 py-3 font-medium transition hover:scale-[1.01] disabled:opacity-40"
          >
            Analyze My Answer

            <Sparkles size={18} />
          </button>

        </div>
      )}


      {/* Feedback */}
      {feedback && (
        <div className="mt-6 space-y-6">

          {/* Score */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/15 to-transparent p-7">

            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

              <div>

                <p className="text-sm text-violet-300">
                  AI Feedback Complete
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {feedback.feedback}
                </h2>

              </div>

              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border-8 border-violet-500">

                <span className="text-3xl font-bold">
                  {feedback.score}
                </span>

                <span className="text-[10px] text-slate-500">
                  SCORE
                </span>

              </div>

            </div>

          </div>


          <div className="grid gap-6 md:grid-cols-2">

            {/* Strengths */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

              <h3 className="flex items-center gap-2 font-semibold">

                <CheckCircle2
                  size={20}
                  className="text-emerald-400"
                />

                What You Did Well

              </h3>

              <div className="mt-5 space-y-3">

                {feedback.strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-emerald-500/5 p-4 text-sm text-slate-300"
                  >
                    {strength}
                  </div>
                ))}

              </div>

            </div>


            {/* Improvements */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

              <h3 className="flex items-center gap-2 font-semibold">

                <Sparkles
                  size={20}
                  className="text-amber-400"
                />

                Areas to Improve

              </h3>

              <div className="mt-5 space-y-3">

                {feedback.improvements.length > 0 ? (
                  feedback.improvements.map(
                    (improvement, index) => (
                      <div
                        key={index}
                        className="rounded-xl bg-amber-500/5 p-4 text-sm text-slate-300"
                      >
                        {improvement}
                      </div>
                    )
                  )
                ) : (
                  <div className="rounded-xl bg-emerald-500/5 p-4 text-sm text-slate-300">
                    Excellent work! No major improvements identified.
                  </div>
                )}

              </div>

            </div>

          </div>


          {/* Navigation */}
          <div className="flex flex-col gap-3 sm:flex-row">

            {hasNext ? (

              <button
                onClick={nextQuestion}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 py-3 font-medium"
              >
                Next Question

                <ChevronRight size={18} />

              </button>

            ) : (

              <button
                onClick={restartInterview}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 py-3 font-medium"
              >
                Start New Interview

                <RotateCcw size={18} />

              </button>

            )}

            <button
              onClick={restartInterview}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 hover:bg-white/5"
            >
              <RotateCcw size={17} />

              Restart

            </button>

          </div>

        </div>
      )}

    </div>
  );
}