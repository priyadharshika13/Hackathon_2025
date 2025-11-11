import React, { useState, useEffect } from "react";

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
};

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

// Up to 20 minimal Q&A pairs for the chatbot
const FAQ_LIST: FAQ[] = [
  {
    id: 1,
    question: "What is StaffTract?",
    answer:
      "StaffTract is an AI-assisted HR analytics and compliance platform for recruitment, workforce planning, and nationalization tracking.",
  },
  {
    id: 2,
    question: "How do I log in as an admin?",
    answer:
      "Use your corporate email and admin password on the login page. If SSO is enabled, click the SSO button and use your company credentials.",
  },
  {
    id: 3,
    question: "Can I upload candidate CVs?",
    answer:
      "Yes. Go to the Recruitment module → Candidates → Upload CV. You can upload PDF or DOCX files for parsing.",
  },
  {
    id: 4,
    question: "What dashboards are available?",
    answer:
      "You have Recruitment, Workforce, Performance, Community Planner, and Fraud & Integrity dashboards, each with their own KPIs and insights.",
  },
  {
    id: 5,
    question: "How often is the data refreshed?",
    answer:
      "By default, data is refreshed every 24 hours. If you have API integration, some widgets can refresh every 15 minutes.",
  },
  {
    id: 6,
    question: "Can I export reports?",
    answer:
      "Yes. Most reports have export buttons for PDF, Excel, and CSV in the top-right corner of the report screen.",
  },
  {
    id: 7,
    question: "How is Saudization rate calculated?",
    answer:
      "Saudization rate is calculated as (number of Saudi workers ÷ total workers) × 100 for the selected scope (company, region, or sector).",
  },
  {
    id: 8,
    question: "Can I filter data by region?",
    answer:
      "Yes. Use the region filter at the top of the Workforce or Community dashboards to filter metrics by specific regions.",
  },
  {
    id: 9,
    question: "How do I see high-risk fraud alerts?",
    answer:
      "Open the Fraud & Integrity Monitor. High-risk alerts are highlighted in red and appear at the top of the alerts list.",
  },
  {
    id: 10,
    question: "Can I drill down into a candidate profile?",
    answer:
      "Yes. Click on a candidate row in Recruitment or Fraud Monitor to open their detailed profile and risk history.",
  },
  {
    id: 11,
    question: "How can I change language?",
    answer:
      "If multilingual is enabled, you’ll see a language switcher (e.g., EN/AR) in the top navigation bar.",
  },
  {
    id: 12,
    question: "Who can access admin dashboards?",
    answer:
      "Only users with the admin or compliance role can access the full analytics dashboards. Recruiters see a limited view.",
  },
  {
    id: 13,
    question: "Can I set custom KPIs?",
    answer:
      "Yes. In Settings → KPIs, you can define custom thresholds and labels for colored indicators (e.g., Excellent, Good, Needs Improvement).",
  },
  {
    id: 14,
    question: "How do I refresh community data?",
    answer:
      "Go to the Community Planner dashboard and click the refresh icon. It will fetch the latest national and sector data if APIs are configured.",
  },
  {
    id: 15,
    question: "Does StaffTract support alerts?",
    answer:
      "Yes. You can enable email or in-app alerts for critical events such as high-risk fraud flags or compliance breaches.",
  },
  {
    id: 16,
    question: "Can I see trends over time?",
    answer:
      "Yes. Trend charts on Recruitment, Performance, and Community dashboards show monthly or quarterly trends depending on your configuration.",
  },
  {
    id: 17,
    question: "How do I add a new user?",
    answer:
      "Admins can go to Settings → Users → Add User, fill in their details, assign a role, and send an invite.",
  },
  {
    id: 18,
    question: "Can I integrate with my HRMS?",
    answer:
      "StaffTract supports REST API integration with most HRMS systems. Your IT team can connect via the Integration section.",
  },
  {
    id: 19,
    question: "Is my data secure?",
    answer:
      "Yes. StaffTract uses role-based access control, encrypted transport (HTTPS), and can be hosted in secure cloud environments.",
  },
  {
    id: 20,
    question: "How do I contact support?",
    answer:
      "You can reach support via the Help menu inside the app or email your implementation contact for priority support.",
  },
];

export default function Chatbot(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        from: "bot",
        text:
          "Hi! I’m your StaffTract assistant. You can type a question, or click one of the quick questions below.",
      },
    ]);
  }, []);

  const addMessage = (from: "bot" | "user", text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from, text },
    ]);
  };

  const findAnswer = (question: string): string => {
    // Simple match: find FAQ whose question includes most of the text
    const lower = question.toLowerCase();
    const match =
      FAQ_LIST.find((faq) =>
        faq.question.toLowerCase().includes(lower)
      ) ||
      FAQ_LIST.find((faq) =>
        lower.includes(faq.question.toLowerCase())
      );

    if (match) return match.answer;
    return "I’m not sure about that yet. Please contact your system administrator or support team for more details.";
  };

  const handleAsk = (question: string) => {
    if (!question.trim()) return;
    // user message
    addMessage("user", question.trim());
    // bot reply
    const answer = findAnswer(question.trim());
    addMessage("bot", answer);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(input);
  };

  return (
    <div className="max-w-md w-full mx-auto h-[32rem] flex flex-col rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur-md shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-neutral-900 to-neutral-800">
        <div>
          <h2 className="text-sm font-semibold text-white">
            StaffTract Chatbot
          </h2>
          <p className="text-[11px] text-white/60">
            Ask up to 20 quick questions about the platform.
          </p>
        </div>
        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-3 space-y-2 overflow-y-auto text-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                msg.from === "user"
                  ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/40 rounded-br-sm"
                  : "bg-white/5 text-white border border-white/10 rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Questions */}
      <div className="px-4 pb-2 space-y-1 border-t border-white/10 bg-neutral-900/80">
        <p className="text-[11px] text-white/60 mb-1">
          Quick questions:
        </p>
        <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
          {FAQ_LIST.slice(0, 8).map((faq) => (
            <button
              key={faq.id}
              onClick={() => handleAsk(faq.question)}
              className="text-[11px] px-2 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
            >
              {faq.question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-3 py-2 border-t border-white/10 bg-neutral-950/90 flex items-center gap-2"
      >
        <input
          className="flex-1 bg-transparent border border-white/15 rounded-full px-3 py-1.5 text-xs text-white outline-none focus:border-neon-blue"
          placeholder="Type your question…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="text-xs px-3 py-1.5 rounded-full bg-neon-blue/80 hover:bg-neon-blue text-black font-semibold"
        >
          Send
        </button>
      </form>
    </div>
  );
}
