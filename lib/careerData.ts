export interface CareerData {
  atsScore: number;
  skills: string[];
  missingKeywords: string[];
  resumesAnalyzed: number;
  interviewAverage: number;
  interviewScores: number[];
}

export const careerData: CareerData = {
  atsScore: 80,

  skills: [
    "Python",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Java",
    "SQL",
    "Machine Learning",
    "Data Analysis",
    "Git",
    "GitHub",
  ],

  missingKeywords: ["Docker", "AWS"],

  resumesAnalyzed: 6,

  interviewAverage: 92,

  interviewScores: [85, 90, 95, 100],
};