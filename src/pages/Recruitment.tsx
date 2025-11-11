import React, { useState, useEffect } from "react";
import { FileText, User, Briefcase, Star } from "lucide-react";
import NeonCard from "../components/ui/NeonCard"; // adjust path if needed

// ---------- Types ----------

type Experience = {
  title: string;
  company?: string;
  duration?: string;
  details?: string;
};

type Project = {
  name: string;
  description?: string;
  techStack?: string;
};

type ParsedResume = {
  name?: string;
  email?: string;
  phone?: string;
  qualifications: string[];
  experiences: Experience[];
  projects: Project[];
  skills: string[];
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
  matchedRequired: string[];
  missingRequired: string[];
  matchedNiceToHave: string[];
};

// ---------- Mock data ----------

// used when backend is not ready or resume is non-text
const MOCK_PARSED_RESUME: ParsedResume = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+966 50 123 4567",
  qualifications: [
    "B.Tech in Computer Science, XYZ University (2016–2020)",
    "12th Grade – CBSE (2016)",
  ],
  experiences: [
    {
      title: "Senior Frontend Engineer",
      company: "ABC Technologies",
      duration: "2022 – Present",
      details:
        "Leads UI development for HR analytics dashboards using React & TypeScript.",
    },
    {
      title: "Frontend Engineer",
      company: "DEF Solutions",
      duration: "2020 – 2022",
      details:
        "Implemented complex recruitment and reporting UIs using React and REST APIs.",
    },
  ],
  projects: [
    {
      name: "Recruitment Analytics Dashboard",
      description:
        "Dashboard for candidate funnel, Saudization, and workforce metrics.",
      techStack: "React, TypeScript, Node.js, PostgreSQL",
    },
    {
      name: "Resume Parsing Microservice",
      description:
        "Microservice to extract skills, experience, and education from resumes.",
      techStack: "Python, FastAPI, spaCy",
    },
  ],
  skills: [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind",
    "REST API",
    "Node.js",
    "Git",
  ],
};

const JOB_PROFILES: JobProfile[] = [
  {
    id: "jp-1",
    title: "Frontend Engineer (React)",
    level: "Mid",
    location: "Riyadh",
    requiredSkills: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
    niceToHaveSkills: ["Tailwind", "Redux", "Testing", "REST API"],
    summary:
      "Build modern HR dashboards and frontends using React and TypeScript.",
  },
  {
    id: "jp-2",
    title: "Backend Engineer (Node.js)",
    level: "Senior",
    location: "Jeddah",
    requiredSkills: ["Node.js", "REST API", "SQL", "Databases"],
    niceToHaveSkills: ["NestJS", "Microservices", "Docker", "AWS"],
    summary:
      "Design and maintain backend APIs for recruitment and workforce analytics.",
  },
  {
    id: "jp-3",
    title: "Data Analyst",
    level: "Mid",
    location: "Remote",
    requiredSkills: ["SQL", "Excel", "Data Visualization"],
    niceToHaveSkills: ["Python", "Power BI", "Tableau", "Statistics"],
    summary:
      "Analyze hiring funnels, Saudization metrics and performance trends.",
  },
];

// ---------- Frontend text parser (for .txt resumes) ----------

