import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function CandidateApply() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("/api/recruitment/analyze_resume", formData);
    setData(res.data);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-8">
      <motion.h1 className="text-4xl font-bold mb-8" initial={{opacity:0,y:-40}} animate={{opacity:1,y:0}}>
        📄 AI Resume Analyzer
      </motion.h1>

      <div className="bg-[#111] p-8 rounded-2xl w-full max-w-lg border border-[#21F0FF]/20">
        <input type="file" onChange={(e)=>setFile(e.target.files?.[0]||null)} className="w-full mb-4"/>
        <button onClick={handleUpload} className="w-full p-3 bg-gradient-to-r from-[#9B5CFF] to-[#21F0FF] rounded-xl font-semibold">
          Analyze Resume
        </button>
      </div>

      {data && (
        <motion.div className="mt-8 bg-[#1a1a1f] p-6 rounded-xl border border-[#FFD400]/30" initial={{opacity:0}} animate={{opacity:1}}>
          <h2 className="text-xl font-semibold mb-2 text-[#A6FF00]">{data.filename}</h2>
          <p>Match Score: <span className="text-[#FFD400]">{data.match_score}%</span></p>
          <p className="mt-2 text-[#21F0FF]">{data.feedback_en}</p>
          <p className="text-gray-400 mt-1">{data.feedback_ar}</p>
        </motion.div>
      )}
    </div>
  );
}
