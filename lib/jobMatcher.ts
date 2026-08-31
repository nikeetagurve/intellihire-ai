export interface Job {
  title: string;
  company: string;
  matchScore: number;
  requiredSkills: string[];
  missingSkills: string[];
}

const jobs: Job[] = [
  {
    title: "AI/ML Engineer Intern",
    company: "TechNova AI",
    matchScore: 92,
    requiredSkills: ["Python", "Machine Learning", "SQL"],
    missingSkills: ["Docker"],
  },
  {
    title: "Data Analyst Intern",
    company: "DataFlow",
    matchScore: 88,
    requiredSkills: ["Python", "SQL", "Data Analysis"],
    missingSkills: ["Power BI"],
  },
  {
    title: "Frontend Developer Intern",
    company: "WebCraft",
    matchScore: 82,
    requiredSkills: ["React", "TypeScript", "Next.js"],
    missingSkills: ["Testing"],
  },
];

export function getJobMatches() {
  return jobs.sort((a, b) => b.matchScore - a.matchScore);
}