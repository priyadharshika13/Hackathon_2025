import React, { useState } from "react";

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

const MOCK_PARSED: ParsedResume = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+966 50 123 4567",
  qualifications: [
    "B.Tech in Computer Science, 2016–2020, XYZ University",
    "12th Grade – CBSE, 2016",
  ],
  experiences: [
    {
      title: "Senior Software Engineer",
      company: "ABC Technologies",
      duration: "2022 – Present",
      details:
        "Leading a team of 5 engineers to build microservices for HR analytics platform.",
    },
    {
      title: "Software Engineer",
      company: "DEF Solutions",
      duration: "2020 – 2022",
      details:
        "Worked on full-stack web applications using React, Node.js and PostgreSQL.",
    },
  ],
  projects: [
    {
      name: "Recruitment Analytics Dashboard",
      description:
        "Built dashboards for applicant tracking, conversion funnel, and fraud monitoring.",
      techStack: "React, TypeScript, Node.js, PostgreSQL, Docker",
    },
    {
      name: "Resume Parsing Service",
      description:
        "Designed REST API to parse resumes and extract skills, experience and education.",
      techStack: "Python, FastAPI, spaCy, Redis",
    },
  ],
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Docker",
    "Microservices",
  ],
};

function parseTextResume(text: string): ParsedResume {
  // Very naive heuristics – good enough for demo
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const phoneMatch = text.match(
    /(\+?\d{1,3}[-.\s]?)?(\d{3,4}[-.\s]?\d{3}[-.\s]?\d{3,4})/
  );

  const nameGuess = lines[0] && lines[0].length < 60 ? lines[0] : undefined;

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

  const getSection = (name: string): string[] => {
    const idx = sectionIndices[name];
    if (idx === undefined) return [];
    const entries: string[] = [];
    for (let i = idx + 1; i < lines.length; i++) {
      const line = lines[i];
      const lower = line.toLowerCase();
      if (
        lower.includes("education") ||
        lower.includes("experience") ||
        lower.includes("projects") ||
        lower.includes("skills") ||
        /^[A-Z\s]{5,}$/.test(line) // another SECTION
      ) {
        break;
      }
      entries.push(line);
    }
    return entries;
  };

  const eduLines = getSection("education");
  const expLines = getSection("experience");
  const projLines = getSection("projects");
  const skillLines = getSection("skills");

  const qualifications =
    eduLines.length > 0 ? eduLines : ["(No explicit education section found)"];

  const experiences: Experience[] =
    expLines.length > 0
      ? expLines.map((l) => ({
          title: l,
        }))
      : [];

  const projects: Project[] =
    projLines.length > 0
      ? projLines.map((l) => ({
          name: l,
        }))
      : [];

  let skills: string[] = [];
  if (skillLines.length > 0) {
    // join then split by comma
    const skillsJoined = skillLines.join(", ");
    skills = skillsJoined
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

export default function ResumeAnalyzer(): JSX.Element {
  const [fileName, setFileName] = useState<string>("");
  const [parsed, setParsed] = useState<ParsedResume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setFileName(file.name);
    setLoading(true);

    const ext = file.name.split(".").pop()?.toLowerCase();

    if (ext === "txt") {
      // For .txt we can read on frontend
      const reader = new FileReader();
      reader.onload = () => {
        const text = String(reader.result || "");
        const result = parseTextResume(text);
        setParsed(result);
        setLoading(false);
      };
      reader.onerror = () => {
        setError("Failed to read file.");
        setParsed(null);
        setLoading(false);
      };
      reader.readAsText(file);
    } else {
      // For pdf/doc/docx – in real app call backend
      // Here we just use mock data so UI still works
      setTimeout(() => {
        setParsed(MOCK_PARSED);
        setLoading(false);
      }, 600);
    }
  };

  const resume = parsed || MOCK_PARSED; // fallback so page never looks empty

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
              Resume Analyzer
            </h1>
            <p className="text-white/70 mt-2 text-sm md:text-base">
              Upload a resume and automatically extract{" "}
              <span className="font-semibold text-white">Qualifications</span>,{" "}
              <span className="font-semibold text-white">Experience</span>,{" "}
              <span className="font-semibold text-white">Projects</span> and{" "}
              <span className="font-semibold text-white">Skills</span>.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />
            <span className="px-4 py-2 rounded-lg bg-neon-blue/80 hover:bg-neon-blue text-black font-semibold text-sm shadow-lg">
              Upload Resume
            </span>
          </label>
        </div>

        {/* File + status */}
        <div className="flex items-center justify-between text-xs text-white/60 border border-white/10 rounded-xl px-4 py-2 bg-white/5">
          <div>
            <span className="font-semibold text-white/80">Selected: </span>
            {fileName || "No file selected (showing demo data)"}
          </div>
          <div>
            {loading ? (
              <span className="animate-pulse text-neon-blue">
                Analyzing…
              </span>
            ) : parsed ? (
              <span className="text-emerald-400">Analysis complete</span>
            ) : (
              <span className="text-white/50">Using demo resume</span>
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
              {resume.name || "Not detected"}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60 mb-1">Email</p>
            <p className="text-sm font-semibold break-all">
              {resume.email || "Not detected"}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60 mb-1">Phone</p>
            <p className="text-sm font-semibold">
              {resume.phone || "Not detected"}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60 mb-1">Summary</p>
            <p className="text-sm font-semibold">
              {resume.experiences.length} experience(s),{" "}
              {resume.projects.length} project(s), {resume.skills.length} skill(s)
            </p>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Qualifications + Experience */}
          <div className="space-y-4">
            {/* Qualifications */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold mb-3">Qualifications</h2>
              <ul className="space-y-2 text-sm">
                {resume.qualifications.map((q, idx) => (
                  <li
                    key={idx}
                    className="border border-white/10 rounded-lg px-3 py-2 bg-black/20"
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold mb-3">Experience</h2>
              {resume.experiences.length === 0 ? (
                <p className="text-sm text-white/60">
                  No experience entries detected.
                </p>
              ) : (
                <div className="space-y-3">
                  {resume.experiences.map((exp, idx) => (
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
            </div>
          </div>

          {/* Projects + Skills */}
          <div className="space-y-4">
            {/* Projects */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold mb-3">Projects</h2>
              {resume.projects.length === 0 ? (
                <p className="text-sm text-white/60">
                  No projects detected.
                </p>
              ) : (
                <div className="space-y-3">
                  {resume.projects.map((proj, idx) => (
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
            </div>

            {/* Skills */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold mb-3">Skillsets</h2>
              {resume.skills.length === 0 ? (
                <p className="text-sm text-white/60">
                  No skills detected. Try adding a “Skills” section in the resume.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full text-xs bg-neon-blue/10 text-neon-blue border border-neon-blue/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-[11px] text-white/50 mt-4">
          Note: This is a demo front-end parser. For production-grade parsing of
          PDF/DOCX with AI, plug this UI into your FastAPI/LLM backend.
        </p>
      </div>
    </div>
  );
}
