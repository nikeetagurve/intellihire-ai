export type InterviewQuestion = {
  id: number;
  question: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

export type InterviewFeedback = {
  score: number;
  strengths: string[];
  improvements: string[];
  feedback: string;
};

const questions: Record<string, InterviewQuestion[]> = {
  "Frontend Developer": [
    {
      id: 1,
      question:
        "What is the difference between server-side rendering and client-side rendering?",
      category: "React",
      difficulty: "Medium",
    },
    {
      id: 2,
      question:
        "Explain the purpose of React hooks and name some commonly used hooks.",
      category: "React",
      difficulty: "Easy",
    },
    {
      id: 3,
      question:
        "What is the difference between let, const, and var in JavaScript?",
      category: "JavaScript",
      difficulty: "Easy",
    },
  ],

  "AI / ML Engineer": [
    {
      id: 1,
      question:
        "What is the difference between supervised and unsupervised machine learning?",
      category: "Machine Learning",
      difficulty: "Easy",
    },
    {
      id: 2,
      question:
        "Explain the bias-variance tradeoff in machine learning.",
      category: "Machine Learning",
      difficulty: "Medium",
    },
    {
      id: 3,
      question:
        "What is overfitting and how can it be prevented?",
      category: "Machine Learning",
      difficulty: "Medium",
    },
  ],

  "Data Scientist": [
    {
      id: 1,
      question:
        "What is the difference between classification and regression?",
      category: "Machine Learning",
      difficulty: "Easy",
    },
    {
      id: 2,
      question:
        "Explain the Central Limit Theorem.",
      category: "Statistics",
      difficulty: "Medium",
    },
    {
      id: 3,
      question:
        "What is the difference between correlation and causation?",
      category: "Statistics",
      difficulty: "Easy",
    },
  ],
};

export function getQuestions(role: string): InterviewQuestion[] {
  return questions[role] || questions["AI / ML Engineer"];
}

export function analyzeAnswer(answer: string): InterviewFeedback {
  const words = answer.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  let score = 50;

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (wordCount >= 50) {
    score += 20;
    strengths.push("Provided a detailed explanation.");
  } else {
    improvements.push(
      "Provide a more detailed explanation with additional context."
    );
  }

  if (wordCount >= 100) {
    score += 10;
    strengths.push("Demonstrated strong depth in your response.");
  }

  const technicalWords = [
    "algorithm",
    "model",
    "data",
    "performance",
    "optimization",
    "analysis",
    "example",
    "implementation",
    "accuracy",
  ];

  const answerLower = answer.toLowerCase();

  const technicalMatches = technicalWords.filter((word) =>
    answerLower.includes(word)
  );

  if (technicalMatches.length >= 2) {
    score += 10;
    strengths.push("Used relevant technical terminology.");
  } else {
    improvements.push(
      "Include more relevant technical concepts and terminology."
    );
  }

  if (
    answerLower.includes("example") ||
    answerLower.includes("for example")
  ) {
    score += 10;
    strengths.push("Supported your explanation with an example.");
  } else {
    improvements.push(
      "Try supporting your answer with a practical example."
    );
  }

  score = Math.min(score, 100);

  if (strengths.length === 0) {
    strengths.push(
      "You provided an initial response to the interview question."
    );
  }

  return {
    score,
    strengths,
    improvements,
    feedback:
      score >= 85
        ? "Excellent response! Your answer demonstrates strong understanding."
        : score >= 70
        ? "Good response. A few improvements could make your answer stronger."
        : "Your answer has potential, but needs more detail and technical depth.",
  };
}