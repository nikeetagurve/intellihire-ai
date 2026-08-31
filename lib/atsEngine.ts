export interface ResumeAnalysis {
  score: number;
  skills: string[];
  missingKeywords: string[];
  suggestions: string[];
  strengths: string[];
}

const technicalSkills = [
  "python",
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node.js",
  "java",
  "c++",
  "sql",
  "mongodb",
  "postgresql",
  "machine learning",
  "data analysis",
  "tensorflow",
  "pytorch",
  "docker",
  "aws",
  "git",
  "github",
  "html",
  "css",
];

const recommendedKeywords = [
  "python",
  "sql",
  "react",
  "javascript",
  "typescript",
  "machine learning",
  "data analysis",
  "git",
  "docker",
  "aws",
];

export function analyzeResume(text: string): ResumeAnalysis {
  const lowerText = text.toLowerCase();

  const skills = technicalSkills.filter((skill) =>
    lowerText.includes(skill.toLowerCase())
  );

  const missingKeywords = recommendedKeywords.filter(
    (keyword) => !lowerText.includes(keyword.toLowerCase())
  );

  let score = 40;

  score += Math.min(skills.length * 4, 30);

  if (text.length > 800) score += 10;
  if (text.includes("%")) score += 5;
  if (text.match(/\d+/g)?.length) score += 5;

  score = Math.min(score, 100);

  const suggestions: string[] = [];

  if (text.length < 800) {
    suggestions.push(
      "Add more details about your projects, internships, and achievements."
    );
  }

  if (!text.includes("%")) {
    suggestions.push(
      "Use measurable achievements such as percentages and performance improvements."
    );
  }

  if (skills.length < 5) {
    suggestions.push(
      "Include more relevant technical skills for your target role."
    );
  }

  suggestions.push(
    "Use strong action verbs such as Built, Developed, Optimized, and Designed."
  );

  const strengths = [
    skills.length >= 5
      ? "Strong technical skill coverage"
      : "Technical skills identified",
    text.length > 800
      ? "Detailed resume content"
      : "Resume has room for additional project details",
    "Resume analyzed for ATS keyword relevance",
  ];

  return {
    score,
    skills,
    missingKeywords,
    suggestions,
    strengths,
  };
}