import React, { useState } from "react";
import NeonCard from "../components/ui/NeonCard";
import { Briefcase, FileText, User, Star } from "lucide-react";

type ParsedResume = {
  name?: string;
  email?: string;
  skills: string[];
  qualifications: string[];
  experiences: string[];
};

type JobProfile = {
  id: string;
  title: string;
  level: "Junior" | "Mid" | "Senior";
  location: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  summary: string;
};

type MatchResult = {
  profile: JobProfile;
  score: number;
  matchedSkills: string[];
  missingRequired: string[];
  matchedNiceToHave: string[];
};

// ---- Mock job profiles to match against ----
const JOB_PROFILES: JobProfile[] = [
  {
    id: "jp-1",
    title: "Frontend Engineer (React)",
    level: "Mid",
    location: "Riyadh",
    requiredSkills: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
    niceToHaveSkills: ["Tailwind", "Redux", "Testing", "REST API"],
    summary:
      "Build modern frontend interfaces using React and TypeScript for HR analytics dashboards.",
  },
  {
    id: "jp-2",
    title: "Backend Engineer (Node.js)",
    level: "Senior",
    location: "Jeddah",
    requiredSkills: ["Node.js", "REST API", "SQL", "Databases"],
    niceToHaveSkills: ["NestJS", "Microservices", "Docker", "AWS"],
    summary:
      "Design and maintain backend services and APIs powering recruitment and workforce analytics.",
  },
  {
    id: "jp-3",
    title: "Data Analyst",
    level: "Mid",
    location: "Remote",
    requiredSkills: ["SQL", "Excel", "Data Visualization"],
    niceToHaveSkills: ["Python", "Power BI", "Tableau", "Statistics"],
    summary:
      "Analyze hiring funnels, Saudization metrics and performance trends to support decision making.",
  },
];