function parseTextResume(text: string): ParsedResume {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const phoneMatch = text.match(
    /(\+?\d{1,3}[-.\s]?)?(\d{3,4}[-.\s]?\d{3}[-.\s]?\d{3,4})/
  );
  const nameGuess =
    lines[0] && lines[0].length < 60 && !/\b(email|phone|mobile)\b/i.test(lines[0])
      ? lines[0]
      : undefined;

  const sectionIndices: Record<string, number> = {};
  lines.forEach((line, idx) => {
    const lower = line.toLowerCase();
    if (lower.includes("education")) sectionIndices["education"] = idx;
    if (lower.includes("experience") || lower.includes("work history"))
      sectionIndices["experience"] = idx;
    if (lower.includes("projects")) sectionIndices["projects"] = idx;
    if (lower.includes("skills") || lower.includes("skill set"))
      sectionIndices["skills"] = idx;
  });

  const getSectionLines = (key: string): string[] => {
    const idx = sectionIndices[key];
    if (idx === undefined) return [];
    const collected: string[] = [];
    for (let i = idx + 1; i < lines.length; i++) {
      const line = lines[i];
      const lower = line.toLowerCase();
      // stop when next section heading
      if (
        lower.includes("education") ||
        lower.includes("experience") ||
        lower.includes("work history") ||
        lower.includes("projects") ||
        lower.includes("skills") ||
        /^[A-Z][A-Z\s]{4,}$/.test(line)
      ) {
        break;
      }
      collected.push(line);
    }
    return collected;
  };

  const eduLines = getSectionLines("education");
  const expLines = getSectionLines("experience");
  const projLines = getSectionLines("projects");
  const skillLines = getSectionLines("skills");

  const qualifications = eduLines.length
    ? eduLines
    : ["(No explicit Education section detected)"];

  const experiences: Experience[] = [];
  if (expLines.length) {
    let buffer: string[] = [];
    const flush = () => {
      if (!buffer.length) return;
      const title = buffer[0];
      const rest = buffer.slice(1).join(" ");
      experiences.push({
        title,
        details: rest || undefined,
      });
      buffer = [];
    };
    expLines.forEach((l) => {
      if (/^[-•]/.test(l)) {
        flush();
        buffer.push(l.replace(/^[-•]\s*/, ""));
      } else {
        buffer.push(l);
      }
    });
    flush();
  }

  const projects: Project[] = projLines.map((l) => ({
    name: l.replace(/^[-•]\s*/, ""),
  }));

  let skills: string[] = [];
  if (skillLines.length) {
    const joined = skillLines.join(", ");
    skills = joined
      .split(/[,•;]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return {
    name: nameGuess,
    email: emailMatch?.[0],
    phone: phoneMatch?.[0],
    qualifications,
    experiences,
    projects,
    skills,
  };
}

// ---------- Matching logic ----------

function computeMatch(resume: ParsedResume, profile: JobProfile): MatchResult {
  const rs = new Set(resume.skills.map((s) => s.toLowerCase().trim()));

  const matchedRequired = profile.requiredSkills.filter((s) =>
    rs.has(s.toLowerCase())
  );
  const missingRequired = profile.requiredSkills.filter(
    (s) => !rs.has(s.toLowerCase())
  );
  const matchedNiceToHave = profile.niceToHaveSkills.filter((s) =>
    rs.has(s.toLowerCase())
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
    matchedRequired,
    missingRequired,
    matchedNiceToHave,
  };
}

// ---------- Component ----------

export default function ResumeAnalyzerAndMatcher(): JSX.Element {
  const [fileName, setFileName] = useState("");
  const [resume, setResume] = useState<ParsedResume | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const activeResume = resume || MOCK_PARSED_RESUME;

  const calculateMatches = (parsed: ParsedResume) => {
    const results = JOB_PROFILES.map((jp) => computeMatch(parsed, jp)).sort(
      (a, b) => b.score - a.score
    );
    setMatches(results);
  };

  useEffect(() => {
    // initial matches using mock resume
    calculateMatches(activeResume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setLoading(true);
    setFileName(file.name);

    const ext = file.name.split(".").pop()?.toLowerCase();

    try {
      if (ext === "txt") {
        // Parse plain text in the browser
        const reader = new FileReader();
        reader.onload = () => {
          const text = String(reader.result || "");
          const parsed = parseTextResume(text);
          setResume(parsed);
          calculateMatches(parsed);
          setLoading(false);
        };
        reader.onerror = () => {
          setError("Failed to read file.");
          setResume(null);
          calculateMatches(MOCK_PARSED_RESUME);
          setLoading(false);
        };
        reader.readAsText(file);
      } else {
        // For pdf/doc/docx: send to backend OR use mock
        // ----- REAL BACKEND EXAMPLE -----
        // const form = new FormData();
        // form.append("file", file);
        // const res = await fetch("/api/resume/parse", {
        //   method: "POST",
        //   body: form,
        // });
        // if (!res.ok) throw new Error("Backend parse failed");
        // const parsed: ParsedResume = await res.json();

        // ----- DEMO: use mock parsed data -----
        const parsed = MOCK_PARSED_RESUME;

        setResume(parsed);
        calculateMatches(parsed);
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to parse resume.");
      setResume(null);
      calculateMatches(MOCK_PARSED_RESUME);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
              Resume Analyzer & Matcher
            </h1>
            <p className="text-white/70 mt-2 text-sm md:text-base">
              Upload a resume, extract{" "}
              <span className="font-semibold text-white">qualifications</span>,{" "}
              <span className="font-semibold text-white">experience</span>,{" "}
              <span className="font-semibold text-white">projects</span>{" "}
              and <span className="font-semibold text-white">skills</span>, then
              match it to job profiles.
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

        {/* File + status */}
        <div className="flex items-center justify-between text-xs text-white/60 border border-white/10 rounded-xl px-4 py-2 bg-white/5">
          <div>
            <span className="font-semibold text-white/80">Selected: </span>
            {fileName || "No file selected (showing demo resume)"}
          </div>
          <div>
            {loading ? (
              <span className="animate-pulse text-neon-blue">Analyzing…</span>
            ) : resume ? (
              <span className="text-emerald-400">Parsed successfully</span>
            ) : (
              <span className="text-white/50">Using demo data</span>
            )}
          </div>
        </div>
        {error && (
          <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {/* Top summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60 mb-1">Name</p>
            <p className="text-sm font-semibold">
              {activeResume.name || "Not detected"}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60 mb-1">Email</p>
            <p className="text-sm font-semibold break-all">
              {activeResume.email || "Not detected"}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60 mb-1">Phone</p>
            <p className="text-sm font-semibold">
              {activeResume.phone || "Not detected"}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60 mb-1">Summary</p>
            <p className="text-sm font-semibold">
              {activeResume.experiences.length} experience(s),{" "}
              {activeResume.projects.length} project(s),{" "}
              {activeResume.skills.length} skill(s)
            </p>
          </div>
        </div>

        {/* Parsed content + skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Qualifications + Experience */}
          <div className="space-y-4">
            <NeonCard glowColor="blue">
              <h2 className="text-lg font-semibold mb-3">
                Qualifications / Education
              </h2>
              <ul className="space-y-2 text-sm">
                {activeResume.qualifications.map((q, idx) => (
                  <li
                    key={idx}
                    className="border border-white/10 rounded-lg px-3 py-2 bg-black/20"
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </NeonCard>

            <NeonCard glowColor="green">
              <h2 className="text-lg font-semibold mb-3">Experience</h2>
              {activeResume.experiences.length === 0 ? (
                <p className="text-sm text-white/60">
                  No experience entries detected.
                </p>
              ) : (
                <div className="space-y-3">
                  {activeResume.experiences.map((exp, idx) => (
                    <div
                      key={idx}
                      className="border border-white/10 rounded-lg px-3 py-2 bg-black/20"
                    >
                      <p className="font-semibold text-sm">{exp.title}</p>
                      {(exp.company || exp.duration) && (
                        <p className="text-xs text-white/60">
                          {[exp.company, exp.duration]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                      )}
                      {exp.details && (
                        <p className="text-xs text-white/70 mt-1">
                          {exp.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </NeonCard>
          </div>

          {/* Right: Projects + Skills */}
          <div className="space-y-4">
            <NeonCard glowColor="purple">
              <h2 className="text-lg font-semibold mb-3">Projects</h2>
              {activeResume.projects.length === 0 ? (
                <p className="text-sm text-white/60">No projects detected.</p>
              ) : (
                <div className="space-y-3">
                  {activeResume.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="border border-white/10 rounded-lg px-3 py-2 bg-black/20"
                    >
                      <p className="font-semibold text-sm">{proj.name}</p>
                      {proj.description && (
                        <p className="text-xs text-white/70 mt-1">
                          {proj.description}
                        </p>
                      )}
                      {proj.techStack && (
                        <p className="text-xs text-neon-blue mt-1">
                          Tech: {proj.techStack}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </NeonCard>

            <NeonCard glowColor="pink">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-neon-pink" />
                Skillsets
              </h2>
              {activeResume.skills.length === 0 ? (
                <p className="text-sm text-white/60">
                  No skills detected. Make sure the resume has a “Skills” section.
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
          </div>
        </div>

        {/* Match results */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-neon-green" />
            Matching Job Profiles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {matches.map(
              ({
                profile,
                score,
                matchedRequired,
                missingRequired,
                matchedNiceToHave,
              }) => (
                <NeonCard
                  key={profile.id}
                  glowColor={
                    score >= 80 ? "green" : score >= 50 ? "orange" : "red"
                  }
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
                        {matchedRequired.length === 0 ? (
                          <span className="text-[11px] text-white/50">
                            None
                          </span>
                        ) : (
                          matchedRequired.map((s) => (
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
              )
            )}
          </div>
        </div>

        <p className="text-[11px] text-white/50 mt-4">
          Note: For PDF/DOCX, this page currently uses mock parsed data. To fully
          parse contents inside the resume, connect the upload logic to a FastAPI
          endpoint (e.g. <code>/api/resume/parse</code>) that returns the same
          structure as <code>ParsedResume</code>.
        </p>
      </div>
    </div>
  );
}
