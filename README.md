# 🚀 IntelliHire AI

### AI-Powered Career Intelligence Platform

IntelliHire AI is an AI-powered career intelligence platform designed to help students and job seekers improve their career readiness.

The platform provides resume analysis, ATS scoring, skill detection, interview practice, career analytics, and AI-powered job matching through an interactive dashboard.

## 🌐 Live Demo

🚀 https://intellihire-eight.vercel.app

## ✨ Features

### 📄 Resume Analyzer
- Upload a resume in PDF format
- Extract text from PDF resumes
- Analyze resume content
- Generate an ATS compatibility score
- Detect technical skills
- Identify missing keywords
- Provide improvement suggestions
- Highlight resume strengths

### 🎤 AI Interview Practice
- Role-based interview questions
- Interactive interview practice
- Answer analysis
- Feedback and improvement suggestions
- Interview readiness tracking

### 📊 Career Analytics
- Career performance overview
- ATS score tracking
- Skills analysis
- Interview readiness insights
- Career improvement recommendations

### 💼 Job Matching
- AI-powered job recommendations
- Job compatibility scores
- Matching skills identification
- Skills to improve
- Job opportunity details

### 📈 Career Dashboard
- ATS Score overview
- Skills identified
- Interview readiness
- Resume analysis statistics
- AI-powered recommendations
- Quick career actions

---

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Libraries & Tools
- PDF.js
- Lucide React
- Local Storage

### Deployment
- Vercel

---

## 📂 Project Structure

```text
intellihire-ai
│
├── app
│   ├── analytics
│   ├── analyzer
│   ├── interview
│   ├── jobs
│   │   └── [id]
│   ├── page.tsx
│   └── globals.css
│
├── components
│   ├── dashboard
│   └── layout
│
├── lib
│   ├── atsEngine.ts
│   ├── interviewEngine.ts
│   ├── jobMatcher.ts
│   └── careerData.ts
│
├── types
│   └── pdfjs-dist.d.ts
│
├── README.md
└── package.json