// ---- Basic text parser (demo) ----
function parseTextResume(text: string): ParsedResume {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);

  const skillsSectionRegex = /(skills|technical skills|skill set)/i;
  const skillsIndex = lines.findIndex((l) => skillsSectionRegex.test(l));
  let skills: string[] = [];

  if (skillsIndex !== -1) {
    const after = lines.slice(skillsIndex + 1, skillsIndex + 6).join(", ");
    skills = after
      .split(/[,•;]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const nameGuess = lines[0] && lines[0].length < 60 ? lines[0] : undefined;

  return {
    name: nameGuess,
    email: emailMatch?.[0],
    skills,
    qualifications: [],
    experiences: [],
  };
}

// ---- Mock parsed resume (used when pdf/doc or nothing uploaded) ----
const MOCK_RESUME: ParsedResume = {
  name: "John Doe",
  email: "john.doe@example.com",
  skills: [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind",
    "REST API",
    "Node.js",
  ],
  qualifications: ["B.Tech in Computer Science"],
  experiences: ["3+ years in frontend development"],
};

// ---- Matching logic ----
function computeMatch(resume: ParsedResume, profile: JobProfile): MatchResult {
  const resumeSkills = new Set(
    resume.skills.map((s) => s.toLowerCase().trim())
  );

  const matchedRequired = profile.requiredSkills.filter((skill) =>
    resumeSkills.has(skill.toLowerCase())
  );

  const missingRequired = profile.requiredSkills.filter(
    (skill) => !resumeSkills.has(skill.toLowerCase())
  );

  const matchedNiceToHave = profile.niceToHaveSkills.filter((skill) =>
    resumeSkills.has(skill.toLowerCase())
  );

  const requiredScore =
    profile.requiredSkills.length > 0
      ? (matchedRequired.length / profile.requiredSkills.length) * 80
      : 0;

  const niceScore =
    profile.niceToHaveSkills.length > 0
      ? (matchedNiceToHave.length / profile.niceToHaveSkills.length) * 20
      : 0;

  const score = Math.round(requiredScore + niceScore);

  return {
    profile,
    score,
    matchedSkills: matchedRequired,
    missingRequired,
    matchedNiceToHave,
  };
}

export default function ResumeMatcher(): JSX.Element {
  const [fileName, setFileName] = useState("");
  const [resume, setResume] = useState<ParsedResume | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const activeResume = resume || MOCK_RESUME;

  const recalcMatches = (parsed: ParsedResume) => {
    const results = JOB_PROFILES.map((jp) => computeMatch(parsed, jp)).sort(
      (a, b) => b.score - a.score
    );
    setMatches(results);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setFileName(file.name);

    const ext = file.name.split(".").pop()?.toLowerCase();

    if (ext === "txt") {
      const reader = new FileReader();
      reader.onload = () => {
        const text = String(reader.result || "");
        const parsed = parseTextResume(text);
        setResume(parsed);
        recalcMatches(parsed);
        setLoading(false);
      };
      reader.onerror = () => {
        setResume(null);
        recalcMatches(MOCK_RESUME);
        setLoading(false);
      };
      reader.readAsText(file);
    } else {
      // For pdf/doc/docx – pretend backend parsed it and use mock data
      setTimeout(() => {
        setResume(MOCK_RESUME);
        recalcMatches(MOCK_RESUME);
        setLoading(false);
      }, 500);
    }
  };

  // initial matches using mock resume
  React.useEffect(() => {
    recalcMatches(activeResume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
              Resume & Profile Matcher
            </h1>
            <p className="text-white/70 mt-2 text-sm md:text-base">
              Upload a resume and see how well it matches your predefined job
              profiles based on skills.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />
            <span className="px-4 py-2 rounded-lg bg-neon-blue/80 hover:bg-neon-blue text-black font-semibold text-sm shadow-lg flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Upload Resume
            </span>
          </label>
        </div>

        {/* Resume summary */}
        <NeonCard glowColor="cyan" className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center">
              <User className="w-5 h-5 text-neon-blue" />
            </div>
            <div>
              <p className="text-xs text-white/60">Candidate</p>
              <p className="text-sm font-semibold">
                {activeResume.name || "Unknown Candidate"}
              </p>
              <p className="text-xs text-white/60">
                {activeResume.email || "No email detected"}
              </p>
            </div>
          </div>

          <div className="text-xs text-right text-white/60">
            <p>
              Selected file:{" "}
              <span className="font-semibold text-white/80">
                {fileName || "None (using demo resume)"}
              </span>
            </p>
            <p className="mt-1">
              Status:{" "}
              {loading ? (
                <span className="text-neon-blue animate-pulse">Analyzing…</span>
              ) : (
                <span className="text-emerald-400">Ready</span>
              )}
            </p>
          </div>
        </NeonCard>

        {/* Skills from resume */}
        <NeonCard glowColor="purple">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-neon-pink" />
            Extracted Skills
          </h2>
          {activeResume.skills.length === 0 ? (
            <p className="text-sm text-white/60">
              No skills detected. Ensure your resume contains a “Skills” section.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {activeResume.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-xs bg-neon-blue/10 text-neon-blue border border-neon-blue/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </NeonCard>

        {/* Match results */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-neon-green" />
            Matching Job Profiles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {matches.map(({ profile, score, matchedSkills, missingRequired, matchedNiceToHave }) => (
              <NeonCard
                key={profile.id}
                glowColor={score >= 80 ? "green" : score >= 50 ? "orange" : "red"}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-sm font-semibold">{profile.title}</h3>
                    <p className="text-[11px] text-white/60">
                      {profile.level} • {profile.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-white/60">Match Score</p>
                    <p
                      className={`text-xl font-bold ${
                        score >= 80
                          ? "text-emerald-400"
                          : score >= 50
                          ? "text-amber-300"
                          : "text-rose-300"
                      }`}
                    >
                      {score}%
                    </p>
                  </div>
                </div>

                <p className="text-xs text-white/70 mb-3">{profile.summary}</p>

                <div className="space-y-2">
                  <div>
                    <p className="text-[11px] text-emerald-300 mb-1">
                      Matched required skills
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {matchedSkills.length === 0 ? (
                        <span className="text-[11px] text-white/50">
                          None
                        </span>
                      ) : (
                        matchedSkills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-500/15 text-emerald-300 border border-emerald-400/40"
                          >
                            {s}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] text-amber-300 mb-1">
                      Missing required skills
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {missingRequired.length === 0 ? (
                        <span className="text-[11px] text-emerald-300">
                          All required skills covered
                        </span>
                      ) : (
                        missingRequired.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-full text-[11px] bg-amber-500/10 text-amber-300 border border-amber-400/40"
                          >
                            {s}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] text-neon-blue mb-1">
                      Nice-to-have matches
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {matchedNiceToHave.length === 0 ? (
                        <span className="text-[11px] text-white/50">
                          None
                        </span>
                      ) : (
                        matchedNiceToHave.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-full text-[11px] bg-neon-blue/15 text-neon-blue border border-neon-blue/40"
                          >
                            {s}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </NeonCard>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-white/50 mt-4">
          Note: Matching is based on simple skill overlap on the frontend for
          demo purposes. In production, you can replace this with an API call to
          your AI/LLM service for semantic matching and ranking.
        </p>
      </div>
    </div>
  );
}
