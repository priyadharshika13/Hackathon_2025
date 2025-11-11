import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function HRDashboard() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const load = async () => {
    const res = await axios.get("/api/recruitment/hr/review");
    setCandidates(res.data.candidates);
  };

  const approve = async (name: string) => {
    const res = await axios.post("/api/recruitment/hr/approve", { name });
    setMessage(res.data.message_en);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <motion.h1 className="text-4xl font-bold mb-8 text-center" initial={{opacity:0}} animate={{opacity:1}}>
        🧠 HR Review Dashboard
      </motion.h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {candidates.map((c, i) => (
          <motion.div key={i} className="p-5 bg-[#111] rounded-2xl border border-[#21F0FF]/20" initial={{opacity:0}} animate={{opacity:1}}>
            <h3 className="text-xl font-semibold">{c.name} — <span className="text-[#FFD400]">{c.role}</span></h3>
            <p>Match: {c.match_score}% | Interview: {c.interview_score}%</p>
            <p>Status: <span className="text-[#A6FF00]">{c.status}</span></p>
            {c.status === "Pending" && (
              <button onClick={()=>approve(c.name)} className="mt-3 px-4 py-2 bg-gradient-to-r from-[#9B5CFF] to-[#21F0FF] rounded-xl">
                Approve
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {message && <p className="text-center mt-6 text-[#A6FF00]">{message}</p>}
    </div>
  );
}
